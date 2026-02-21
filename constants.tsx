
import { Medicine, Facility, Scheme } from './types';

export const MOCK_MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Crocin 500mg',
    brand: 'GlaxoSmithKline',
    genericName: 'Paracetamol 500mg',
    brandPrice: 30.50,
    genericPrice: 5.20,
    description: 'Used for fever and mild to moderate pain.',
    category: 'Analgesic / Antipyretic'
  },
  {
    id: '2',
    name: 'Augmentin 625 Duo',
    brand: 'GSK',
    genericName: 'Amoxycillin + Clavulanic Acid',
    brandPrice: 210.00,
    genericPrice: 85.00,
    description: 'Broad-spectrum antibiotic used to treat bacterial infections.',
    category: 'Antibiotic'
  },
  {
    id: '3',
    name: 'Telma 40',
    brand: 'Glenmark',
    genericName: 'Telmisartan 40mg',
    brandPrice: 165.00,
    genericPrice: 35.00,
    description: 'Used to treat high blood pressure (hypertension).',
    category: 'Cardiovascular'
  }
];

export const MOCK_FACILITIES: Facility[] = [
  {
    id: 'f1',
    name: 'Primary Health Centre (PHC) Rampur',
    type: 'PHC',
    distance: '2.3 km',
    status: 'Open',
    address: 'Near Gram Panchayat, Rampur, UP',
    contact: '0522-2234567'
  },
  {
    id: 'f2',
    name: 'Community Health Centre (CHC) Sandila',
    type: 'CHC',
    distance: '8.5 km',
    status: 'Open',
    address: 'Sandila Main Road, Hardoi District',
    contact: '0585-423109'
  },
  {
    id: 'f3',
    name: 'Jan Aushadhi Kendra #441',
    type: 'Pharmacy',
    distance: '1.5 km',
    status: 'Open',
    address: 'Railway Station Road, Rampur',
    contact: '9876543210'
  }
];

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: 's1',
    name: 'Ayushman Bharat (PM-JAY)',
    description: 'World\'s largest health insurance scheme providing ₹5 Lakh coverage per family.',
    benefits: [
      '₹5 Lakh per year per family',
      'Cashless treatment at empanelled hospitals',
      'Covers pre-existing diseases'
    ],
    eligibility: [
      'Identified in SECC 2011 data',
      'Possess a valid Ration Card (BPL)',
      'No earning adult member (16-59 yrs) in household'
    ]
  },
  {
    id: 's2',
    name: 'Janani Suraksha Yojana (JSY)',
    description: 'Safe motherhood intervention promoting institutional delivery among poor pregnant women.',
    benefits: [
      'Cash assistance for delivery',
      'Free transport to health facility',
      'Post-natal care guidance'
    ],
    eligibility: [
      'Pregnant women in rural areas',
      'Preference for BPL/SC/ST households'
    ]
  }
];
