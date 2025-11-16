import React from 'react';
import { GALLERY_IMAGES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Gallery: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="gallery" className="py-20 sm:py-32 bg-brand-shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-base text-brand-accent font-semibold tracking-wide uppercase">{t('gallery_heading')}</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        {t('gallery_title')}
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {GALLERY_IMAGES.map((image, index) => (
                        <div key={image.id} className={`group relative overflow-hidden rounded-lg ${index === 0 || index === 5 ? 'col-span-2 row-span-2' : ''}`}>
                            <img src={image.src} alt={t(image.altKey)} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;