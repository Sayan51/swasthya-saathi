export interface Scheme {
    id: string;
    name: string;
    nameHi: string;
    description: string;
    descriptionHi: string;
    benefits: string[];
    benefitsHi: string[];
    eligibilityCriteria: EligibilityCriteria;
    enrollmentSteps: string[];
    enrollmentStepsHi: string[];
    helpline: string;
    abhaLink?: string;
    downloadLink?: string;
}

export interface EligibilityCriteria {
    rationCardTypes?: string[];
    annualIncome?: { max: number };
    familySize?: { min?: number; max?: number };
    age?: { min?: number; max?: number };
}

export interface EligibilityQuestion {
    id: string;
    question: string;
    questionHi: string;
    options: { value: string; label: string; labelHi: string }[];
}

export const schemes: Scheme[] = [
    {
        id: 'ayushman-bharat',
        name: 'Ayushman Bharat - PM-JAY',
        nameHi: 'आयुष्मान भारत - PM-JAY',
        description: 'World\'s largest health insurance scheme providing coverage of ₹5 lakh per family per year',
        descriptionHi: 'विश्व की सबसे बड़ी स्वास्थ्य बीमा योजना जो प्रति परिवार प्रति वर्ष ₹5 लाख का कवरेज प्रदान करती है',
        benefits: [
            '₹5 lakh coverage per family per year',
            'Covers 1,500+ medical procedures',
            'Cashless treatment at 25,000+ empanelled hospitals',
            'Pre and post-hospitalization coverage',
            'No cap on family size or age',
        ],
        benefitsHi: [
            'प्रति परिवार प्रति वर्ष ₹5 लाख का कवरेज',
            '1,500+ चिकित्सा प्रक्रियाओं को कवर करता है',
            '25,000+ सूचीबद्ध अस्पतालों में कैशलेस उपचार',
            'अस्पताल में भर्ती से पहले और बाद का कवरेज',
            'परिवार के आकार या उम्र पर कोई सीमा नहीं',
        ],
        eligibilityCriteria: {
            rationCardTypes: ['BPL', 'Antyodaya'],
            annualIncome: { max: 500000 },
        },
        enrollmentSteps: [
            'Visit nearest Jan Seva Kendra or PHC',
            'Carry ration card and Aadhaar card',
            'Fill the enrollment form',
            'Get your Ayushman Bharat card',
            'Create ABHA ID for digital health records',
        ],
        enrollmentStepsHi: [
            'निकटतम जन सेवा केंद्र या PHC जाएं',
            'राशन कार्ड और आधार कार्ड लाएं',
            'नामांकन फॉर्म भरें',
            'अपना आयुष्मान भारत कार्ड प्राप्त करें',
            'डिजिटल स्वास्थ्य रिकॉर्ड के लिए ABHA ID बनाएं',
        ],
        helpline: '14555',
        abhaLink: 'https://healthid.ndhm.gov.in/register',
        downloadLink: 'https://nha.gov.in/PM-JAY',
    },
    {
        id: 'jssk',
        name: 'Janani Shishu Suraksha Karyakaram (JSSK)',
        nameHi: 'जननी शिशु सुरक्षा कार्यक्रम (JSSK)',
        description: 'Free delivery and healthcare for pregnant women and sick newborns',
        descriptionHi: 'गर्भवती महिलाओं और बीमार नवजात शिशुओं के लिए मुफ्त प्रसव और स्वास्थ्य सेवा',
        benefits: [
            'Free delivery in government hospitals',
            'Free medicines and diagnostics',
            'Free diet during hospital stay',
            'Free transport from home to facility',
            'Free treatment for sick newborns up to 30 days',
        ],
        benefitsHi: [
            'सरकारी अस्पतालों में मुफ्त प्रसव',
            'मुफ्त दवाएं और निदान',
            'अस्पताल में रहने के दौरान मुफ्त आहार',
            'घर से सुविधा तक मुफ्त परिवहन',
            '30 दिनों तक बीमार नवजात शिशुओं का मुफ्त उपचार',
        ],
        eligibilityCriteria: {},
        enrollmentSteps: [
            'Register at nearest Anganwadi or PHC during pregnancy',
            'Carry MCP card for all checkups',
            'Avail all services at government facilities',
        ],
        enrollmentStepsHi: [
            'गर्भावस्था के दौरान निकटतम आंगनवाड़ी या PHC में पंजीकरण करें',
            'सभी जांच के लिए MCP कार्ड साथ लाएं',
            'सरकारी सुविधाओं में सभी सेवाओं का लाभ उठाएं',
        ],
        helpline: '104',
        abhaLink: 'https://healthid.ndhm.gov.in/register',
        downloadLink: 'https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=822&lid=118',
    },
];

export const eligibilityQuestions: EligibilityQuestion[] = [
    {
        id: 'ration-card',
        question: 'What type of ration card do you have?',
        questionHi: 'आपके पास किस प्रकार का राशन कार्ड है?',
        options: [
            { value: 'BPL', label: 'BPL (Below Poverty Line)', labelHi: 'BPL (गरीबी रेखा से नीचे)' },
            { value: 'APL', label: 'APL (Above Poverty Line)', labelHi: 'APL (गरीबी रेखा से ऊपर)' },
            { value: 'Antyodaya', label: 'Antyodaya', labelHi: 'अंत्योदय' },
            { value: 'None', label: 'Don\'t have a ration card', labelHi: 'राशन कार्ड नहीं है' },
        ],
    },
    {
        id: 'annual-income',
        question: 'What is your annual family income?',
        questionHi: 'आपकी वार्षिक पारिवारिक आय क्या है?',
        options: [
            { value: 'below-1lakh', label: 'Below ₹1 lakh', labelHi: '₹1 लाख से कम' },
            { value: '1-3lakh', label: '₹1-3 lakh', labelHi: '₹1-3 लाख' },
            { value: '3-5lakh', label: '₹3-5 lakh', labelHi: '₹3-5 लाख' },
            { value: 'above-5lakh', label: 'Above ₹5 lakh', labelHi: '₹5 लाख से अधिक' },
        ],
    },
    {
        id: 'family-size',
        question: 'How many members are in your family?',
        questionHi: 'आपके परिवार में कितने सदस्य हैं?',
        options: [
            { value: '1-3', label: '1-3 members', labelHi: '1-3 सदस्य' },
            { value: '4-6', label: '4-6 members', labelHi: '4-6 सदस्य' },
            { value: '7+', label: '7+ members', labelHi: '7+ सदस्य' },
        ],
    },
];

export function checkEligibility(
    schemeId: string,
    answers: Record<string, string>
): boolean {
    const scheme = schemes.find(s => s.id === schemeId);
    if (!scheme) return false;

    const { eligibilityCriteria } = scheme;

    // Check ration card
    if (eligibilityCriteria.rationCardTypes) {
        if (!eligibilityCriteria.rationCardTypes.includes(answers['ration-card'])) {
            return false;
        }
    }

    // Check income
    if (eligibilityCriteria.annualIncome?.max) {
        const incomeAnswer = answers['annual-income'];
        if (incomeAnswer === 'above-5lakh') return false;
    }

    return true;
}
