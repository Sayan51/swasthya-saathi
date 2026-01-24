'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useState } from 'react';
import Link from 'next/link';
import { Home, Phone, MapPin, AlertTriangle, Heart, Activity } from 'lucide-react';

export default function EmergencyPage() {
    const { t, language } = useLanguage();
    const [showConfirm, setShowConfirm] = useState(false);
    const [shareLocation, setShareLocation] = useState(true);

    const handleCall = () => {
        setShowConfirm(true);
    };

    const confirmCall = () => {
        // Trigger call to 108
        window.location.href = 'tel:108';
    };

    const firstAidTips = [
        {
            title: language === 'en' ? 'CPR (Cardiopulmonary Resuscitation)' : 'CPR (हृदय फेफड़े पुनर्जीवन)',
            icon: Heart,
            steps: language === 'en'
                ? ['Place hands on center of chest', '30 compressions (100-120 per min)', '2 rescue breaths', 'Repeat until help arrives']
                : ['छाती के बीच में हाथ रखें', '30 बार दबाएं (100-120 प्रति मिनट)', '2 बार सांस दें', 'मदद आने तक दोहराएं'],
        },
        {
            title: language === 'en' ? 'Choking' : 'गला घुटना',
            icon: AlertTriangle,
            steps: language === 'en'
                ? ['Stand behind person', '5 back blows between shoulder blades', '5 abdominal thrusts (Heimlich)', 'Repeat until object is expelled']
                : ['व्यक्ति के पीछे खड़े हों', 'कंधे की हड्डियों के बीच 5 बार पीठ पर थपथपाएं', '5 बार पेट पर दबाव डालें', 'वस्तु निकलने तक दोहराएं'],
        },
        {
            title: language === 'en' ? 'Severe Bleeding' : 'गंभीर रक्तस्राव',
            icon: Activity,
            steps: language === 'en'
                ? ['Apply direct pressure with clean cloth', 'Elevate injured area above heart', 'Don\'t remove cloth if soaked', 'Call 108 immediately']
                : ['साफ कपड़े से सीधे दबाव डालें', 'घायल क्षेत्र को हृदय से ऊपर उठाएं', 'कपड़ा भीग जाए तो न हटाएं', 'तुरंत 108 कॉल करें'],
        },
    ];

    const emergencyContacts = [
        { name: language === 'en' ? 'Ambulance' : 'एम्बुलेंस', number: '108', icon: '🚑' },
        { name: language === 'en' ? 'Police' : 'पुलिस', number: '100', icon: '🚓' },
        { name: language === 'en' ? 'Fire' : 'अग्निशमन', number: '101', icon: '🚒' },
        { name: language === 'en' ? 'Women Helpline' : 'महिला हेल्पलाइन', number: '1091', icon: '👩' },
        { name: language === 'en' ? 'Child Helpline' : 'बाल हेल्पलाइन', number: '1098', icon: '👶' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-rose-50">
            {/* Header */}
            <header className="bg-red-600 text-white shadow-lg px-4 py-3 flex items-center gap-3">
                <Link href="/" className="p-2 hover:bg-red-700 rounded-lg transition">
                    <Home className="w-6 h-6" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-bold">{t('emergency')}</h1>
                    <p className="text-sm text-red-100">
                        {language === 'en' ? '24/7 Emergency Services' : '24/7 आपातकालीन सेवाएं'}
                    </p>
                </div>
                <AlertTriangle className="w-8 h-8 animate-pulse" />
            </header>

            {/* Emergency Call Section */}
            <div className="p-4">
                <div className="max-w-2xl mx-auto">
                    <div className="card bg-gradient-to-br from-red-500 to-rose-600 text-white text-center p-8 mb-6">
                        <Phone className="w-20 h-20 mx-auto mb-4 animate-bounce" />
                        <h2 className="text-3xl font-bold mb-2">{t('call108')}</h2>
                        <p className="text-red-100 mb-6">
                            {language === 'en'
                                ? 'Free ambulance service across India'
                                : 'भारत भर में मुफ्त एम्बुलेंस सेवा'
                            }
                        </p>
                        <button
                            onClick={handleCall}
                            className="btn bg-white text-red-600 text-xl font-bold py-6 px-8 hover:bg-gray-100 shadow-xl animate-pulse"
                        >
                            <Phone className="w-6 h-6 mr-3" />
                            {language === 'en' ? 'Call 108 Now' : 'अभी 108 कॉल करें'}
                        </button>
                    </div>

                    {/* Other Emergency Numbers */}
                    <div className="card mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {language === 'en' ? 'Other Emergency Numbers' : 'अन्य आपातकालीन नंबर'}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {emergencyContacts.map((contact, idx) => (
                                <a
                                    key={idx}
                                    href={`tel:${contact.number}`}
                                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                                >
                                    <span className="text-3xl">{contact.icon}</span>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">{contact.name}</p>
                                        <p className="text-lg font-bold text-red-600">{contact.number}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nearest Hospital */}
                    <Link href="/facilities?filter=Hospital" className="card hover:shadow-xl transition mb-6">
                        <div className="flex items-center gap-4">
                            <MapPin className="w-12 h-12 text-red-600" />
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-900">
                                    {language === 'en' ? 'Find Nearest Hospital' : 'नजदीकी अस्पताल खोजें'}
                                </h3>
                                <p className="text-gray-600">
                                    {language === 'en' ? 'Get directions to emergency facilities' : 'आपातकालीन सुविधाओं का रास्ता पाएं'}
                                </p>
                            </div>
                            <div className="text-red-600">→</div>
                        </div>
                    </Link>

                    {/* First Aid Tips */}
                    <div className="card">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {t('firstAidTips')}
                        </h3>
                        <div className="space-y-4">
                            {firstAidTips.map((tip, idx) => (
                                <details key={idx} className="bg-gray-50 rounded-xl p-4">
                                    <summary className="font-bold text-gray-900 cursor-pointer flex items-center gap-3">
                                        <tip.icon className="w-6 h-6 text-red-600" />
                                        {tip.title}
                                    </summary>
                                    <ol className="mt-3 ml-9 space-y-2">
                                        {tip.steps.map((step, stepIdx) => (
                                            <li key={stepIdx} className="text-gray-700">
                                                <span className="font-semibold text-red-600">{stepIdx + 1}.</span> {step}
                                            </li>
                                        ))}
                                    </ol>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <>
                    <div className="modal-backdrop" onClick={() => setShowConfirm(false)} />
                    <div className="modal p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('confirmEmergency')}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {language === 'en'
                                ? 'This will call 108 ambulance service. Your location will be shared if enabled.'
                                : 'यह 108 एम्बुलेंस सेवा को कॉल करेगा। यदि सक्षम हो तो आपका स्थान साझा किया जाएगा।'
                            }
                        </p>

                        <div className="flex items-center gap-3 mb-6">
                            <input
                                type="checkbox"
                                id="location"
                                checked={shareLocation}
                                onChange={(e) => setShareLocation(e.target.checked)}
                                className="w-5 h-5"
                            />
                            <label htmlFor="location" className="text-gray-700">
                                {t('shareLocation')}
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="btn btn-ghost flex-1"
                            >
                                {t('cancel')}
                            </button>
                            <button
                                onClick={confirmCall}
                                className="btn btn-accent flex-1 animate-pulse"
                            >
                                <Phone className="w-5 h-5 mr-2" />
                                {t('call108')}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
