import React, { useState, useEffect } from 'react';
import { NAV_LINKS, INSTAGRAM_LINK, WHATSAPP_LINK } from '../constants';
import { useLanguage } from '../context/LanguageContext';
import actionHikeLogo from '../src/ActionHikeLogo.jpg';

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


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t, toggleLanguage } = useLanguage();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="#" className="flex items-center space-x-2">
                           <img src={actionHikeLogo} alt="Action Hike Logo" className="h-12 w-auto" />
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ms-10 flex items-baseline space-x-4 rtl:space-x-reverse">
                            {NAV_LINKS.map(link => (
                                <a key={link.href} href={link.href} className="text-brand-accent/80 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 uppercase tracking-widest">{t(link.labelKey)}</a>
                            ))}
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                        <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-brand-accent/80 hover:text-brand-accent transition-colors duration-300">
                            <InstagramIcon />
                        </a>
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-brand-accent/80 hover:text-brand-accent transition-colors duration-300">
                            <WhatsAppIcon />
                        </a>
                        <button onClick={toggleLanguage} className="text-brand-accent/80 hover:text-brand-accent px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 uppercase tracking-widest">
                            {t('switchToLanguage')}
                        </button>
                    </div>
                    <div className="-me-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-brand-accent hover:text-white hover:bg-brand-charcoal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brand-dark/95 backdrop-blur-lg">
                        {NAV_LINKS.map(link => (
                            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-brand-accent/80 hover:text-brand-accent hover:bg-brand-charcoal block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 uppercase tracking-widest text-center">{t(link.labelKey)}</a>
                        ))}
                         <div className="border-t border-brand-charcoal my-2"></div>
                         <div className="flex items-center justify-between px-3 pt-2 pb-2">
                             <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="text-brand-accent/80 hover:text-brand-accent transition-colors duration-300">
                                    <InstagramIcon />
                                </a>
                                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-brand-accent/80 hover:text-brand-accent transition-colors duration-300">
                                    <WhatsAppIcon />
                                </a>
                            </div>
                            <button onClick={toggleLanguage} className="text-brand-accent/80 hover:text-brand-accent px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 uppercase tracking-widest">
                                {t('switchToLanguage')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;