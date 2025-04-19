// frontend/client/src/hooks/useAuth.js
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import authService from '../services/authService';

// 1. Create Context
const AuthContext = createContext(null);

// 2. Create Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data object
  const [token, setToken] = useState(localStorage.getItem('token')); // Initialize from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // Initial check
  const [isLoading, setIsLoading] = useState(true); // Start loading on initial check

  // Function to load user data if token exists
  const loadUser = useCallback(async () => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      try {
        setIsLoading(true);
        const userData = await authService.getCurrentUser();
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to load user:", error);
        authService.logout(); // Clear invalid token
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false); // No token, not loading
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  // Load user on initial mount
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Login function
  const login = async (email, password) => {
    try {
      const data = await authService.login({ email, password });
      setToken(data.token);
      setIsLoggedIn(true);
      await loadUser(); // Load user data after successful login
      return true; // Indicate success
    } catch (error) {
      console.error("Login failed:", error);
      authService.logout(); // Clear any potential partial state
      setUser(null);
      setIsLoggedIn(false);
      throw error; // Re-throw error for component to handle (e.g., show message)
    }
  };

    // Register function
  const register = async (email, password, solanaWallet) => {
    try {
      const data = await authService.register({ email, password, solanaWallet });
      setToken(data.token);
      setIsLoggedIn(true);
      await loadUser(); // Load user data after successful registration
      return true; // Indicate success
    } catch (error) {
      console.error("Registration failed:", error);
      authService.logout();
      setUser(null);
      setIsLoggedIn(false);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    // Navigate to auth page usually handled by ProtectedRoute or component logic
  };

  // Function to update user state locally (e.g., after completing a task)
  const updateUserState = (updatedUser) => {
      setUser(updatedUser);
  };


  // Value provided to consuming components
  const value = {
    user,
    token,
    isLoggedIn,
    isLoading,
    login,
    register,
    logout,
    updateUserState, // <-- Expose function to update user state
    refreshUser: loadUser // <-- Expose function to re-fetch user
  };

  // Wrap children with the Context Provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Custom Hook to Consume Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};