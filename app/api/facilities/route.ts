import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '5000'; // 5km default

    if (!lat || !lng) {
        return NextResponse.json({ error: 'Missing lat/lng parameters' }, { status: 400 });
    }

    try {
        // OpenStreetMap Overpass API query
        // Search for hospitals, clinics, doctors, pharmacies
        const overpassQuery = `
            [out:json][timeout:25];
            (
                node["amenity"="hospital"](around:${radius},${lat},${lng});
                way["amenity"="hospital"](around:${radius},${lat},${lng});
                node["amenity"="clinic"](around:${radius},${lat},${lng});
                way["amenity"="clinic"](around:${radius},${lat},${lng});
                node["amenity"="doctors"](around:${radius},${lat},${lng});
                way["amenity"="doctors"](around:${radius},${lat},${lng});
                node["amenity"="pharmacy"](around:${radius},${lat},${lng});
                way["amenity"="pharmacy"](around:${radius},${lat},${lng});
                node["healthcare"="hospital"](around:${radius},${lat},${lng});
                way["healthcare"="hospital"](around:${radius},${lat},${lng});
                node["healthcare"="clinic"](around:${radius},${lat},${lng});
                way["healthcare"="clinic"](around:${radius},${lat},${lng});
            );
            out body;
            >;
            out skel qt;
        `;

        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `data=${encodeURIComponent(overpassQuery)}`,
        });

        if (!response.ok) {
            throw new Error('Overpass API request failed');
        }

        const data = await response.json();

        // Transform OSM data to our facility format
        const facilities = data.elements
            .filter((element: any) => element.type === 'node' && element.tags)
            .map((element: any) => {
                const tags = element.tags;

                // Determine facility type
                let type = 'Hospital';
                if (tags.amenity === 'clinic' || tags.healthcare === 'clinic' || tags.amenity === 'doctors') {
                    type = 'PHC';
                } else if (tags.amenity === 'pharmacy') {
                    type = 'Jan Aushadhi';
                }

                // Calculate distance
                const distance = calculateDistance(
                    parseFloat(lat),
                    parseFloat(lng),
                    element.lat,
                    element.lon
                );

                return {
                    id: `osm-${element.id}`,
                    name: tags.name || tags['name:en'] || `${type} (Unnamed)`,
                    type,
                    address: tags['addr:full'] ||
                        `${tags['addr:street'] || ''} ${tags['addr:housenumber'] || ''}`.trim() ||
                        tags.address ||
                        'Address not available',
                    village: tags['addr:city'] || tags['addr:suburb'] || tags['addr:village'] || '',
                    district: tags['addr:district'] || '',
                    state: tags['addr:state'] || '',
                    coordinates: {
                        lat: element.lat,
                        lng: element.lon,
                    },
                    phone: tags.phone || tags['contact:phone'] || 'Not available',
                    operatingHours: tags.opening_hours || tags['opening_hours:covid19'] || '24 Hours',
                    services: determineServices(tags),
                    distance: parseFloat(distance.toFixed(1)),
                    isLive: true, // Mark as coming from live data
                };
            })
            .filter((f: any) => f.name && !f.name.includes('Unnamed')); // Filter out unnamed facilities

        return NextResponse.json({ facilities });
    } catch (error) {
        console.error('Error fetching facilities:', error);
        return NextResponse.json(
            { error: 'Failed to fetch facilities', facilities: [] },
            { status: 500 }
        );
    }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function determineServices(tags: any): string[] {
    const services: string[] = [];

    if (tags.emergency === 'yes' || tags.amenity === 'hospital') {
        services.push('Emergency');
    }
    if (tags.healthcare || tags.amenity === 'clinic' || tags.amenity === 'doctors') {
        services.push('OPD');
    }
    if (tags.amenity === 'pharmacy') {
        services.push('Medicines');
    }
    if (tags['healthcare:speciality']) {
        const specialities = tags['healthcare:speciality'].split(';');
        services.push(...specialities);
    }

    // Add common services for hospitals
    if (tags.amenity === 'hospital') {
        services.push('Lab Tests', 'Surgery');
    }

    return services.length > 0 ? services : ['General Healthcare'];
}
