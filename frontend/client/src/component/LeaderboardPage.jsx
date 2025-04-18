// frontend/client/src/pages/LeaderboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem('token');

  useEffect(() => { const fetchBoard = async () => { setIsLoading(true); setError(null); if (!userToken) { setError("Please log in."); setIsLoading(false); return; } try { const res = await axios.get('/api/leaderboard/full', { headers: { 'x-auth-token': userToken } }); setLeaderboard(res.data || []); } catch (err) { setError(err.response?.data?.message || "Load failed."); if (err.response?.status === 401) setError("Session expired."); } finally { setIsLoading(false); } }; fetchBoard(); }, [userToken]);

  return ( <div className="page-container leaderboard-page"> <div className="leaderboard-header"> <h1>Leaderboard</h1> <p>See who's topping the charts!</p> <Link to="/dashboard" className="back-button">← Back to Dashboard</Link> </div> {isLoading && <div className="loading-message">Loading Ranks...</div>} {error && <div className="error-message">{error}</div>} {!isLoading && !error && ( <div className="leaderboard-table-wrapper"> <table className="leaderboard-table"> <thead> <tr> <th>Rank</th> <th>User</th> <th>Level</th> <th>XP</th> </tr> </thead> <tbody> {leaderboard.length > 0 ? ( leaderboard.map((user, index) => ( <tr key={user._id}> <td className="leaderboard-rank">{index + 1}</td> <td className="leaderboard-user"> <img className="leaderboard-avatar" src={user.avatar || 'https://via.placeholder.com/35?text=U'} alt="avatar" /> <span title={user.email}>{user.email}</span> </td> <td className="leaderboard-level">{user.level || 1}</td> <td className="leaderboard-xp">{user.xp || 0}</td> </tr> )) ) : ( <tr> <td colSpan="4" style={{ textAlign: 'center' }}>Leaderboard is quiet... for now.</td> </tr> )} </tbody> </table> </div> )} </div> );
};
export default LeaderboardPage;