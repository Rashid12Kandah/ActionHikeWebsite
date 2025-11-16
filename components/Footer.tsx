import React from 'react';
import { INSTAGRAM_LINK, WHATSAPP_LINK } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const InstagramIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" strokeWidth="2"></rect>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
    </svg>
);

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.908 6.161l-1.317 4.814 4.905-1.295z" />
    </svg>
);


const Footer: React.FC = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-brand-dark border-t border-brand-charcoal">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between">
                <div className="flex justify-center space-x-6 rtl:space-x-reverse sm:order-2">
                    <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
                        <span className="sr-only">Instagram</span>
                        <InstagramIcon />
                    </a>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-accent transition-colors duration-300">
                        <span className="sr-only">WhatsApp</span>
                        <WhatsAppIcon />
                    </a>
                </div>
                <p className="mt-4 sm:mt-0 sm:order-1 text-center text-base text-gray-400">
                    &copy; {new Date().getFullYear()} {t('footer_copyright')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;