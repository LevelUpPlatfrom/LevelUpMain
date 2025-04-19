// frontend/client/src/components/DashboardLeaderboardPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // CORRECT react-router-dom import
// REMOVED: styled-components import

const DashboardLeaderboardPreview = ({ topUsers }) => {
   if (!topUsers) return <div className="dashboard-card"><p>Loading ranks...</p></div>;
  return (
    <div className="dashboard-card"> {/* Use class */}
      <h3 className="dashboard-card-title">Top Players</h3> {/* Use class */}
      {topUsers.length === 0 ? ( <p>Be the first!</p> ) : (
        <ol className="leaderboard-list"> {/* Use class */}
          {topUsers.map((user, index) => (
            <li key={user._id || index} className="leaderboard-item"> {/* Use class */}
              <span className="leaderboard-rank">{index + 1}</span> {/* Use class */}
              <div className="leaderboard-user-info"> {/* Use class */}
                <img className="leaderboard-avatar" src={user.avatar || 'https://via.placeholder.com/24?text=U'} alt="avatar" /> {/* Use class */}
                <span className="leaderboard-username" title={user.email}>{user.email || 'User'}</span> {/* Use class */}
              </div>
              <span className="leaderboard-xp">{user.xp || 0} XP</span> {/* Use class */}
            </li>
          ))}
        </ol>
      )}
      <Link className="leaderboard-view-all" to="/leaderboard">View All</Link> {/* Use class */}
    </div>
  );
};
export default DashboardLeaderboardPreview;