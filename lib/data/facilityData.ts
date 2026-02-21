export interface Facility {
    id: string;
    name: string;
    type: 'PHC' | 'CHC' | 'Hospital' | 'Jan Aushadhi';
    address: string;
    village: string;
    district: string;
    state: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    phone: string;
    operatingHours: string;
    services: string[];
    distance?: number;
}

export const facilities: Facility[] = [
    // West Bengal Facilities
    {
        id: 'phc-wb-001',
        name: 'PHC Barasat',
        type: 'PHC',
        address: 'Barasat Municipality Road',
        village: 'Barasat',
        district: 'North 24 Parganas',
        state: 'West Bengal',
        coordinates: { lat: 22.7205, lng: 88.4813 },
        phone: '+91-33-2532-1234',
        operatingHours: '9:00 AM - 5:00 PM',
        services: ['OPD', 'Emergency', 'Medicines', 'Vaccination'],
    },
    {
        id: 'phc-wb-002',
        name: 'PHC Dum Dum',
        type: 'PHC',
        address: 'Dum Dum Station Road',
        village: 'Dum Dum',
        district: 'North 24 Parganas',
        state: 'West Bengal',
        coordinates: { lat: 22.6548, lng: 88.4267 },
        phone: '+91-33-2567-2345',
        operatingHours: '9:00 AM - 5:00 PM',
        services: ['OPD', 'Vaccination', 'Medicines', 'Lab Tests'],
    },
    {
        id: 'chc-wb-001',
        name: 'CHC Barrackpore',
        type: 'CHC',
        address: 'BT Road, Barrackpore',
        village: 'Barrackpore',
        district: 'North 24 Parganas',
        state: 'West Bengal',
        coordinates: { lat: 22.7644, lng: 88.3779 },
        phone: '+91-33-2592-3456',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'Lab Tests', 'Maternity Ward', 'X-Ray'],
    },
    {
        id: 'hosp-wb-001',
        name: 'R.G. Kar Medical College & Hospital',
        type: 'Hospital',
        address: '1, Khudiram Bose Sarani, Kolkata',
        village: 'Kolkata',
        district: 'Kolkata',
        state: 'West Bengal',
        coordinates: { lat: 22.6101, lng: 88.3869 },
        phone: '+91-33-2555-5000',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'ICU', 'Lab Tests', 'X-Ray', 'CT Scan', 'MRI'],
    },
    {
        id: 'hosp-wb-002',
        name: 'SSKM Hospital (PG Hospital)',
        type: 'Hospital',
        address: '244, AJC Bose Road, Kolkata',
        village: 'Kolkata',
        district: 'Kolkata',
        state: 'West Bengal',
        coordinates: { lat: 22.5448, lng: 88.3549 },
        phone: '+91-33-2223-5000',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'ICU', 'Lab Tests', 'X-Ray', 'CT Scan', 'MRI', 'Cardiology'],
    },
    {
        id: 'jan-wb-001',
        name: 'Jan Aushadhi Kendra Salt Lake',
        type: 'Jan Aushadhi',
        address: 'Sector V, Salt Lake, Kolkata',
        village: 'Salt Lake',
        district: 'North 24 Parganas',
        state: 'West Bengal',
        coordinates: { lat: 22.5726, lng: 88.4322 },
        phone: '+91-33-2357-4567',
        operatingHours: '8:00 AM - 8:00 PM',
        services: ['Generic Medicines', 'Medical Supplies'],
    },
    {
        id: 'phc-wb-003',
        name: 'PHC Belgharia',
        type: 'PHC',
        address: 'Belgharia Expressway',
        village: 'Belgharia',
        district: 'North 24 Parganas',
        state: 'West Bengal',
        coordinates: { lat: 22.6647, lng: 88.3882 },
        phone: '+91-33-2567-5678',
        operatingHours: '9:00 AM - 5:00 PM',
        services: ['OPD', 'Maternal Health', 'Child Health', 'Medicines'],
    },
    {
        id: 'hosp-wb-003',
        name: 'Howrah District Hospital',
        type: 'Hospital',
        address: 'College Street, Howrah',
        village: 'Howrah',
        district: 'Howrah',
        state: 'West Bengal',
        coordinates: { lat: 22.5958, lng: 88.2636 },
        phone: '+91-33-2638-1000',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'ICU', 'Lab Tests', 'X-Ray', 'Maternity'],
    },
    {
        id: 'chc-wb-002',
        name: 'CHC Madhyamgram',
        type: 'CHC',
        address: 'Station Road, Madhyamgram',
        village: 'Madhyamgram',
        district: 'North 24 Parganas',
        state: 'West Bengal',
        coordinates: { lat: 22.7001, lng: 88.4492 },
        phone: '+91-33-2506-7890',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'Lab Tests', 'Maternity Ward'],
    },
    {
        id: 'jan-wb-002',
        name: 'Jan Aushadhi Kendra Howrah',
        type: 'Jan Aushadhi',
        address: 'Station Bazaar, Howrah',
        village: 'Howrah',
        district: 'Howrah',
        state: 'West Bengal',
        coordinates: { lat: 22.5833, lng: 88.3426 },
        phone: '+91-33-2668-5678',
        operatingHours: '8:00 AM - 8:00 PM',
        services: ['Generic Medicines', 'Medical Supplies'],
    },

    // Uttar Pradesh Facilities  
    {
        id: 'phc-001',
        name: 'PHC Rampur',
        type: 'PHC',
        address: 'Main Road, Rampur',
        village: 'Rampur',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.3176, lng: 82.9739 },
        phone: '+91-542-2501234',
        operatingHours: '9:00 AM - 5:00 PM',
        services: ['OPD', 'Emergency', 'Medicines', 'Lab Tests'],
    },
    {
        id: 'phc-002',
        name: 'PHC Kandwa',
        type: 'PHC',
        address: 'Block Road, Kandwa',
        village: 'Kandwa',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.2867, lng: 83.0123 },
        phone: '+91-542-2502345',
        operatingHours: '9:00 AM - 5:00 PM',
        services: ['OPD', 'Vaccination', 'Medicines'],
    },
    {
        id: 'chc-001',
        name: 'CHC Arajiline',
        type: 'CHC',
        address: 'NH-29, Arajiline',
        village: 'Arajiline',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.3345, lng: 82.9456 },
        phone: '+91-542-2503456',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'ICU', 'Lab Tests', 'X-Ray'],
    },
    {
        id: 'hosp-001',
        name: 'District Hospital Varanasi',
        type: 'Hospital',
        address: 'Civil Lines, Varanasi',
        village: 'Varanasi',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.3356, lng: 82.9875 },
        phone: '+91-542-2501000',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'ICU', 'Lab Tests', 'X-Ray', 'CT Scan', 'MRI'],
    },
    {
        id: 'jan-001',
        name: 'Jan Aushadhi Kendra Rampur',
        type: 'Jan Aushadhi',
        address: 'Market Road, Rampur',
        village: 'Rampur',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.3189, lng: 82.9756 },
        phone: '+91-542-2504567',
        operatingHours: '8:00 AM - 8:00 PM',
        services: ['Generic Medicines', 'Medical Supplies'],
    },
    {
        id: 'phc-003',
        name: 'PHC Sarnath',
        type: 'PHC',
        address: 'Sarnath Road',
        village: 'Sarnath',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.3816, lng: 83.0227 },
        phone: '+91-542-2595678',
        operatingHours: '9:00 AM - 5:00 PM',
        services: ['OPD', 'Maternal Health', 'Child Health', 'Medicines'],
    },
    {
        id: 'phc-004',
        name: 'PHC Cholapur',
        type: 'PHC',
        address: 'Village Road, Cholapur',
        village: 'Cholapur',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.2578, lng: 82.9234 },
        phone: '+91-542-2506789',
        operatingHours: '9:00 AM - 5:00 PM',
        services: ['OPD', 'Emergency', 'Medicines'],
    },
    {
        id: 'chc-002',
        name: 'CHC Pindra',
        type: 'CHC',
        address: 'Pindra Market',
        village: 'Pindra',
        district: 'Varanasi',
        state: 'Uttar Pradesh',
        coordinates: { lat: 25.4123, lng: 83.1234 },
        phone: '+91-542-2507890',
        operatingHours: '24 Hours',
        services: ['OPD', 'Emergency', 'Surgery', 'Lab Tests', 'Maternity Ward'],
    },
];

export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
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

export function getNearestFacilities(
    userLat: number,
    userLng: number,
    filterType?: string
): Facility[] {
    let filtered = facilities;

    if (filterType && filterType !== 'all') {
        filtered = facilities.filter(f => f.type === filterType);
    }

    const withDistance = filtered.map(facility => ({
        ...facility,
        distance: calculateDistance(
            userLat,
            userLng,
            facility.coordinates.lat,
            facility.coordinates.lng
        ),
    }));

    return withDistance.sort((a, b) => (a.distance || 0) - (b.distance || 0));
}
