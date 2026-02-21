'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, MapPin, Phone, Navigation, Filter, List, Map } from 'lucide-react';
import { facilities, getNearestFacilities, type Facility } from '@/lib/data/facilityData';

export default function FacilitiesPage() {
    const { t, language } = useLanguage();
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [filterType, setFilterType] = useState<string>('all');
    const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
    const [nearbyFacilities, setNearbyFacilities] = useState<Facility[]>([]);
    const [locationPermission, setLocationPermission] = useState<'prompt' | 'granted' | 'denied'>('prompt');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if geolocation is available
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setUserLocation(location);
                    setLocationPermission('granted');
                    updateNearbyFacilities(location, filterType);
                },
                () => {
                    setLocationPermission('denied');
                    // Use default location (Kolkata)
                    const defaultLocation = { lat: 22.5726, lng: 88.3639 };
                    setUserLocation(defaultLocation);
                    updateNearbyFacilities(defaultLocation, filterType);
                }
            );
        } else {
            // Use default location
            const defaultLocation = { lat: 22.5726, lng: 88.3639 };
            setUserLocation(defaultLocation);
            updateNearbyFacilities(defaultLocation, filterType);
        }
    }, []);

    const updateNearbyFacilities = async (location: { lat: number, lng: number }, type: string) => {
        setIsLoading(true);
        try {
            // Fetch live facilities from OpenStreetMap
            const response = await fetch(
                `/api/facilities?lat=${location.lat}&lng=${location.lng}&radius=10000`
            );

            let liveFacilities: Facility[] = [];
            if (response.ok) {
                const data = await response.json();
                liveFacilities = data.facilities || [];
            }

            // Get static facilities
            const staticFacilities = getNearestFacilities(location.lat, location.lng, type);

            // Merge live and static facilities, remove duplicates
            const allFacilities = [...liveFacilities, ...staticFacilities];

            // Filter by type if needed
            const filtered = type === 'all'
                ? allFacilities
                : allFacilities.filter(f => f.type === type);

            // Sort by distance
            const sorted = filtered.sort((a, b) => (a.distance || 999) - (b.distance || 999));

            setNearbyFacilities(sorted);
        } catch (error) {
            console.error('Error fetching facilities:', error);
            // Fallback to static facilities
            const nearby = getNearestFacilities(location.lat, location.lng, type);
            setNearbyFacilities(nearby);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (type: string) => {
        setFilterType(type);
        if (userLocation) {
            updateNearbyFacilities(userLocation, type);
        }
    };

    const getDirections = (facility: Facility) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates.lat},${facility.coordinates.lng}`;
        window.open(url, '_blank');
    };

    const callFacility = (phone: string) => {
        window.location.href = `tel:${phone}`;
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-pink-50">
            {/* Header */}
            <header className="bg-white shadow-md px-4 py-3">
                <div className="flex items-center gap-3 mb-3">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <Home className="w-6 h-6 text-gray-700" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900">{t('facilityFinderTitle')}</h1>
                        <p className="text-sm text-gray-600">
                            {nearbyFacilities.length} {language === 'en' ? 'facilities found' : 'सुविधाएं मिलीं'}
                        </p>
                    </div>
                    <button
                        onClick={() => setViewMode(viewMode === 'list' ? 'map' : 'list')}
                        className="btn btn-ghost min-h-0 h-10 px-3"
                    >
                        {viewMode === 'list' ? <Map className="w-5 h-5" /> : <List className="w-5 h-5" />}
                    </button>
                </div>

                {/* Filters */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {['all', 'PHC', 'CHC', 'Hospital', 'Jan Aushadhi'].map(type => (
                        <button
                            key={type}
                            onClick={() => handleFilterChange(type)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${filterType === type
                                ? 'bg-purple-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {type === 'all' ? (language === 'en' ? 'All' : 'सभी') : type}
                        </button>
                    ))}
                </div>
            </header>

            {/* Location Permission */}
            {locationPermission === 'denied' && (
                <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-3">
                    <p className="text-sm text-yellow-800">
                        {language === 'en'
                            ? '📍 Location access denied. Showing facilities near Kolkata. Enable location for better results.'
                            : '📍 स्थान एक्सेस अस्वीकृत। कोलकाता के पास की सुविधाएं दिखा रहा है। बेहतर परिणामों के लिए स्थान सक्षम करें।'}
                    </p>
                </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
                <div className="bg-blue-50 border-b border-blue-200 px-4 py-3">
                    <p className="text-sm text-blue-800 flex items-center gap-2">
                        <span className="inline-block w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                        {language === 'en' ? '🔍 Finding nearby facilities...' : '🔍 नज़दीकी सुविधाएं खोज रहे हैं...'}
                    </p>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {viewMode === 'list' ? (
                    <div className="space-y-4 max-w-4xl mx-auto">
                        {nearbyFacilities.map(facility => (
                            <div key={facility.id} className="card hover:shadow-xl transition">
                                <div className="flex items-start gap-4">
                                    {/* Icon */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${facility.type === 'PHC' ? 'bg-green-100' :
                                        facility.type === 'CHC' ? 'bg-blue-100' :
                                            facility.type === 'Hospital' ? 'bg-purple-100' :
                                                'bg-orange-100'
                                        }`}>
                                        <MapPin className={`w-6 h-6 ${facility.type === 'PHC' ? 'text-green-600' :
                                            facility.type === 'CHC' ? 'text-blue-600' :
                                                facility.type === 'Hospital' ? 'text-purple-600' :
                                                    'text-orange-600'
                                            }`} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">{facility.name}</h3>
                                                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold">
                                                    {facility.type}
                                                </span>
                                            </div>
                                            {facility.distance && (
                                                <span className="text-sm font-semibold text-purple-600 whitespace-nowrap">
                                                    {facility.distance.toFixed(1)} km
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-600 mb-2">{facility.address}</p>

                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <span>⏰ {facility.operatingHours}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {facility.services.map((service, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                                                    {service}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => getDirections(facility)}
                                                className="btn btn-primary text-sm min-h-0 h-10 flex-1"
                                            >
                                                <Navigation className="w-4 h-4 mr-2" />
                                                {t('directions')}
                                            </button>
                                            <button
                                                onClick={() => callFacility(facility.phone)}
                                                className="btn btn-secondary text-sm min-h-0 h-10 flex-1"
                                            >
                                                <Phone className="w-4 h-4 mr-2" />
                                                {t('callNow')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {nearbyFacilities.length === 0 && (
                            <div className="text-center py-12">
                                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-600">
                                    {language === 'en' ? 'No facilities found' : 'कोई सुविधा नहीं मिली'}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="h-full flex items-center justify-center text-gray-600">
                            <div className="text-center">
                                <Map className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                                <p className="mb-2">
                                    {language === 'en'
                                        ? 'Map view requires Google Maps API key'
                                        : 'मानचित्र दृश्य के लिए Google Maps API key की आवश्यकता है'}
                                </p>
                                <button onClick={() => setViewMode('list')} className="btn btn-primary text-sm">
                                    {language === 'en' ? 'Switch to List View' : 'सूची दृश्य पर बदलें'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
