// frontend/client/src/components/DashboardYourCourses.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // CORRECT react-router-dom import
// REMOVED: styled-components import

const DashboardYourCourses = ({ courses }) => {
  if (!courses) return <div className="dashboard-card"><p>Loading courses...</p></div>;
  return (
    <div className="dashboard-card">
      <h3 className="dashboard-card-title">Your Journeys</h3>
      {courses.length === 0 ? (
        <p>No journeys started. <Link className="explore-link" to="/">Explore Courses</Link></p>
      ) : (
        <div className="your-courses-list">
          {courses.map(course => (
            <div key={course._id} className="your-course-item">
              <img className="image" src={course.imageUrl || 'https://via.placeholder.com/60?text=C'} alt={course.title} />
              <div className="info">
                <h5>{course.title}</h5>
                <p className="progress">Progress: 0%</p>
              </div>
              <Link to={`/course/${course._id}`} className="continue-button"> Continue </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DashboardYourCourses;