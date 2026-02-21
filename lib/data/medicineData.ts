export interface Medicine {
    id: string;
    name: string;
    genericName: string;
    isBranded: boolean;
    price: number;
    genericPrice?: number;
    dosage: string;
    usage: string[];
    sideEffects: string[];
    interactions: string[];
    storage: string;
    prescription: boolean;
    reminderSet?: boolean;
}

export const medicines: Medicine[] = [
    {
        id: 'med-001',
        name: 'Crocin 500mg',
        genericName: 'Paracetamol',
        isBranded: true,
        price: 30,
        genericPrice: 5,
        dosage: '500mg every 6 hours',
        usage: ['Fever', 'Headache', 'Body pain'],
        sideEffects: ['Nausea (rare)', 'Skin rash (rare)'],
        interactions: ['Warfarin', 'Alcohol'],
        storage: 'Store at room temperature, away from moisture',
        prescription: false,
    },
    {
        id: 'med-002',
        name: 'Paracetamol 500mg',
        genericName: 'Paracetamol',
        isBranded: false,
        price: 5,
        dosage: '500mg every 6 hours',
        usage: ['Fever', 'Headache', 'Body pain'],
        sideEffects: ['Nausea (rare)', 'Skin rash (rare)'],
        interactions: ['Warfarin', 'Alcohol'],
        storage: 'Store at room temperature, away from moisture',
        prescription: false,
    },
    {
        id: 'med-003',
        name: 'Azithral 500mg',
        genericName: 'Azithromycin',
        isBranded: true,
        price: 150,
        genericPrice: 45,
        dosage: '500mg once daily for 3 days',
        usage: ['Bacterial infections', 'Respiratory infections', 'Throat infections'],
        sideEffects: ['Diarrhea', 'Nausea', 'Stomach pain'],
        interactions: ['Antacids', 'Warfarin'],
        storage: 'Store at room temperature',
        prescription: true,
    },
    {
        id: 'med-004',
        name: 'Azithromycin 500mg',
        genericName: 'Azithromycin',
        isBranded: false,
        price: 45,
        dosage: '500mg once daily for 3 days',
        usage: ['Bacterial infections', 'Respiratory infections', 'Throat infections'],
        sideEffects: ['Diarrhea', 'Nausea', 'Stomach pain'],
        interactions: ['Antacids', 'Warfarin'],
        storage: 'Store at room temperature',
        prescription: true,
    },
    {
        id: 'med-005',
        name: 'Allegra 120mg',
        genericName: 'Fexofenadine',
        isBranded: true,
        price: 200,
        genericPrice: 60,
        dosage: '120mg once daily',
        usage: ['Allergic rhinitis', 'Hay fever', 'Skin allergies'],
        sideEffects: ['Drowsiness', 'Headache', 'Nausea'],
        interactions: ['Antacids', 'Fruit juices'],
        storage: 'Store in a cool, dry place',
        prescription: false,
    },
    {
        id: 'med-006',
        name: 'ORS Solution',
        genericName: 'Oral Rehydration Salts',
        isBranded: false,
        price: 8,
        dosage: '1 packet in 1 liter of clean water',
        usage: ['Dehydration', 'Diarrhea', 'Vomiting'],
        sideEffects: ['None (when used as directed)'],
        interactions: ['None'],
        storage: 'Store in a cool, dry place',
        prescription: false,
    },
    {
        id: 'med-007',
        name: 'Disprin 325mg',
        genericName: 'Aspirin',
        isBranded: true,
        price: 25,
        genericPrice: 8,
        dosage: '325mg when needed, max 4 times daily',
        usage: ['Pain relief', 'Fever', 'Inflammation'],
        sideEffects: ['Stomach upset', 'Heartburn', 'Bleeding (with long-term use)'],
        interactions: ['Warfarin', 'NSAIDs', 'Alcohol'],
        storage: 'Store at room temperature',
        prescription: false,
    },
    {
        id: 'med-008',
        name: 'Metformin 500mg',
        genericName: 'Metformin',
        isBranded: false,
        price: 15,
        dosage: '500mg twice daily with meals',
        usage: ['Type 2 Diabetes'],
        sideEffects: ['Diarrhea', 'Nausea', 'Stomach pain'],
        interactions: ['Alcohol', 'Contrast dye'],
        storage: 'Store at room temperature',
        prescription: true,
    },
    {
        id: 'med-009',
        name: 'Pantoprazole 40mg',
        genericName: 'Pantoprazole',
        isBranded: false,
        price: 20,
        dosage: '40mg once daily before meals',
        usage: ['Acidity', 'GERD', 'Stomach ulcers'],
        sideEffects: ['Headache', 'Diarrhea', 'Nausea'],
        interactions: ['Warfarin', 'Antifungals'],
        storage: 'Store in a cool, dry place',
        prescription: true,
    },
    {
        id: 'med-010',
        name: 'Cetirizine 10mg',
        genericName: 'Cetirizine',
        isBranded: false,
        price: 12,
        dosage: '10mg once daily',
        usage: ['Allergies', 'Hay fever', 'Itching', 'Hives'],
        sideEffects: ['Drowsiness', 'Dry mouth', 'Fatigue'],
        interactions: ['Alcohol', 'Sedatives'],
        storage: 'Store at room temperature',
        prescription: false,
    },
];

export function searchMedicines(query: string): Medicine[] {
    const lowerQuery = query.toLowerCase();
    return medicines.filter(
        med =>
            med.name.toLowerCase().includes(lowerQuery) ||
            med.genericName.toLowerCase().includes(lowerQuery) ||
            med.usage.some(u => u.toLowerCase().includes(lowerQuery))
    );
}

export function calculateSavings(branded: Medicine, generic: Medicine): { amount: number; percentage: number } {
    if (!branded.genericPrice) return { amount: 0, percentage: 0 };
    const amount = branded.price - branded.genericPrice;
    const percentage = Math.round((amount / branded.price) * 100);
    return { amount, percentage };
}
