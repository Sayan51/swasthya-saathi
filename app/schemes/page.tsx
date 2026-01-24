'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Download, CheckCircle, XCircle, Phone } from 'lucide-react';
import { schemes, eligibilityQuestions, checkEligibility, type Scheme } from '@/lib/data/schemeData';

export default function SchemesPage() {
    const { t, language } = useLanguage();
    const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResults, setShowResults] = useState(false);
    const [isEligible, setIsEligible] = useState(false);

    const handleAnswer = (questionId: string, value: string) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleNext = () => {
        if (currentQuestion < eligibilityQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Check eligibility
            const eligible = checkEligibility(selectedScheme!.id, answers);
            setIsEligible(eligible);
            setShowResults(true);
        }
    };

    const handleReset = () => {
        setSelectedScheme(null);
        setCurrentQuestion(0);
        setAnswers({});
        setShowResults(false);
    };

    const canProceed = () => {
        const currentQ = eligibilityQuestions[currentQuestion];
        return answers[currentQ.id] !== undefined;
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-cyan-50">
            {/* Header */}
            <header className="bg-white shadow-md px-4 py-3 flex items-center gap-3">
                <Link href="/" className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Home className="w-6 h-6 text-gray-700" />
                </Link>
                <div className="flex-1">
                    <h1 className="text-xl font-bold text-gray-900">{t('schemeNavigatorTitle')}</h1>
                    <p className="text-sm text-gray-600">
                        {language === 'en' ? 'Check eligibility & enroll' : 'पात्रता जांचें और नामांकन करें'}
                    </p>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
                {/* Scheme Selection */}
                {!selectedScheme && !showResults && (
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {language === 'en' ? 'Select a Scheme' : 'एक योजना चुनें'}
                        </h2>
                        <div className="space-y-4">
                            {schemes.map(scheme => (
                                <button
                                    key={scheme.id}
                                    onClick={() => setSelectedScheme(scheme)}
                                    className="card w-full text-left hover:shadow-xl transition group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {language === 'hi' ? scheme.nameHi : scheme.name}
                                            </h3>
                                            <p className="text-gray-600 mb-4">
                                                {language === 'hi' ? scheme.descriptionHi : scheme.description}
                                            </p>
                                            <div className="space-y-1">
                                                {(language === 'hi' ? scheme.benefitsHi : scheme.benefits).slice(0, 3).map((benefit, idx) => (
                                                    <div key={idx} className="flex items-start gap-2 text-sm">
                                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-teal-600 transition flex-shrink-0 mt-2" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Eligibility Quiz */}
                {selectedScheme && !showResults && (
                    <div className="max-w-2xl mx-auto">
                        <div className="mb-6">
                            <button onClick={handleReset} className="btn btn-ghost text-sm mb-4">
                                ← {language === 'en' ? 'Back' : 'वापस'}
                            </button>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                {language === 'hi' ? selectedScheme.nameHi : selectedScheme.name}
                            </h2>
                            <p className="text-gray-600">
                                {language === 'en'
                                    ? `Question ${currentQuestion + 1} of ${eligibilityQuestions.length}`
                                    : `प्रश्न ${currentQuestion + 1} / ${eligibilityQuestions.length}`
                                }
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
                                    style={{ width: `${((currentQuestion + 1) / eligibilityQuestions.length) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Question */}
                        <div className="card p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {language === 'hi'
                                    ? eligibilityQuestions[currentQuestion].questionHi
                                    : eligibilityQuestions[currentQuestion].question
                                }
                            </h3>

                            <div className="space-y-3">
                                {eligibilityQuestions[currentQuestion].options.map(option => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleAnswer(eligibilityQuestions[currentQuestion].id, option.value)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition ${answers[eligibilityQuestions[currentQuestion].id] === option.value
                                            ? 'border-teal-500 bg-teal-50'
                                            : 'border-gray-200 hover:border-teal-300'
                                            }`}
                                    >
                                        <span className="font-semibold">
                                            {language === 'hi' ? option.labelHi : option.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="mt-6 flex gap-3">
                            {currentQuestion > 0 && (
                                <button
                                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                                    className="btn btn-ghost"
                                >
                                    {t('previous')}
                                </button>
                            )}
                            <button
                                onClick={handleNext}
                                disabled={!canProceed()}
                                className="btn btn-primary flex-1"
                            >
                                {currentQuestion === eligibilityQuestions.length - 1
                                    ? t('submit')
                                    : t('next')
                                }
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Results */}
                {showResults && selectedScheme && (
                    <div className="max-w-3xl mx-auto">
                        <div className="card mb-6">
                            <div className="text-center mb-6">
                                {isEligible ? (
                                    <>
                                        <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
                                        <h2 className="text-3xl font-bold text-green-600 mb-2">
                                            {t('youQualify')}
                                        </h2>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-20 h-20 text-red-600 mx-auto mb-4" />
                                        <h2 className="text-3xl font-bold text-red-600 mb-2">
                                            {t('notEligible')}
                                        </h2>
                                    </>
                                )}
                                <p className="text-gray-600">
                                    {language === 'hi' ? selectedScheme.nameHi : selectedScheme.name}
                                </p>
                            </div>

                            {isEligible && (
                                <>
                                    {/* Benefits */}
                                    <div className="bg-green-50 rounded-xl p-6 mb-6">
                                        <h3 className="font-bold text-lg text-green-900 mb-3">{t('benefits')}</h3>
                                        <ul className="space-y-2">
                                            {(language === 'hi' ? selectedScheme.benefitsHi : selectedScheme.benefits).map((benefit, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-gray-700">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Enrollment Steps */}
                                    <div className="mb-6">
                                        <h3 className="font-bold text-lg text-gray-900 mb-3">
                                            {language === 'en' ? 'How to Enroll' : 'नामांकन कैसे करें'}
                                        </h3>
                                        <div className="space-y-3">
                                            {(language === 'hi' ? selectedScheme.enrollmentStepsHi : selectedScheme.enrollmentSteps).map((step, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-gray-700 pt-1">{step}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Helpline */}
                                    <div className="bg-blue-50 rounded-xl p-4 mb-6">
                                        <p className="text-sm text-blue-900 mb-1">
                                            {language === 'en' ? 'Need help?' : 'मदद चाहिए?'}
                                        </p>
                                        <a href={`tel:${selectedScheme.helpline}`} className="text-xl font-bold text-blue-600">
                                            <Phone className="inline w-5 h-5 mr-2" />
                                            {selectedScheme.helpline}
                                        </a>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        <a
                                            href={selectedScheme.downloadLink || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary flex-1 flex items-center justify-center text-center no-underline"
                                            onClick={(e) => !selectedScheme.downloadLink && e.preventDefault()}
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            {t('downloadGuide')}
                                        </a>
                                        <a
                                            href={selectedScheme.abhaLink || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-secondary flex-1 flex items-center justify-center text-center no-underline"
                                            onClick={(e) => !selectedScheme.abhaLink && e.preventDefault()}
                                        >
                                            {t('createABHA')}
                                        </a>
                                    </div>
                                </>
                            )}

                            {!isEligible && (
                                <div className="text-center">
                                    <p className="text-gray-600 mb-6">
                                        {language === 'en'
                                            ? 'You may not meet all the eligibility criteria for this scheme. Try checking other schemes or call the helpline for more information.'
                                            : 'आप इस योजना के लिए सभी पात्रता मानदंडों को पूरा नहीं कर सकते हैं। अन्य योजनाओं की जांच करने का प्रयास करें या अधिक जानकारी के लिए हेल्पलाइन पर कॉल करें।'
                                        }
                                    </p>
                                    <a href={`tel:${selectedScheme.helpline}`} className="btn btn-primary">
                                        <Phone className="w-5 h-5 mr-2" />
                                        {language === 'en' ? 'Call Helpline' : 'हेल्पलाइन कॉल करें'}: {selectedScheme.helpline}
                                    </a>
                                </div>
                            )}
                        </div>

                        <button onClick={handleReset} className="btn btn-outline w-full">
                            {language === 'en' ? 'Check Another Scheme' : 'दूसरी योजना जांचें'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
