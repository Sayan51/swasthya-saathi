
export enum View {
  Home = 'home',
  Assistant = 'assistant',
  SymptomChecker = 'symptom-checker',
  FacilityFinder = 'facility-finder',
  MedicineHub = 'medicine-hub',
  Schemes = 'schemes',
  Emergency = 'emergency'
}

export interface Medicine {
  id: string;
  name: string;
  brand: string;
  genericName: string;
  genericPrice: number;
  brandPrice: number;
  description: string;
  category: string;
}

export interface Facility {
  id: string;
  name: string;
  type: 'PHC' | 'CHC' | 'Hospital' | 'Pharmacy';
  distance: string;
  status: 'Open' | 'Closed';
  address: string;
  contact: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  eligibility: string[];
}
