// frontend/client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('token'); // Basic check for token

  if (!token) {
    // User not logged in, redirect to login page
    // Preserve the location they were trying to go to
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // User is logged in, render the requested component
  return children;
};
export default ProtectedRoute;