// frontend/client/src/services/authService.js
import api from '../utils/api';

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  // Store token/userId after successful registration
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
  }
  return response.data; // Contains token and userId
};

const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  // Store token/userId after successful login
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userId', response.data.userId);
  }
  return response.data; // Contains token and userId
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  // Potentially call a backend logout endpoint if needed
};

const getCurrentUser = async () => {
    // Token is added automatically by the interceptor in api.js
    const response = await api.get('/auth/me');
    return response.data; // Returns the user object (or throws error if token invalid)
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;