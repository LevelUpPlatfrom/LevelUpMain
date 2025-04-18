// frontend/client/src/utils/api.js
import axios from 'axios';

// USE a .env variable in deployment, fallback to localhost for dev
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // CORRECT

const api = axios.create({
  baseURL: API_URL, // CORRECT
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically add JWT token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token; // CORRECT - Adds token if present
    }
    return config; // CORRECT - Returns config so request continues
  },
  (error) => {
    // Basic error logging
    console.error("Axios Request Interceptor Error:", error);
    return Promise.reject(error); // CORRECT - Rejects promise on error
  }
);

export default api; // CORRECT - Exports the configured instance