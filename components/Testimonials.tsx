import React from 'react';
import { TESTIMONIALS_DATA } from '../constants';
import { Testimonial } from '../types';
import { useLanguage } from '../context/LanguageContext';


const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-brand-charcoal p-8 rounded-lg shadow-lg">
            <p className="text-gray-300 italic mb-4">"{t(`${testimonial.key}_quote`)}"</p>
            <div className="text-end">
                <p className="font-bold text-brand-accent">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
            </div>
        </div>
    );
}

const Testimonials: React.FC = () => {
    const { t } = useLanguage();
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
                    {TESTIMONIALS_DATA.map((testimonial) => (
                        <TestimonialCard key={testimonial.key} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;