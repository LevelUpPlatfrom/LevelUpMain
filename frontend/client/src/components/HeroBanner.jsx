// frontend/client/src/components/HeroBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // CORRECT react-router-dom import
// REMOVED: styled-components import

const HeroBanner = () => {
  return (
    <section className="hero-banner">
      <div className="hero-container">
        <h1 className="hero-title">Level Up Your Skills, Level Up Your Life</h1>
        <p className="hero-subtitle">The ultimate gamified self-improvement platform.</p>
        <Link to="/auth" className="hero-button">Start Your Journey Now</Link>
      </div>
    </section>
  );
};
export default HeroBanner;