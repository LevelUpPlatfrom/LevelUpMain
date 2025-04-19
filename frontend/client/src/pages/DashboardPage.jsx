// frontend/client/src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/api'; // Use api instance for non-auth specific calls
import { useAuth } from '../hooks/useAuth'; // Import the useAuth hook
import DashboardProfileCard from '../components/DashboardProfileCard';
import DashboardYourCourses from '../components/DashboardYourCourses';
import DashboardLeaderboardPreview from '../components/DashboardLeaderboardPreview';

const DashboardPage = () => {
  // Get user data directly from Auth context
  const { user, isLoading: isAuthLoading } = useAuth();
  // State specifically for leaderboard data
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(true);
  const [error, setError] = useState(null); // Combined error state

  // Fetch leaderboard data separately (requires auth, but not part of user object)
  const fetchLeaderboard = useCallback(async () => {
    // Don't fetch if auth is still loading
    if (isAuthLoading) return;

    setIsLeaderboardLoading(true);
    setError(null); // Clear previous errors specifically for this fetch
    try {
      // api instance automatically adds the token
      const leaderboardRes = await api.get('/api/leaderboard/preview');
      setLeaderboardData(leaderboardRes.data);
    } catch (err) {
      const message = err.response?.data?.message || err.message || "Failed to load leaderboard preview.";
      setError(message); // Set error state
      console.error("Leaderboard fetch error:", err);
      if (err.response?.status === 401) setError("Session expired, please log in again."); // More specific error
    } finally {
      setIsLeaderboardLoading(false);
    }
  }, [isAuthLoading]); // Depend on auth loading state

  // Fetch leaderboard when auth check is complete
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // Overall loading state depends on both auth check and leaderboard fetch
  const isLoading = isAuthLoading || isLeaderboardLoading;

  if (isLoading) return <div className="loading-message">Loading Dashboard...</div>;

  // If auth failed (user is null after loading), ProtectedRoute should handle it,
  // but we can add a check here too.
  if (!user && !isAuthLoading) {
       return <div className="error-message">User data could not be loaded. Please try logging in again.</div>;
  }

  return (
    <div className="page-container dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
      </header>
      {/* Display error if leaderboard fetch failed */}
      {error && <div className="error-message" style={{marginBottom: '1rem'}}>{error}</div>}
      <div className="dashboard-grid">
        {/* Pass user data from context */}
        <DashboardProfileCard user={user} />
        {/* Courses are populated within the user object from context */}
        <DashboardYourCourses courses={user?.coursesOwned || []} />
        {/* Pass leaderboard data from local state */}
        <DashboardLeaderboardPreview topUsers={leaderboardData} />
      </div>
    </div>
  );
};
export default DashboardPage;