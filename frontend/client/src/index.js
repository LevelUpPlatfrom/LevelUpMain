// frontend/client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';      // <-- Make sure this line exists
import HomePage from './pages/HomePage'; // <-- Import ONLY HomePage

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Render ONLY HomePage, no Router, no AuthProvider */}
    <HomePage />
  </React.StrictMode>
);