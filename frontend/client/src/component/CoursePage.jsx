// frontend/client/src/pages/CoursePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CourseJourneyMap from '../components/CourseJourneyMap';

const CoursePage = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); // Store completed IDs
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem('token');

  const fetchData = useCallback(async () => { setIsLoading(true); setError(null); if (!userToken || !courseId) { setError("Auth or Course ID error."); setIsLoading(false); return; } try { const [courseRes, userRes] = await Promise.all([ axios.get(`/api/courses/${courseId}`, { headers: { 'x-auth-token': userToken } }), axios.get('/auth/me', { headers: { 'x-auth-token': userToken } }) ]); setCourseData(courseRes.data.course); setTasks(courseRes.data.tasks || []); setCompletedTasks(userRes.data.completedTasks || []); } catch (err) { let msg = "Failed to load course."; if(err.response?.status === 404) msg = 'Course not found or no access.'; else if (err.response?.status === 401) msg = 'Auth failed.'; else msg = err.response?.data?.message || msg; setError(msg); console.error(err); } finally { setIsLoading(false); } }, [courseId, userToken]);
  useEffect(() => { fetchData(); }, [fetchData]);

  // Trigger data refresh when a task is completed
  const handleTaskCompletion = useCallback(() => { fetchData(); }, [fetchData]);

  if (isLoading) return <div className="loading-message">Loading Journey...</div>;
  if (error) return ( <div className="page-container"> <div className="error-message">Error: {error}</div> <Link to="/dashboard" className="back-button">← Dashboard</Link> </div> );
  if (!courseData) return <div className="error-message">Course data missing.</div>;

  return ( <div className="page-container course-page"> <header className="course-page-header"> <h1>{courseData.title}</h1> <p>{courseData.description}</p> {courseData.transformationPromise && <p><i>"{courseData.transformationPromise}"</i></p>} <Link to="/dashboard" className="back-button">← Back to Dashboard</Link> </header> <section className="course-journey-section"> <h2>Your Journey</h2> <CourseJourneyMap tasks={tasks} completedTaskIds={completedTasks} onTaskComplete={handleTaskCompletion} /> </section> </div> );
};
export default CoursePage;