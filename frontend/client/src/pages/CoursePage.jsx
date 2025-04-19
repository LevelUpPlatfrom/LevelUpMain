// frontend/client/src/pages/CoursePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api'; // Use the configured api instance (handles token)
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import CourseJourneyMap from '../components/CourseJourneyMap'; // Assumes this component uses className

const CoursePage = () => {
  const { courseId } = useParams();
  const { user, refreshUser, isLoading: isAuthLoading } = useAuth(); // Get user state and refresh func from hook
  const [courseData, setCourseData] = useState(null); // State for specific course details
  const [tasks, setTasks] = useState([]);             // State for course tasks
  const [isCourseLoading, setIsCourseLoading] = useState(true); // Loading state specific to course data
  const [error, setError] = useState(null);

  // Fetch only the course data (including tasks) now
  const fetchCourseData = useCallback(async () => {
    // Don't fetch if auth is still loading or courseId is missing
    if (isAuthLoading || !courseId) {
        if (!courseId) setError("Course ID missing.");
        return;
    }
    setIsCourseLoading(true); setError(null);
    try {
      // api instance automatically includes the token
      const response = await api.get(`/api/courses/${courseId}`);
      setCourseData(response.data.course);
      setTasks(response.data.tasks || []);
    } catch (err) {
      let msg = err.response?.data?.message || "Failed to load course data.";
      if(err.response?.status === 403) msg = 'Access denied. Do you own this course?'; // More specific errors
      else if (err.response?.status === 404) msg = 'Course not found.';
      else if (err.response?.status === 401) msg = 'Authentication failed. Please log in again.';
      setError(msg);
      console.error("Fetch Course Error:", err);
    } finally {
      setIsCourseLoading(false);
    }
  }, [courseId, isAuthLoading]); // Depend on courseId and auth loading state

  // Fetch data when courseId or auth status changes
  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  // Callback for when a task is completed inside TaskCard
  const handleTaskCompletion = useCallback(() => {
    console.log("Task completed event received, refreshing user data...");
    refreshUser(); // Use function from useAuth to re-fetch global user state (which includes completedTasks)
    // No need to fetch course data again unless task completion changes the course itself
  }, [refreshUser]);

  // Determine overall loading state
  const isLoading = isAuthLoading || isCourseLoading;

  // Display loading/error states
  if (isLoading) return <div className="loading-message">Loading Journey...</div>;
  if (error) return ( <div className="page-container"> <div className="error-message">Error: {error}</div> <Link to="/dashboard" className="back-button">← Back to Dashboard</Link> </div> );
  if (!courseData) return <div className="error-message">Course data could not be loaded.</div>;

  // Get completed tasks from the user object provided by useAuth
  const completedTaskIds = user?.completedTasks || [];

  return (
    <div className="page-container course-page">
      <header className="course-page-header">
        <h1>{courseData.title}</h1>
        <p>{courseData.description}</p>
        {courseData.transformationPromise && <p><i>"{courseData.transformationPromise}"</i></p>}
        <Link to="/dashboard" className="back-button">← Back to Dashboard</Link>
      </header>
      <section className="course-journey-section">
        <h2>Your Journey</h2>
        {/* Pass tasks from local state, completed IDs from global user state */}
        <CourseJourneyMap
            tasks={tasks}
            completedTaskIds={completedTaskIds}
            onTaskComplete={handleTaskCompletion}
        />
      </section>
    </div>
  );
};
export default CoursePage;