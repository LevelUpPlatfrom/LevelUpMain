// frontend/client/src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DashboardProfileCard from '../components/DashboardProfileCard';
import DashboardYourCourses from '../components/DashboardYourCourses';
import DashboardLeaderboardPreview from '../components/DashboardLeaderboardPreview';

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => { setIsLoading(true); setError(null); const token = localStorage.getItem('token'); if (!token) { setError("Auth error."); setIsLoading(false); return; } try { const [userRes, leaderboardRes] = await Promise.all([ axios.get('/auth/me', { headers: { 'x-auth-token': token } }), axios.get('/api/leaderboard/preview', { headers: { 'x-auth-token': token } }) ]); setUserData(userRes.data); setLeaderboardData(leaderboardRes.data); } catch (err) { const message = err.response?.data?.message || err.message || "Failed to load dashboard."; setError(message); if (err.response?.status === 401) setError("Session expired."); } finally { setIsLoading(false); } }, []);
  useEffect(() => { fetchData(); }, [fetchData]);

  if (isLoading) return <div className="loading-message">Loading Dashboard...</div>;

  return ( <div className="page-container dashboard-page"> <header className="dashboard-header"> <h1>Dashboard</h1> </header> {error && <div className="error-message" style={{marginBottom: '1rem'}}>{error}</div>} <div className="dashboard-grid"> <DashboardProfileCard user={userData} /> <DashboardYourCourses courses={userData?.coursesOwned || []} /> <DashboardLeaderboardPreview topUsers={leaderboardData} /> </div> </div> );
};
export default DashboardPage;