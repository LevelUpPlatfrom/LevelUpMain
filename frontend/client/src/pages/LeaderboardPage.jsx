// frontend/client/src/pages/LeaderboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api'; // Use configured api instance

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // No need for userToken state as api instance handles it

  useEffect(() => {
    const fetchBoard = async () => {
      setIsLoading(true); setError(null);
      try {
        // api.get automatically includes token via interceptor
        const res = await api.get('/api/leaderboard/full');
        setLeaderboard(res.data || []);
      } catch (err) {
        let msg = err.response?.data?.message || "Failed to load leaderboard.";
        if (err.response?.status === 401) msg = "Session expired. Please log in again.";
        setError(msg);
        console.error("Leaderboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBoard();
  }, []); // Run once on mount

  return (
    <div className="page-container leaderboard-page">
      <div className="leaderboard-header">
        <h1>Leaderboard</h1>
        <p>Top 100 Players</p>
        <Link to="/dashboard" className="back-button">← Back to Dashboard</Link>
      </div>
      {isLoading && <div className="loading-message">Loading Ranks...</div>}
      {error && <div className="error-message">{error}</div>}
      {!isLoading && !error && (
        <div className="leaderboard-table-wrapper">
          <table className="leaderboard-table">
            <thead> <tr> <th>Rank</th> <th>User</th> <th>Level</th> <th>XP</th> </tr> </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((user, index) => (
                  <tr key={user._id}>
                    <td className="leaderboard-rank">{index + 1}</td>
                    <td className="leaderboard-user">
                      <img className="leaderboard-avatar" src={user.avatar || 'https://via.placeholder.com/35?text=U'} alt="avatar" />
                      <span title={user.email}>{user.email}</span>
                    </td>
                    <td className="leaderboard-level">{user.level || 1}</td>
                    <td className="leaderboard-xp">{user.xp || 0}</td>
                  </tr>
                ))
              ) : ( <tr> <td colSpan="4" style={{ textAlign: 'center' }}>Leaderboard is empty.</td> </tr> )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default LeaderboardPage;