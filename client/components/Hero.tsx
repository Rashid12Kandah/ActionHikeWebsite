import React from 'react';
import { WHATSAPP_LINK, INSTAGRAM_LINK } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import heroBg from '../src/Wadi Rum - Yehya.png';

const Hero: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="home" className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}></div>
            <div className="absolute inset-0 bg-brand-dark opacity-70"></div>
            <div className="relative z-10 p-8 flex flex-col items-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-brand-accent uppercase tracking-widest" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                    {t('hero_title')}
                </h1>
                <p className="mt-4 text-lg md:text-2xl text-brand-accent/90 max-w-2xl font-light tracking-wide">
                    {t('hero_tagline')}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-accent text-brand-dark font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
                        {t('hero_cta_whatsapp')}
                    </a>
                    <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="border-2 border-brand-accent text-brand-accent font-bold py-3 px-8 rounded-full uppercase tracking-wider hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg">
                        {t('hero_cta_instagram')}
                    </a>
                </div>
            </div>
             <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                <a href="#about" aria-label="Scroll down">
                  <svg className="w-8 h-8 text-brand-accent animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                </a>
             </div>
        </section>
    );
};

export default Hero;