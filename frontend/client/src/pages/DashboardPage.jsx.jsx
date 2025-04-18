// frontend/client/src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import DashboardProfileCard from '../components/DashboardProfileCard';
import DashboardYourCourses from '../components/DashboardYourCourses';
import DashboardLeaderboardPreview from '../components/DashboardLeaderboardPreview';

const DashboardHeader = styled.header` margin-bottom: var(--spacing-large); padding-bottom: var(--spacing-medium); border-bottom: 1px solid var(--border-color); h1 { margin-bottom: 0; font-size: 2rem; } `;
const DashboardGrid = styled.div` display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--spacing-large); `;
const FullWidthCard = styled.div` /* Example for a card spanning full width if needed */ grid-column: 1 / -1; background-color: var(--bg-secondary); padding: var(--spacing-large); border-radius: var(--border-radius); box-shadow: var(--card-shadow); border: 1px solid var(--border-color); `;

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize fetchData to prevent re-fetching on every render
  const fetchData = useCallback(async () => {
    setIsLoading(true); setError(null); const token = localStorage.getItem('token');
    if (!token) { setError("Auth error."); setIsLoading(false); return; }
    try {
      const [userRes, leaderboardRes] = await Promise.all([ axios.get('/auth/me', { headers: { 'x-auth-token': token } }), axios.get('/api/leaderboard/preview', { headers: { 'x-auth-token': token } }) ]);
      setUserData(userRes.data); setLeaderboardData(leaderboardRes.data);
    } catch (err) { const message = err.response?.data?.message || err.message || "Failed to load dashboard."; setError(message); if (err.response?.status === 401) setError("Session expired."); }
    finally { setIsLoading(false); }
  }, []); // Empty dependency array means this useCallback instance is created once

  useEffect(() => { fetchData(); }, [fetchData]); // Run fetchData on mount

  if (isLoading) return <div className="loading-message">Loading Dashboard...</div>;

  return ( <div className="page-container dashboard-page"> <DashboardHeader> <h1>Dashboard</h1> </DashboardHeader> {error && <div className="error-message" style={{marginBottom: '1rem'}}>{error}</div>} <DashboardGrid> {/* Pass fetched data to components */} <DashboardProfileCard user={userData} /> <DashboardYourCourses courses={userData?.coursesOwned || []} /> <DashboardLeaderboardPreview topUsers={leaderboardData} /> {/* Add more cards/widgets here */} {/* <FullWidthCard><h3>Announcements</h3><p>Welcome to the new LevelUp!</p></FullWidthCard> */} </DashboardGrid> </div> );
};
export default DashboardPage;