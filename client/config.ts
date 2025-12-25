// Centralized configuration for the application

// Hardcoded fallback for production to ensure it works even if env vars fail
const PROD_API_URL = 'https://actionhikewebsite.onrender.com';

// Determine the API URL
// We force the production URL when in production mode to avoid any localhost issues
export const API_BASE_URL = import.meta.env.PROD 
    ? PROD_API_URL 
    : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

console.log('Config loaded. Environment:', import.meta.env.MODE);
console.log('API_BASE_URL:', API_BASE_URL);
