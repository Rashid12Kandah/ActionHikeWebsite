import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Trip, Testimonial } from '../types';

const API_URL_TRAILS = `${import.meta.env.VITE_API_URL}/api/trails`;
const API_URL_REVIEWS = `${import.meta.env.VITE_API_URL}/api/reviews`;

const Admin: React.FC = () => {
    const { t, language } = useLanguage();
    const { token, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'trails' | 'reviews'>('trails');

    // Trails State
    const [trails, setTrails] = useState<Trip[]>([]);
    const [editingTrail, setEditingTrail] = useState<Trip | null>(null);
    const [trailForm, setTrailForm] = useState<Partial<Trip>>({
        difficulty: 'Moderate',
        price: '',
        link: '',
        title: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState<File | null>(null);

    // Reviews State
    const [reviews, setReviews] = useState<Testimonial[]>([]);
    const [editingReview, setEditingReview] = useState<Testimonial | null>(null);
    const [reviewForm, setReviewForm] = useState<Partial<Testimonial>>({
        name: '',
        location: '',
        message: '',
        rating: 5
    });

    useEffect(() => {
        console.log('Admin Component Mounted. Version: 1.0.1');
        console.log('API_URL_TRAILS:', API_URL_TRAILS);
        fetchTrails();
        fetchReviews();
    }, []);

    const fetchTrails = () => {
        fetch(API_URL_TRAILS)
            .then(res => res.json())
            .then(data => setTrails(data))
            .catch(err => console.error('Error fetching trails:', err));
    };

    const fetchReviews = () => {
        fetch(API_URL_REVIEWS)
            .then(res => res.json())
            .then(data => setReviews(data))
            .catch(err => console.error('Error fetching reviews:', err));
    };

    // --- Trail Handlers ---

    const handleTrailInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTrailForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSaveTrail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trailForm.title || !trailForm.description) {
            alert('Please fill required fields.');
            return;
        }

        const formData = new FormData();
        formData.append('title', trailForm.title);
        formData.append('description', trailForm.description);
        formData.append('difficulty', trailForm.difficulty || 'Moderate');
        formData.append('price', trailForm.price || '');
        formData.append('link', trailForm.link || '');
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const url = editingTrail ? `${API_URL_TRAILS}/${editingTrail._id}` : API_URL_TRAILS;
        const method = editingTrail ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (res.ok) {
                alert(editingTrail ? 'Trail updated!' : 'Trail added!');
                setTrailForm({ difficulty: 'Moderate', price: '', link: '', title: '', description: '' });
                setImageFile(null);
                setEditingTrail(null);
                fetchTrails();
            } else {
                const err = await res.json();
                alert(`Failed: ${err.message}`);
            }
        } catch (err) {
            console.error(err);
            alert('Error saving trail');
        }
    };

    const handleEditTrail = (trail: Trip) => {
        setEditingTrail(trail);
        setTrailForm({
            title: trail.title,
            description: trail.description,
            difficulty: trail.difficulty,
            price: trail.price
        });
        window.scrollTo(0, 0);
    };

    const handleRemoveTrail = async (id: string) => {
        if (window.confirm('Are you sure you want to remove this trail?')) {
            try {
                const res = await fetch(`${API_URL_TRAILS}/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    fetchTrails();
                } else {
                    alert('Failed to delete trail');
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCancelEdit = () => {
        setEditingTrail(null);
        setTrailForm({ difficulty: 'Moderate', price: '', title: '', description: '' });
        setImageFile(null);
    };

    // --- Review Handlers ---

    const handleReviewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setReviewForm(prev => ({ ...prev, [name]: value }));
    };

    const handleEditReview = (review: Testimonial) => {
        setEditingReview(review);
        setReviewForm({
            name: review.name,
            location: review.location,
            message: review.message,
            rating: review.rating
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelReviewEdit = () => {
        setEditingReview(null);
        setReviewForm({ name: '', location: '', message: '', rating: 5 });
    };

    const handleDeleteReview = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;

        try {
            const res = await fetch(`${API_URL_REVIEWS}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchReviews();
            } else {
                alert('Failed to delete review');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting review');
        }
    };

    const handleSaveReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!reviewForm.name || !reviewForm.message) return;

        const url = editingReview ? `${API_URL_REVIEWS}/${editingReview._id}` : API_URL_REVIEWS;
        const method = editingReview ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reviewForm)
            });
            if (res.ok) {
                alert(editingReview ? 'Review updated!' : 'Review added!');
                setReviewForm({ name: '', location: '', message: '', rating: 5 });
                setEditingReview(null);
                fetchReviews();
            } else {
                alert('Failed to save review');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving review');
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark text-white p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-brand-accent uppercase tracking-widest">
                        {language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard (v1.0.1)'}
                    </h1>
                    <button onClick={logout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                        {language === 'ar' ? 'تسجيل خروج' : 'Logout'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-gray-700">
                    <button
                        className={`pb-2 px-4 font-medium ${activeTab === 'trails' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('trails')}
                    >
                        {language === 'ar' ? 'إدارة المسارات' : 'Manage Trails'}
                    </button>
                    <button
                        className={`pb-2 px-4 font-medium ${activeTab === 'reviews' ? 'text-brand-accent border-b-2 border-brand-accent' : 'text-gray-400 hover:text-white'}`}
                        onClick={() => setActiveTab('reviews')}
                    >
                        {language === 'ar' ? 'إدارة التقييمات' : 'Manage Reviews'}
                    </button>
                </div>

                {activeTab === 'trails' && (
                    <div>
                        {/* Add/Edit Trail Form */}
                        <div className="bg-brand-charcoal p-6 rounded-lg shadow-lg mb-12 border border-brand-accent/20">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-brand-accent">
                                    {editingTrail 
                                        ? (language === 'ar' ? 'تعديل المسار' : 'Edit Trail') 
                                        : (language === 'ar' ? 'إضافة مسار جديد' : 'Add New Trail')}
                                </h2>
                                {editingTrail && (
                                    <button onClick={handleCancelEdit} className="text-sm text-gray-400 hover:text-white">
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            
                            <form onSubmit={handleSaveTrail} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'اسم المسار' : 'Trail Name'}</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={trailForm.title}
                                            onChange={handleTrailInputChange}
                                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'السعر (اختياري)' : 'Price (Optional)'}</label>
                                        <input
                                            type="text"
                                            name="price"
                                            value={trailForm.price}
                                            onChange={handleTrailInputChange}
                                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'رابط (اختياري)' : 'Link (Optional)'}</label>
                                        <input
                                            type="text"
                                            name="link"
                                            value={trailForm.link || ''}
                                            onChange={handleTrailInputChange}
                                            placeholder="https://..."
                                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'الوصف' : 'Description'}</label>
                                    <textarea
                                        name="description"
                                        value={trailForm.description}
                                        onChange={handleTrailInputChange}
                                        rows={3}
                                        className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'الصعوبة' : 'Difficulty'}</label>
                                        <select
                                            name="difficulty"
                                            value={trailForm.difficulty}
                                            onChange={handleTrailInputChange}
                                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                        >
                                            <option value="Easy">Easy / سهل</option>
                                            <option value="Moderate">Moderate / متوسط</option>
                                            <option value="Challenging">Challenging / صعب</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'صورة المسار' : 'Trail Image'}</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none text-sm"
                                            required={!editingTrail} // Required only for new trails
                                        />
                                        {editingTrail && <p className="text-xs text-gray-500 mt-1">Leave empty to keep current image</p>}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-accent text-brand-dark font-bold py-3 rounded hover:bg-white transition-colors duration-300 uppercase tracking-wider"
                                >
                                    {editingTrail 
                                        ? (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes') 
                                        : (language === 'ar' ? 'إضافة المسار' : 'Add Trail')}
                                </button>
                            </form>
                        </div>

                        {/* List of Trails */}
                        <div className="bg-brand-charcoal p-6 rounded-lg shadow-lg border border-brand-accent/20">
                            <h2 className="text-xl font-semibold mb-6 text-brand-accent">
                                {language === 'ar' ? 'المسارات الحالية' : 'Current Trails'}
                            </h2>
                            <div className="space-y-4">
                                {trails.map((trail) => (
                                    <div key={trail._id || trail.key} className="flex items-center justify-between bg-brand-dark p-4 rounded border border-gray-700">
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                            <img 
                                                src={trail.imageUrl.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL}${trail.imageUrl}` : trail.imageUrl} 
                                                alt={trail.title} 
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="font-bold text-white">{trail.title}</h3>
                                                <span className={`text-xs px-2 py-1 rounded-full font-bold text-brand-dark ${
                                                    trail.difficulty === 'Easy' ? 'bg-green-400' : 
                                                    trail.difficulty === 'Moderate' ? 'bg-yellow-400' : 'bg-red-500'
                                                }`}>
                                                    {trail.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditTrail(trail)}
                                                className="text-blue-400 hover:text-blue-300 font-medium px-3 py-1 border border-blue-400 rounded hover:bg-blue-400/10 transition-colors"
                                            >
                                                {language === 'ar' ? 'تعديل' : 'Edit'}
                                            </button>
                                            <button
                                                onClick={() => handleRemoveTrail(trail._id || trail.key)}
                                                className="text-red-500 hover:text-red-400 font-medium px-3 py-1 border border-red-500 rounded hover:bg-red-500/10 transition-colors"
                                            >
                                                {language === 'ar' ? 'حذف' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div>
                        {/* Add/Edit Review Form */}
                        <div className="bg-brand-charcoal p-6 rounded-lg shadow-lg mb-12 border border-brand-accent/20">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-brand-accent">
                                    {editingReview 
                                        ? (language === 'ar' ? 'تعديل التقييم' : 'Edit Review') 
                                        : (language === 'ar' ? 'إضافة تقييم جديد' : 'Add New Review')}
                                </h2>
                                {editingReview && (
                                    <button onClick={handleCancelReviewEdit} className="text-sm text-gray-400 hover:text-white">
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            <form onSubmit={handleSaveReview} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'الاسم' : 'Name'}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={reviewForm.name}
                                            onChange={handleReviewInputChange}
                                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'الموقع' : 'Location'}</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={reviewForm.location}
                                            onChange={handleReviewInputChange}
                                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'الرسالة' : 'Message'}</label>
                                    <textarea
                                        name="message"
                                        value={reviewForm.message}
                                        onChange={handleReviewInputChange}
                                        rows={2}
                                        className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1 text-gray-300">{language === 'ar' ? 'التقييم' : 'Rating'}</label>
                                    <select
                                        name="rating"
                                        value={reviewForm.rating}
                                        onChange={handleReviewInputChange}
                                        className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none"
                                    >
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-brand-accent text-brand-dark font-bold py-3 rounded hover:bg-white transition-colors duration-300 uppercase tracking-wider"
                                >
                                    {editingReview 
                                        ? (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes') 
                                        : (language === 'ar' ? 'إضافة التقييم' : 'Add Review')}
                                </button>
                            </form>
                        </div>

                        {/* List of Reviews */}
                        <div className="bg-brand-charcoal p-6 rounded-lg shadow-lg border border-brand-accent/20">
                            <h2 className="text-xl font-semibold mb-6 text-brand-accent">
                                {language === 'ar' ? 'التقييمات الحالية' : 'Current Reviews'}
                            </h2>
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review._id || review.key} className="bg-brand-dark p-4 rounded border border-gray-700 flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                                                <h3 className="font-bold text-white">{review.name}</h3>
                                                <div className="text-yellow-400 text-sm">
                                                    {'★'.repeat(review.rating || 5)}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400">{review.location}</p>
                                            <p className="text-gray-300 mt-2 italic">"{review.message}"</p>
                                        </div>
                                        <div className="flex space-x-2 flex-shrink-0 ms-4">
                                            <button
                                                onClick={() => handleEditReview(review)}
                                                className="text-blue-400 hover:text-blue-300 font-medium px-3 py-1 border border-blue-400 rounded hover:bg-blue-400/10 transition-colors text-sm"
                                            >
                                                {language === 'ar' ? 'تعديل' : 'Edit'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteReview(review._id!)}
                                                className="text-red-500 hover:text-red-400 font-medium px-3 py-1 border border-red-500 rounded hover:bg-red-500/10 transition-colors text-sm"
                                            >
                                                {language === 'ar' ? 'حذف' : 'Remove'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
