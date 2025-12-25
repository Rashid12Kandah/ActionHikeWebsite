import React from 'react';
import { WHATSAPP_LINK, INSTAGRAM_LINK } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="contact" className="py-20 sm:py-32 bg-brand-shadow">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    {t('contact_title')}
                </h2>
                <p className="mt-4 text-lg text-gray-300">
                    {t('contact_description')}
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                     <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-brand-accent text-brand-dark font-bold py-4 px-10 rounded-full uppercase tracking-wider hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                        {t('contact_cta_whatsapp')}
                    </a>
                    <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="border-2 border-brand-accent text-brand-accent font-bold py-4 px-10 rounded-full uppercase tracking-wider hover:bg-brand-accent hover:text-brand-dark transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                        {t('contact_cta_instagram')}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;