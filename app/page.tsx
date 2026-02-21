'use client';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import Link from 'next/link';
import {
  MessageCircle,
  Stethoscope,
  MapPin,
  Pill,
  FileText,
  Phone,
  Heart,
  Users,
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const features = [
    {
      icon: MessageCircle,
      title: language === 'en' ? 'AI Health Assistant' : 'AI स्वास्थ्य सहायक',
      desc: language === 'en' ? 'Get instant health advice in your language' : 'अपनी भाषा में तुरंत स्वास्थ्य सलाह पाएं',
      href: '/chat',
      iconClass: 'emerald',
    },
    {
      icon: Stethoscope,
      title: language === 'en' ? 'Symptom Checker' : 'लक्षण जांच',
      desc: language === 'en' ? 'Quick 3-step health assessment' : '3 चरणों में त्वरित स्वास्थ्य जांच',
      href: '/symptoms',
      iconClass: 'blue',
    },
    {
      icon: MapPin,
      title: language === 'en' ? 'Find Facilities' : 'सुविधाएं खोजें',
      desc: language === 'en' ? 'Locate nearby health centers' : 'नज़दीकी स्वास्थ्य केंद्र खोजें',
      href: '/facilities',
      iconClass: 'purple',
    },
    {
      icon: Pill,
      title: language === 'en' ? 'Medicines Info' : 'दवा जानकारी',
      desc: language === 'en' ? 'Find generic alternatives & save money' : 'जेनेरिक विकल्प खोजें और पैसे बचाएं',
      href: '/medicines',
      iconClass: 'orange',
    },
    {
      icon: FileText,
      title: language === 'en' ? 'Govt Schemes' : 'सरकारी योजनाएं',
      desc: language === 'en' ? 'Check eligibility for health schemes' : 'स्वास्थ्य योजनाओं की पात्रता जांचें',
      href: '/schemes',
      iconClass: 'cyan',
    },
    {
      icon: Phone,
      title: language === 'en' ? 'Emergency' : 'आपातकाल',
      desc: language === 'en' ? '24/7 emergency access' : '24/7 आपातकालीन सहायता',
      href: '/emergency',
      iconClass: 'red',
    },
  ];

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-icon"></div>
            <div className="logo-text">
              <h1>{t('appName')}</h1>
              <p>{t('appTagline')}</p>
            </div>
          </div>
          <button onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} className="lang-btn">
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles style={{ width: 16, height: 16 }} />
            <span>{language === 'en' ? '🎉 AI-Powered Healthcare for Rural India' : '🎉 ग्रामीण भारत के लिए AI स्वास्थ्य सेवा'}</span>
          </div>

          <h2>
            <span className="gradient-text">
              {language === 'en' ? 'Your Health,' : 'आपका स्वास्थ्य,'}
            </span>
            <br />
            <span className="gradient-text">
              {language === 'en' ? 'Our Priority' : 'हमारी प्राथमिकता'}
            </span>
          </h2>

          <p className="hero-description">
            {language === 'en'
              ? 'Get instant health guidance, find nearby facilities, and access government schemes - all in your language, for free.'
              : 'तुरंत स्वास्थ्य मार्गदर्शन प्राप्त करें, नज़दीकी सुविधाएं खोजें, और सरकारी योजनाओं का लाभ उठाएं - सब आपकी भाषा में, मुफ्त।'
            }
          </p>

          <div className="hero-buttons">
            <Link href="/chat" className="btn btn-primary">
              <MessageCircle style={{ width: 24, height: 24 }} />
              {t('startConversation')}
              <ChevronRight style={{ width: 20, height: 20 }} />
            </Link>
            <Link href="/symptoms" className="btn btn-secondary">
              <Stethoscope style={{ width: 24, height: 24 }} />
              {language === 'en' ? 'Check Symptoms' : 'लक्षण जांचें'}
            </Link>
          </div>

          <div className="stats">
            <div className="stat-card">
              <Users className="stat-icon" />
              <div className="stat-value">50,000+</div>
              <div className="stat-label">{language === 'en' ? 'Users Helped' : 'उपयोगकर्ताओं की मदद की'}</div>
            </div>
            <div className="stat-card">
              <Heart className="stat-icon" />
              <div className="stat-value">25,000+</div>
              <div className="stat-label">{language === 'en' ? 'Health Centers' : 'स्वास्थ्य केंद्र'}</div>
            </div>
            <div className="stat-card">
              <Award className="stat-icon" />
              <div className="stat-value">100%</div>
              <div className="stat-label">{language === 'en' ? 'Free Service' : 'मुफ्त सेवा'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-header">
          <h3 className="section-title">{language === 'en' ? 'Our Services' : 'हमारी सेवाएं'}</h3>
          <p className="section-subtitle">
            {language === 'en' ? 'Comprehensive healthcare solutions powered by AI' : 'AI द्वारा संचालित व्यापक स्वास्थ्य सेवा समाधान'}
          </p>
        </div>

        <div className="container">
          <div className="features-grid">
            {features.map((feature, idx) => (
              <Link key={idx} href={feature.href} className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className={`feature-icon-bg ${feature.iconClass}`}></div>
                  <div className="feature-icon">
                    <feature.icon />
                  </div>
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-desc">{feature.desc}</p>
                <span className="feature-link">
                  {language === 'en' ? 'Learn More' : 'और जानें'}
                  <ChevronRight style={{ width: 20, height: 20 }} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-content">
          <h3>{language === 'en' ? 'Ready to Get Started?' : 'शुरू करने के लिए तैयार हैं?'}</h3>
          <p>
            {language === 'en'
              ? 'Join 50,000+ rural users who trust Swasthya Saathi for their health needs'
              : '50,000+ ग्रामीण उपयोगकर्ताओं में शामिल हों जो अपनी स्वास्थ्य आवश्यकताओं के लिए स्वास्थ्य साथी पर भरोसा करते हैं'
            }
          </p>
          <div className="cta-buttons">
            <Link href="/chat" className="btn btn-white">
              <MessageCircle style={{ width: 24, height: 24 }} />
              {language === 'en' ? 'Start AI Chat' : 'AI चैट शुरू करें'}
            </Link>
            <Link href="/symptoms" className="btn btn-outline">
              <Stethoscope style={{ width: 24, height: 24 }} />
              {language === 'en' ? 'Check Symptoms' : 'लक्षण जांचें'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <h4>{t('appName')}</h4>
              <p>
                {language === 'en'
                  ? 'Empowering Rural India with AI-powered healthcare'
                  : 'AI-संचालित स्वास्थ्य सेवा के साथ ग्रामीण भारत को सशक्त बना रहे हैं'
                }
              </p>
            </div>
            <div className="footer-links">
              <h5>{language === 'en' ? 'Quick Links' : 'त्वरित लिंक'}</h5>
              <Link href="/chat">AI Assistant</Link>
              <Link href="/symptoms">Symptom Checker</Link>
              <Link href="/facilities">Find Facilities</Link>
            </div>
            <div className="footer-links">
              <h5>{language === 'en' ? 'Emergency' : 'आपातकाल'}</h5>
              <p style={{ color: '#9CA3AF' }}>Ambulance: <strong style={{ color: '#EF4444' }}>108</strong></p>
              <p style={{ color: '#9CA3AF' }}>Police: <strong>100</strong></p>
              <p style={{ color: '#9CA3AF' }}>Fire: <strong>101</strong></p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 Swasthya Saathi. {language === 'en' ? 'Built with' : 'से बनाया गया'} ❤️ {language === 'en' ? 'for rural India' : 'ग्रामीण भारत के लिए'}</p>
          </div>
        </div>
      </footer>

      {/* Emergency Button */}
      <div className="emergency-float">
        <Link href="/emergency" className="emergency-btn">
          <Phone />
        </Link>
      </div>
    </div>
  );
}
