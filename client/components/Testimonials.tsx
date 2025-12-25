import React, { useEffect, useState } from 'react';
import { Testimonial } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const API_URL = `${API_BASE_URL}/api/reviews`;

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    const { t } = useLanguage();
    // Use message from DB if available, otherwise fallback to translation key (for legacy data if any)
    const message = testimonial.message || t(`${testimonial.key}_quote`);
    
    return (
        <div className="bg-brand-charcoal p-8 rounded-lg shadow-lg">
            <p className="text-gray-300 italic mb-4">"{message}"</p>
            <div className="text-end">
                <p className="font-bold text-brand-accent">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                {testimonial.rating && (
                    <div className="flex justify-end mt-1 text-yellow-400">
                        {'★'.repeat(testimonial.rating)}
                        {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                )}
            </div>
        </div>
    );
}

const Testimonials: React.FC = () => {
    const { t } = useLanguage();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => setTestimonials(data))
            .catch(err => console.error('Error fetching testimonials:', err));
    }, []);

    return (
        <section id="testimonials" className="py-20 sm:py-32 bg-brand-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-base text-brand-accent font-semibold tracking-wide uppercase">{t('testimonials_heading')}</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        {t('testimonials_title')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial._id || testimonial.key} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;