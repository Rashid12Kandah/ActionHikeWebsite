import React from 'react';
import { TRIPS_DATA } from '../constants';
import { Trip } from '../types';
import { useLanguage } from '../context/LanguageContext';

const DifficultyBadge: React.FC<{ difficulty: Trip['difficulty'] }> = ({ difficulty }) => {
    const { t } = useLanguage();
    const baseClasses = "absolute top-4 end-4 text-xs uppercase font-bold px-3 py-1 rounded-full text-brand-dark";
    let colorClass = '';
    switch (difficulty) {
        case 'Easy': colorClass = 'bg-green-400'; break;
        case 'Moderate': colorClass = 'bg-yellow-400'; break;
        case 'Challenging': colorClass = 'bg-red-500'; break;
    }
    return <span className={`${baseClasses} ${colorClass}`}>{t(`difficulty_${difficulty}`)}</span>;
};

const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-brand-charcoal rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <div className="relative">
                <img className="w-full h-56 object-cover" src={trip.imageUrl} alt={t(`trip_${trip.key}_title`)} />
                <DifficultyBadge difficulty={trip.difficulty} />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-brand-accent mb-2">{t(`trip_${trip.key}_title`)}</h3>
                <p className="text-gray-400 flex-grow">{t(`trip_${trip.key}_desc`)}</p>
            </div>
        </div>
    );
};

const Trips: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="trips" className="py-20 sm:py-32 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-base text-brand-accent font-semibold tracking-wide uppercase">{t('trips_heading')}</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        {t('trips_title')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {TRIPS_DATA.map((trip) => (
                        <TripCard key={trip.key} trip={trip} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trips;