// frontend/client/src/components/CoursePreviewCard.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // CORRECT react-router-dom import
// REMOVED: styled-components import

const CoursePreviewCard = ({ course, isComingSoon = false }) => {
  if (!course) return <div className="course-card">Loading...</div>;
  return (
    <div className="course-card">
      {isComingSoon && (
          <div className="coming-soon-overlay">
              <span className="coming-soon-badge">Coming Soon</span>
          </div>
      )}
      <img className="course-card-image" src={course.imageUrl || "https://via.placeholder.com/400x200?text=LevelUp"} alt={course.title} />
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title || 'Untitled Course'}</h3>
        <p className="course-card-description">{course.description || 'No description.'}</p>
        {!isComingSoon ? (
             <Link to={`/course/${course._id}`} className="course-card-button"> View Journey </Link>
        ) : (
             <button className="course-card-button" disabled style={{cursor: 'default', background: 'grey', opacity: 0.7}}>Launching Soon</button>
        )}
      </div>
    </div>
  );
};
export default CoursePreviewCard;