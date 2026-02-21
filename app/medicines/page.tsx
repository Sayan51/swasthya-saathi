'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Search, Mic, DollarSign, MapPin, Bell, CheckCircle } from 'lucide-react';
import { medicines, searchMedicines, calculateSavings, type Medicine } from '@/lib/data/medicineData';

export default function MedicinesPage() {
    const { t, language } = useLanguage();
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Medicine[]>([]);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery);
        if (searchQuery.trim()) {
            const results = searchMedicines(searchQuery);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSelectMedicine = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        // Find generic alternative if this is branded
        if (medicine.isBranded && medicine.genericPrice) {
            const generic = medicines.find(m => m.genericName === medicine.genericName && !m.isBranded);
            // Will show comparison in the details view
        }
    };

    const getGenericAlternative = (medicine: Medicine) => {
        if (!medicine.isBranded) return null;
        return medicines.find(m => m.genericName === medicine.genericName && !m.isBranded);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-red-50">
            {/* Header */}
            <header className="bg-white shadow-md px-4 py-3">
                <div className="flex items-center gap-3 mb-3">
                    <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
                        <Home className="w-6 h-6 text-gray-700" />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900">{t('medicineSearchTitle')}</h1>
                        <p className="text-sm text-gray-600">
                            {language === 'en' ? 'Find medicine info & generic alternatives' : 'दवा की जानकारी और जेनेरिक विकल्प खोजें'}
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder={t('medicineSearchPlaceholder')}
                            className="input pl-10 w-full"
                        />
                    </div>
                    <button className="btn btn-ghost min-h-0 h-12 w-12 p-0">
                        <Mic className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Search Results */}
                {query && searchResults.length > 0 && !selectedMedicine && (
                    <div className="max-w-4xl mx-auto space-y-3">
                        <h3 className="font-bold text-lg text-gray-900 mb-4">
                            {searchResults.length} {language === 'en' ? 'results found' : 'परिणाम मिले'}
                        </h3>
                        {searchResults.map(medicine => (
                            <button
                                key={medicine.id}
                                onClick={() => handleSelectMedicine(medicine)}
                                className="card w-full text-left hover:shadow-lg transition"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-lg text-gray-900 mb-1">{medicine.name}</h4>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {t('genericAlternative')}: {medicine.genericName}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {medicine.usage.slice(0, 3).map((use, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded">
                                                    {use}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">₹{medicine.price}</div>
                                        {medicine.isBranded && medicine.genericPrice && (
                                            <div className="text-sm text-green-600 font-semibold">
                                                {t('priceSavings')} ₹{medicine.price - medicine.genericPrice}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Medicine Details */}
                {selectedMedicine && (
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => setSelectedMedicine(null)}
                            className="btn btn-ghost mb-4 text-sm"
                        >
                            ← {language === 'en' ? 'Back to results' : 'परिणामों पर वापस जाएं'}
                        </button>

                        {/* Price Comparison */}
                        {selectedMedicine.isBranded && selectedMedicine.genericPrice && (
                            <div className="card bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 mb-4">
                                <div className="flex items-center gap-3 mb-4">
                                    <DollarSign className="w-8 h-8 text-green-600" />
                                    <h3 className="text-xl font-bold text-green-900">
                                        {language === 'en' ? '💰 Save Money with Generic!' : '💰 जेनेरिक से पैसे बचाएं!'}
                                    </h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">{t('brandedMedicine')}</p>
                                        <p className="text-2xl font-bold text-gray-900">{selectedMedicine.name}</p>
                                        <p className="text-xl text-red-600 font-bold">₹{selectedMedicine.price}</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">{t('genericAlternative')}</p>
                                        <p className="text-2xl font-bold text-gray-900">{selectedMedicine.genericName}</p>
                                        <p className="text-xl text-green-600 font-bold">₹{selectedMedicine.genericPrice}</p>
                                    </div>
                                </div>

                                <div className="bg-green-600 text-white rounded-lg p-4 text-center">
                                    <p className="text-lg font-bold">
                                        {t('priceSavings')}: ₹{selectedMedicine.price - selectedMedicine.genericPrice} (
                                        {Math.round(((selectedMedicine.price - selectedMedicine.genericPrice) / selectedMedicine.price) * 100)}%)
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Details */}
                        <div className="card mb-4">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedMedicine.name}</h3>
                            <p className="text-gray-600 mb-6">{selectedMedicine.genericName}</p>

                            <div className="space-y-6">
                                {/* Usage */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{t('usage')}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedMedicine.usage.map((use, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                                                {use}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Dosage */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{t('dosage')}</h4>
                                    <p className="text-gray-700">{selectedMedicine.dosage}</p>
                                </div>

                                {/* Side Effects */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{t('sideEffects')}</h4>
                                    <ul className="space-y-1">
                                        {selectedMedicine.sideEffects.map((effect, idx) => (
                                            <li key={idx} className="text-gray-700 flex items-start gap-2">
                                                <span className="text-orange-500 mt-1">•</span>
                                                {effect}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Interactions */}
                                {selectedMedicine.interactions.length > 0 && (
                                    <div>
                                        <h4 className="font-bold text-lg text-gray-900 mb-2">{t('interactions')}</h4>
                                        <ul className="space-y-1">
                                            {selectedMedicine.interactions.map((interaction, idx) => (
                                                <li key={idx} className="text-gray-700 flex items-start gap-2">
                                                    <span className="text-red-500 mt-1">⚠️</span>
                                                    {interaction}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Storage */}
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{t('storage')}</h4>
                                    <p className="text-gray-700">{selectedMedicine.storage}</p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="card bg-purple-50">
                            <h4 className="font-bold text-lg text-gray-900 mb-4">
                                {language === 'en' ? 'Where to Buy' : 'कहाँ से खरीदें'}
                            </h4>
                            <div className="flex gap-3">
                                <Link href="/facilities?filter=Jan Aushadhi" className="btn btn-primary flex-1">
                                    <MapPin className="w-5 h-5 mr-2" />
                                    {t('nearestPharmacy')}
                                </Link>
                                <button
                                    className={`btn flex-1 transition-all ${selectedMedicine.reminderSet ? 'bg-green-100 text-green-700 border-green-200' : 'btn-secondary'}`}
                                    onClick={() => {
                                        const updatedMedicine = { ...selectedMedicine, reminderSet: !selectedMedicine.reminderSet };
                                        setSelectedMedicine(updatedMedicine);
                                        // Update in search results/list as well if needed, but local state is fine for this demo
                                        if (!selectedMedicine.reminderSet) {
                                            alert(language === 'en' ? 'Reminder set successfully!' : 'रिमाइंडर सफलतापूर्वक सेट किया गया!');
                                        }
                                    }}
                                >
                                    {selectedMedicine.reminderSet ? (
                                        <CheckCircle className="w-5 h-5 mr-2" />
                                    ) : (
                                        <Bell className="w-5 h-5 mr-2" />
                                    )}
                                    {selectedMedicine.reminderSet ? (language === 'en' ? 'Reminder Set' : 'रिमाइंडर सेट') : t('setReminder')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Popular Medicines */}
                {!query && !selectedMedicine && (
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            {language === 'en' ? 'Popular Medicines' : 'लोकप्रिय दवाइयाँ'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {medicines.slice(0, 6).map(medicine => (
                                <button
                                    key={medicine.id}
                                    onClick={() => handleSelectMedicine(medicine)}
                                    className="card text-left hover:shadow-lg transition"
                                >
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{medicine.name}</h4>
                                    <p className="text-sm text-gray-600 mb-3">{medicine.genericName}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-2xl font-bold text-orange-600">₹{medicine.price}</span>
                                        {medicine.genericPrice && (
                                            <span className="text-sm text-green-600 font-semibold">
                                                {t('priceSavings')} ₹{medicine.price - medicine.genericPrice}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* No Results */}
                {query && searchResults.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">💊</div>
                        <p className="text-gray-600">
                            {language === 'en' ? 'No medicines found. Try a different search.' : 'कोई दवा नहीं मिली। एक अलग खोज का प्रयास करें।'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
