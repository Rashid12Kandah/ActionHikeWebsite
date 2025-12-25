import React, { useMemo } from 'react';
import { GALLERY_IMAGES } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Gallery: React.FC = () => {
    const { t } = useLanguage();

    // Select 8 random images based on the current date (rotates every 24 hours)
    const dailyImages = useMemo(() => {
        const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
        
        // Simple seeded random number generator
        const seed = today.split('-').reduce((acc, val) => acc + parseInt(val), 0);
        const seededRandom = (s: number) => {
            const x = Math.sin(s) * 10000;
            return x - Math.floor(x);
        };

        // Shuffle array using the seed
        const shuffled = [...GALLERY_IMAGES].sort((a, b) => {
            return seededRandom(seed + a.id) - 0.5;
        });

        return shuffled.slice(0, 8);
    }, []);

    // Helper to determine span classes based on index for a "Bento" feel
    const getSpanClasses = (index: number, type: 'image' | 'video') => {
        // Videos get priority for larger spots if possible
        if (type === 'video') return 'col-span-2 row-span-2';
        
        // Pattern for images
        const patternIndex = index % 10;
        if (patternIndex === 0) return 'col-span-2 row-span-2'; // Big square
        if (patternIndex === 3) return 'col-span-2 row-span-1'; // Wide
        if (patternIndex === 6) return 'col-span-1 row-span-2'; // Tall
        return 'col-span-1 row-span-1'; // Standard
    };

    return (
        <section id="gallery" className="py-20 sm:py-32 bg-brand-shadow overflow-hidden">
            <style>{`
                @keyframes ken-burns {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                .animate-ken-burns {
                    animation: ken-burns 20s ease-in-out infinite;
                }
            `}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-base text-brand-accent font-semibold tracking-wide uppercase">{t('gallery_heading')}</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        {t('gallery_title')}
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[200px] gap-4 grid-flow-dense">
                    {dailyImages.map((item, index) => (
                        <div 
                            key={item.id} 
                            className={`group relative overflow-hidden rounded-xl shadow-lg ${getSpanClasses(index, item.type)}`}
                        >
                            {item.type === 'video' ? (
                                <video 
                                    src={item.src} 
                                    className="w-full h-full object-cover" 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline
                                />
                            ) : (
                                <>
                                    <img 
                                        src={item.src} 
                                        alt={t(item.altKey)} 
                                        className="w-full h-full object-cover animate-ken-burns" 
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;