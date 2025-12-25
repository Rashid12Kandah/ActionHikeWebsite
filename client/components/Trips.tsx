import React, { useEffect, useState } from 'react';
import { Trip } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/trails`;
const SERVER_URL = API_BASE_URL;

const DifficultyBadge: React.FC<{ difficulty: Trip['difficulty'] }> = ({ difficulty }) => {
    const { t } = useLanguage();
    const baseClasses = "absolute top-4 end-4 text-xs uppercase font-bold px-3 py-1 rounded-full text-brand-dark";
    let colorClass = '';
    switch (difficulty) {
        case 'Easy': colorClass = 'bg-green-400'; break;
        case 'Moderate': colorClass = 'bg-yellow-400'; break;
        case 'Challenging': colorClass = 'bg-red-500'; break;
    }
    return <span className={`${baseClasses} ${colorClass}`}>{difficulty}</span>;
};

const TripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
    const { t } = useLanguage();
    // Handle image URL: if it's a local upload, prepend server URL
    const imageUrl = trip.imageUrl.startsWith('/uploads') ? `${SERVER_URL}${trip.imageUrl}` : trip.imageUrl;

    return (
        <div className="bg-brand-charcoal rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
            <div className="relative">
                <img className="w-full h-56 object-cover" src={imageUrl} alt={trip.title} />
                <DifficultyBadge difficulty={trip.difficulty} />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-brand-accent mb-2">{trip.title}</h3>
                <p className="text-gray-400 flex-grow">{trip.description}</p>
                {trip.price && <p className="text-brand-accent font-bold mt-4">{trip.price}</p>}
                {trip.link && (
                    <a 
                        href={trip.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-brand-accent hover:underline mt-2 block"
                    >
                        {t('view_details')}
                    </a>
                )}
            </div>
        </div>
    );
};

const Trips: React.FC = () => {
    const { t } = useLanguage();
    const [trips, setTrips] = useState<Trip[]>([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setTrips(data))
            .catch(err => console.error('Error fetching trips:', err));
    }, []);

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
                    {trips.map((trip) => (
                        <TripCard key={trip._id || trip.key} trip={trip} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trips;