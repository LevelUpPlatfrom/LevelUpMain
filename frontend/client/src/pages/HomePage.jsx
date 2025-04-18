// frontend/client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeroBanner from '../components/HeroBanner';
import CoursePreviewCard from '../components/CoursePreviewCard';
// NavBar and Footer are rendered in App.js

// Mock data for Solana courses
const solanaCourses = [
    { _id: 'solana1', title: 'Solana Beginner Bootcamp', description: 'Your first steps into the Solana ecosystem. Learn the basics of wallets, transactions, and SPL tokens.', imageUrl: 'https://via.placeholder.com/400x200?text=Solana+Beginner', transformationPromise: 'Become comfortable navigating Solana.' },
    { _id: 'solana2', title: 'Solana Development Deep Dive', description: 'Build and deploy smart contracts on Solana using Rust and Anchor. Understand PDAs and CPI.', imageUrl: 'https://via.placeholder.com/400x200?text=Solana+Dev', transformationPromise: 'Become a capable Solana developer.' },
    { _id: 'solana3', title: 'Advanced Solana Concepts', description: 'Explore Solana internals, validator economics, transaction processing, and cutting-edge DeFi protocols.', imageUrl: 'https://via.placeholder.com/400x200?text=Solana+Expert', transformationPromise: 'Become a Solana ecosystem expert.' },
];

const HomePage = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => { setIsLoading(true); setError(null); try { const res = await axios.get('/api/courses/featured'); setFeaturedCourses(res.data || []); } catch (err) { setError('Failed to load courses.'); console.error(err); } finally { setIsLoading(false); } };
    fetchFeatured();
  }, []);

  return (
    <>
      <main>
        <HeroBanner />
        <section id="featured-courses" className="page-container featured-courses-section">
          <h2 className="section-title">Featured Journeys</h2>
          {isLoading && <p className="loading-message">Loading Courses...</p>}
          {error && <p className="error-message">{error}</p>}
          {!isLoading && !error && (
            <div className="course-preview-grid">
              {featuredCourses.length > 0 ? featuredCourses.map(c => <CoursePreviewCard key={c._id} course={c} />) : <p>No featured courses available yet.</p>}
            </div>
          )}
        </section>

        {/* Solana Courses Section */}
         <section className="page-container solana-courses-section">
           <h2 className="section-title">Solana Mastery (Coming Soon!)</h2>
            <div className="course-preview-grid">
               {solanaCourses.map(c => <CoursePreviewCard key={c._id} course={c} isComingSoon={true} />)}
            </div>
         </section>

        <section className="how-it-works-section">
          <div className="page-container">
            <h2 className="section-title">How LevelUp Works</h2>
            <div className="step-container">
              <div className="step-card"> <h3>1. Sign Up</h3> <p>Create your account quickly.</p> </div>
              <div className="step-card"> <h3>2. Choose Path</h3> <p>Select a course & begin.</p> </div>
              <div className="step-card"> <h3>3. Level Up!</h3> <p>Complete tasks & earn XP.</p> </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer is rendered by App.js */}
    </>
  );
};
export default HomePage;