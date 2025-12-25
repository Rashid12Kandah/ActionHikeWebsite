import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-20 sm:py-32 bg-brand-shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-brand-accent font-semibold tracking-wide uppercase">{t('about_heading')}</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        {t('about_title')}
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-300 lg:mx-auto">
                       {t('about_description')}
                    </p>
                </div>
                <div className="mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="flex flex-col items-center text-center">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-charcoal text-brand-accent mb-4">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">{t('about_feature1_title')}</h3>
                            <p className="mt-2 text-gray-400">{t('about_feature1_desc')}</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-charcoal text-brand-accent mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">{t('about_feature2_title')}</h3>
                            <p className="mt-2 text-gray-400">{t('about_feature2_desc')}</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                             <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-charcoal text-brand-accent mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                             </div>
                            <h3 className="text-xl font-bold text-white">{t('about_feature3_title')}</h3>
                            <p className="mt-2 text-gray-400">{t('about_feature3_desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;