export interface SymptomCategory {
    id: string;
    name: string;
    nameHi: string;
    icon: string;
    symptoms: Symptom[];
}

export interface Symptom {
    id: string;
    name: string;
    nameHi: string;
    severity: number; // 1-5 scale
}

export interface Assessment {
    severity: 'Mild' | 'Moderate' | 'Severe';
    careLevel: 'self-care' | 'phc' | 'hospital';
    careLevelText: string;
    careLevelTextHi: string;
    reasoning: string;
    reasoningHi: string;
    recommendations: string[];
    recommendationsHi: string[];
}

export const symptomCategories: SymptomCategory[] = [
    {
        id: 'head-face',
        name: 'Head/Face',
        nameHi: 'सिर/चेहरा',
        icon: '🧠',
        symptoms: [
            { id: 'headache', name: 'Headache', nameHi: 'सिरदर्द', severity: 2 },
            { id: 'dizziness', name: 'Dizziness', nameHi: 'चक्कर आना', severity: 3 },
            { id: 'eye-pain', name: 'Eye Pain', nameHi: 'आँख में दर्द', severity: 2 },
            { id: 'ear-pain', name: 'Ear Pain', nameHi: 'कान में दर्द', severity: 2 },
            { id: 'sore-throat', name: 'Sore Throat', nameHi: 'गले में खराश', severity: 2 },
        ],
    },
    {
        id: 'chest-respiratory',
        name: 'Chest/Respiratory',
        nameHi: 'छाती/श्वसन',
        icon: '🫁',
        symptoms: [
            { id: 'cough', name: 'Cough', nameHi: 'खांसी', severity: 2 },
            { id: 'chest-pain', name: 'Chest Pain', nameHi: 'छाती में दर्द', severity: 4 },
            { id: 'shortness-breath', name: 'Shortness of Breath', nameHi: 'सांस फूलना', severity: 4 },
            { id: 'wheezing', name: 'Wheezing', nameHi: 'घरघराहट', severity: 3 },
        ],
    },
    {
        id: 'stomach-digestive',
        name: 'Stomach/Digestive',
        nameHi: 'पेट/पाचन',
        icon: '🍽️',
        symptoms: [
            { id: 'stomach-pain', name: 'Stomach Pain', nameHi: 'पेट दर्द', severity: 3 },
            { id: 'nausea', name: 'Nausea', nameHi: 'जी मिचलाना', severity: 2 },
            { id: 'vomiting', name: 'Vomiting', nameHi: 'उल्टी', severity: 3 },
            { id: 'diarrhea', name: 'Diarrhea', nameHi: 'दस्त', severity: 3 },
            { id: 'constipation', name: 'Constipation', nameHi: 'कब्ज', severity: 1 },
        ],
    },
    {
        id: 'general',
        name: 'General Symptoms',
        nameHi: 'सामान्य लक्षण',
        icon: '🌡️',
        symptoms: [
            { id: 'fever', name: 'Fever', nameHi: 'बुखार', severity: 3 },
            { id: 'fatigue', name: 'Fatigue', nameHi: 'थकान', severity: 2 },
            { id: 'body-ache', name: 'Body Ache', nameHi: 'शरीर में दर्द', severity: 2 },
            { id: 'weakness', name: 'Weakness', nameHi: 'कमजोरी', severity: 2 },
            { id: 'chills', name: 'Chills', nameHi: 'ठंड लगना', severity: 2 },
        ],
    },
    {
        id: 'skin',
        name: 'Skin',
        nameHi: 'त्वचा',
        icon: '🤚',
        symptoms: [
            { id: 'rash', name: 'Rash', nameHi: 'चकत्ते', severity: 2 },
            { id: 'itching', name: 'Itching', nameHi: 'खुजली', severity: 2 },
            { id: 'swelling', name: 'Swelling', nameHi: 'सूजन', severity: 3 },
            { id: 'skin-discoloration', name: 'Skin Discoloration', nameHi: 'रंग बदलना', severity: 2 },
        ],
    },
];

export function assessSymptoms(
    selectedSymptoms: string[],
    duration: number // in days
): Assessment {
    // Calculate total severity score
    let totalSeverity = 0;
    let maxSeverity = 0;

    selectedSymptoms.forEach(symptomId => {
        for (const category of symptomCategories) {
            const symptom = category.symptoms.find(s => s.id === symptomId);
            if (symptom) {
                totalSeverity += symptom.severity;
                maxSeverity = Math.max(maxSeverity, symptom.severity);
            }
        }
    });

    // Adjust for duration
    if (duration >= 7) totalSeverity += 2;
    else if (duration >= 4) totalSeverity += 1;

    // Check for critical symptoms
    const criticalSymptoms = ['chest-pain', 'shortness-breath', 'severe-bleeding'];
    const hasCritical = selectedSymptoms.some(s => criticalSymptoms.includes(s));

    // Determine severity and care level
    let severity: 'Mild' | 'Moderate' | 'Severe';
    let careLevel: 'self-care' | 'phc' | 'hospital';
    let careLevelText: string;
    let careLevelTextHi: string;
    let reasoning: string;
    let reasoningHi: string;
    let recommendations: string[];
    let recommendationsHi: string[];

    if (hasCritical || maxSeverity >= 4 || totalSeverity >= 12) {
        severity = 'Severe';
        careLevel = 'hospital';
        careLevelText = 'Visit Hospital Immediately';
        careLevelTextHi = 'तुरंत अस्पताल जाएं';
        reasoning = 'Your symptoms indicate a potentially serious condition that requires immediate medical attention.';
        reasoningHi = 'आपके लक्षण एक गंभीर स्थिति का संकेत दे सकते हैं जिसके लिए तत्काल चिकित्सा ध्यान की आवश्यकता है।';
        recommendations = [
            'Go to the nearest hospital or CHC immediately',
            'Call 108 ambulance if needed',
            'Do not delay seeking medical care',
            'Bring any previous medical records',
        ];
        recommendationsHi = [
            'तुरंत निकटतम अस्पताल या CHC जाएं',
            'यदि आवश्यक हो तो 108 एम्बुलेंस कॉल करें',
            'चिकित्सा देखभाल लेने में देरी न करें',
            'कोई भी पिछला मेडिकल रिकॉर्ड साथ लाएं',
        ];
    } else if (totalSeverity >= 6 || duration >= 4) {
        severity = 'Moderate';
        careLevel = 'phc';
        careLevelText = 'Visit Primary Health Center';
        careLevelTextHi = 'प्राथमिक स्वास्थ्य केंद्र जाएं';
        reasoning = 'Your symptoms suggest you should consult a doctor at a PHC for proper diagnosis and treatment.';
        reasoningHi = 'आपके लक्षण बताते हैं कि आपको उचित निदान और उपचार के लिए PHC में डॉक्टर से परामर्श लेना चाहिए।';
        recommendations = [
            'Visit your nearest PHC within 24 hours',
            'Bring your Ayushman Bharat card if you have one',
            'Monitor your symptoms',
            'Stay hydrated and take rest',
        ];
        recommendationsHi = [
            '24 घंटे के भीतर अपने निकटतम PHC में जाएं',
            'यदि आपके पास आयुष्मान भारत कार्ड है तो लाएं',
            'अपने लक्षणों की निगरानी करें',
            'हाइड्रेटेड रहें और आराम करें',
        ];
    } else {
        severity = 'Mild';
        careLevel = 'self-care';
        careLevelText = 'Self-Care at Home';
        careLevelTextHi = 'घर पर देखभाल करें';
        reasoning = 'Your symptoms are mild and can likely be managed at home with self-care.';
        reasoningHi = 'आपके लक्षण हल्के हैं और संभवतः घर पर देखभाल से प्रबंधित किए जा सकते हैं।';
        recommendations = [
            'Rest at home',
            'Drink plenty of fluids (ORS if needed)',
            'Take paracetamol if you have fever',
            'If symptoms worsen or persist beyond 3 days, visit PHC',
        ];
        recommendationsHi = [
            'घर पर आराम करें',
            'पर्याप्त मात्रा में तरल पदार्थ पिएं (आवश्यकता हो तो ORS)',
            'यदि बुखार है तो पैरासिटामोल लें',
            'यदि लक्षण बिगड़ते हैं या 3 दिनों से अधिक रहते हैं, तो PHC जाएं',
        ];
    }

    return {
        severity,
        careLevel,
        careLevelText,
        careLevelTextHi,
        reasoning,
        reasoningHi,
        recommendations,
        recommendationsHi,
    };
}
