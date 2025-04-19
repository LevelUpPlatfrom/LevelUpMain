// frontend/client/src/pages/HomePage.jsx
import React from 'react';
// REMOVED: useState, useEffect, axios, other components for now

// Simplified component just to display something
const HomePage = () => {

  // We won't fetch courses for this simple test
  const isLoading = false;
  const error = null;
  const featuredCourses = [ // Fake data for layout test
      {_id: '1', title: 'Test Course 1', description: 'Description for test 1.', imageUrl: 'https://via.placeholder.com/400x200?text=Course+1'},
      {_id: '2', title: 'Test Course 2', description: 'Description for test 2.', imageUrl: 'https://via.placeholder.com/400x200?text=Course+2'},
      {_id: '3', title: 'Test Course 3', description: 'Description for test 3.', imageUrl: 'https://via.placeholder.com/400x200?text=Course+3'}
  ];

  return (
    // Use basic structure and class names from index.css
    <>
      {/* Minimal Nav structure (can replace with NavBar component later) */}
      <nav className="navbar" style={{ position: 'static' }}> {/* // Temp static position */}
        <span className="navbar-brand">LevelUp (Test)</span>
        <div className="navbar-links">
          <span>Login</span> {/* Placeholder */}
          <button className="signup-button">Sign Up</button> {/* Placeholder */}
        </div>
      </nav>

      <main>
        {/* Minimal Hero */}
        <section className="hero-banner">
          <div className="hero-container">
            <h1 className="hero-title">Testing LevelUp Display</h1>
            <p className="hero-subtitle">Does this basic page render?</p>
          </div>
        </section>

        {/* Featured Courses Section - Uses fake data */}
        <section id="featured-courses" className="page-container featured-courses-section">
          <h2 className="section-title">Featured Journeys</h2>
          {isLoading && <p className="loading-message">Loading...</p>}
          {error && <p className="error-message">{error}</p>}
          {!isLoading && !error && (
            <div className="course-preview-grid">
              {featuredCourses.length > 0 ? (
                featuredCourses.map(course => (
                  // Basic Card structure - Replace with CoursePreviewCard later
                  <div key={course._id} className="course-card">
                      <img className="course-card-image" src={course.imageUrl} alt={course.title} />
                      <div className="course-card-content">
                          <h3 className="course-card-title">{course.title}</h3>
                          <p className="course-card-description">{course.description}</p>
                          <button className="course-card-button" style={{cursor: 'default'}}>View</button>
                      </div>
                  </div>
                ))
              ) : ( <p>No courses.</p> )}
            </div>
          )}
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="footer">
          <p>© {new Date().getFullYear()} LevelUp Test Footer</p>
      </footer>
    </>
  );
};

export default HomePage;