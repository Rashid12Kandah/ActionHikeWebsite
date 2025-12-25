import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { API_BASE_URL } from '../config';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { language } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const apiUrl = API_BASE_URL;
        if (!apiUrl) {
            setError('Configuration Error: API_BASE_URL is missing.');
            return;
        }

        try {
            console.log(`Attempting login to: ${apiUrl}/api/auth/login`);
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const contentType = res.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                // If response is not JSON (e.g. 404 HTML from Vercel), throw error
                const text = await res.text();
                console.error("Received non-JSON response:", text);
                throw new Error(`Server returned ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();

            if (res.ok) {
                login(data.token);
                navigate('/admin');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(`Error: ${err.message || 'An error occurred'}`);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-brand-charcoal p-8 rounded-lg shadow-lg border border-brand-accent/20">
                <h2 className="text-2xl font-bold text-brand-accent mb-6 text-center uppercase tracking-widest">
                    {language === 'ar' ? 'تسجيل الدخول' : 'Admin Login'}
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">
                            {language === 'ar' ? 'اسم المستخدم' : 'Username'}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-300">
                            {language === 'ar' ? 'كلمة المرور' : 'Password'}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-brand-dark border border-gray-600 rounded px-3 py-2 focus:border-brand-accent focus:outline-none text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-brand-accent text-brand-dark font-bold py-3 rounded hover:bg-white transition-colors duration-300 uppercase tracking-wider"
                    >
                        {language === 'ar' ? 'دخول' : 'Login'}
                    </button>
                </form>
                <button
                    onClick={() => navigate('/')}
                    className="w-full mt-4 bg-transparent border border-gray-600 text-gray-300 font-medium py-2 rounded hover:border-brand-accent hover:text-brand-accent transition-colors duration-300"
                >
                    {language === 'ar' ? '← العودة للرئيسية' : '← Back to Home'}
                </button>
            </div>
        </div>
    );
};

export default Login;
