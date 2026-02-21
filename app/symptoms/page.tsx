'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, ChevronLeft, Download, Loader2, Phone, MapPin } from 'lucide-react';
import { symptomCategories, assessSymptoms, type Assessment } from '@/lib/data/symptomData';

type Step = 'intro' | 'categories' | 'symptoms' | 'duration' | 'analyzing' | 'results';

export default function SymptomsPage() {
    const { t, language } = useLanguage();
    const [currentStep, setCurrentStep] = useState<Step>('intro');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [duration, setDuration] = useState<number>(1);
    const [assessment, setAssessment] = useState<Assessment | null>(null);

    const handleCategoryToggle = (catId: string) => {
        setSelectedCategories(prev =>
            prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]
        );
    };

    const handleSymptomToggle = (symptomId: string) => {
        setSelectedSymptoms(prev =>
            prev.includes(symptomId) ? prev.filter(id => id !== symptomId) : [...prev, symptomId]
        );
    };

    const handleNext = () => {
        if (currentStep === 'intro') setCurrentStep('categories');
        else if (currentStep === 'categories') setCurrentStep('symptoms');
        else if (currentStep === 'symptoms') setCurrentStep('duration');
        else if (currentStep === 'duration') {
            setCurrentStep('analyzing');
            setTimeout(() => {
                const result = assessSymptoms(selectedSymptoms, duration);
                setAssessment(result);
                setCurrentStep('results');
            }, 2000);
        }
    };

    const handleReset = () => {
        setCurrentStep('intro');
        setSelectedCategories([]);
        setSelectedSymptoms([]);
        setDuration(1);
        setAssessment(null);
    };

    const getProgress = () => {
        switch (currentStep) {
            case 'intro': return 0;
            case 'categories': return 25;
            case 'symptoms': return 50;
            case 'duration': return 75;
            case 'analyzing': return 90;
            case 'results': return 100;
            default: return 0;
        }
    };

    const canProceed = () => {
        if (currentStep === 'categories') return selectedCategories.length > 0;
        if (currentStep === 'symptoms') return selectedSymptoms.length > 0;
        return true;
    };

    // Get available symptoms from selected categories
    const availableSymptoms = symptomCategories
        .filter(cat => selectedCategories.includes(cat.id))
        .flatMap(cat => cat.symptoms.map(s => ({ ...s, categoryIcon: cat.icon })));

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-md px-4 py-3 flex items-center gap-3">
                <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Home className="w-6 h-6 text-gray-700" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-bold text-gray-900">{t('symptomCheckerTitle')}</h1>
                    <p className="text-sm text-gray-600">{t('symptomCheckerSubtitle')}</p>
                </div>
            </header>

            {/* Progress Bar */}
            {currentStep !== 'intro' && (
                <div className="bg-white px-4 py-2">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                            style={{ width: `${getProgress()}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Intro */}
                {currentStep === 'intro' && (
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <div className="text-6xl mb-6">🩺</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {t('symptomCheckerTitle')}
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            {language === 'en'
                                ? 'Quick 3-step assessment to understand your symptoms and get care recommendations'
                                : '3 चरणों में त्वरित जांच से अपने लक्षणों को समझें और देखभाल की सिफारिशें प्राप्त करें'}
                        </p>
                        <button onClick={handleNext} className="btn btn-primary text-lg">
                            {t('startCheck')} <ChevronRight className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                )}

                {/* Step 1: Categories */}
                {currentStep === 'categories' && (
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('selectBodyParts')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {symptomCategories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryToggle(category.id)}
                                    className={`card card-interactive text-left ${selectedCategories.includes(category.id) ? 'ring-4 ring-blue-500' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl">{category.icon}</div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-lg">
                                                {language === 'hi' ? category.nameHi : category.name}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                {category.symptoms.length} {language === 'en' ? 'symptoms' : 'लक्षण'}
                                            </p>
                                        </div>
                                        {selectedCategories.includes(category.id) && (
                                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm">✓</span>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Symptoms */}
                {currentStep === 'symptoms' && (
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('selectSymptoms')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availableSymptoms.map(symptom => (
                                <button
                                    key={symptom.id}
                                    onClick={() => handleSymptomToggle(symptom.id)}
                                    className={`card card-interactive text-left ${selectedSymptoms.includes(symptom.id) ? 'ring-4 ring-purple-500' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{symptom.categoryIcon}</span>
                                        <div className="flex-1">
                                            <h4 className="font-semibold">
                                                {language === 'hi' ? symptom.nameHi : symptom.name}
                                            </h4>
                                        </div>
                                        {selectedSymptoms.includes(symptom.id) && (
                                            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm">✓</span>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 3: Duration */}
                {currentStep === 'duration' && (
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('symptomduration')}</h3>
                        <div className="card p-8">
                            <div className="space-y-6">
                                {[
                                    { days: 1, label: t('oneDay') },
                                    { days: 2, label: t('twoDays') },
                                    { days: 4, label: t('fourDays') },
                                    { days: 7, label: t('oneWeek') },
                                ].map(option => (
                                    <button
                                        key={option.days}
                                        onClick={() => setDuration(option.days)}
                                        className={`w-full p-4 rounded-xl border-2 transition ${duration === option.days
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                    >
                                        <span className="font-semibold text-lg">{option.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Analyzing */}
                {currentStep === 'analyzing' && (
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <Loader2 className="w-20 h-20 text-blue-600 animate-spin mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('analyzing')}</h3>
                        <p className="text-gray-600">
                            {language === 'en'
                                ? 'Please wait while we analyze your symptoms...'
                                : 'कृपया प्रतीक्षा करें जब तक हम आपके लक्षणों का विश्लेषण करते हैं...'}
                        </p>
                    </div>
                )}

                {/* Results */}
                {currentStep === 'results' && assessment && (
                    <div className="max-w-3xl mx-auto">
                        <div className="card p-8 mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                {language === 'en' ? 'Your Assessment Results' : 'आपकी जांच परिणाम'}
                            </h3>

                            {/* Severity Badge */}
                            <div className="mb-6">
                                <span
                                    className={`badge text-lg py-2 px-4 ${assessment.severity === 'Severe'
                                            ? 'badge-error'
                                            : assessment.severity === 'Moderate'
                                                ? 'badge-warning'
                                                : 'badge-success'
                                        }`}
                                >
                                    {language === 'en' ? `Severity: ${assessment.severity}` : `गंभीरता: ${assessment.severity}`}
                                </span>
                            </div>

                            {/* Care Level */}
                            <div className="bg-blue-50 rounded-xl p-6 mb-6">
                                <h4 className="font-bold text-lg text-blue-900 mb-2">
                                    {language === 'en' ? 'Recommended Care Level' : 'अनुशंसित देखभाल स्तर'}
                                </h4>
                                <p className="text-2xl font-bold text-blue-600">
                                    {language === 'hi' ? assessment.careLevelTextHi : assessment.careLevelText}
                                </p>
                            </div>

                            {/* Reasoning */}
                            <div className="mb-6">
                                <h4 className="font-bold text-lg text-gray-900 mb-2">
                                    {language === 'en' ? 'Why?' : 'क्यों?'}
                                </h4>
                                <p className="text-gray-700">
                                    {language === 'hi' ? assessment.reasoningHi : assessment.reasoning}
                                </p>
                            </div>

                            {/* Recommendations */}
                            <div className="mb-6">
                                <h4 className="font-bold text-lg text-gray-900 mb-3">
                                    {language === 'en' ? 'Next Steps' : 'अगले कदम'}
                                </h4>
                                <ul className="space-y-2">
                                    {(language === 'hi' ? assessment.recommendationsHi : assessment.recommendations).map((rec, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="text-green-600 mt-1">✓</span>
                                            <span className="text-gray-700">{rec}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3">
                                {assessment.careLevel !== 'self-care' && (
                                    <>
                                        <Link href="/facilities" className="btn btn-primary">
                                            <MapPin className="w-5 h-5 mr-2" />
                                            {language === 'en' ? 'Find Nearest Facility' : 'नज़दीकी सुविधा खोजें'}
                                        </Link>
                                        {assessment.careLevel === 'hospital' && (
                                            <Link href="/emergency" className="btn btn-accent">
                                                <Phone className="w-5 h-5 mr-2" />
                                                {language === 'en' ? 'Call 108' : '108 कॉल करें'}
                                            </Link>
                                        )}
                                    </>
                                )}
                                <button onClick={handleReset} className="btn btn-outline">
                                    {t('recheck')}
                                </button>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                            <p className="text-sm text-yellow-800">
                                ⚠️ {t('disclaimer')}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            {currentStep !== 'intro' && currentStep !== 'analyzing' && currentStep !== 'results' && (
                <div className="bg-white border-t border-gray-200 p-4 flex gap-3">
                    {currentStep !== 'categories' && (
                        <button
                            onClick={() => {
                                if (currentStep === 'symptoms') setCurrentStep('categories');
                                else if (currentStep === 'duration') setCurrentStep('symptoms');
                            }}
                            className="btn btn-ghost"
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            {t('previous')}
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="btn btn-primary flex-1"
                    >
                        {currentStep === 'duration' ? t('submit') : t('next')}
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
}
