// frontend/client/src/components/DashboardProfileCard.jsx
import React from 'react';
// REMOVED: styled-components import

const DashboardProfileCard = ({ user }) => {
  if (!user) return <div className="dashboard-card"><p>Loading profile...</p></div>;
  const level = user.level || 1; const xp = user.xp || 0;
  const xpForLevel1 = 100; const xpForCurrentLevel = (level - 1) * xpForLevel1; const xpForNextLevel = level * xpForLevel1;
  const xpInCurrentLevel = xp - xpForCurrentLevel; const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercent = xpNeededForLevel > 0 ? Math.max(0, Math.min(100, (xpInCurrentLevel / xpNeededForLevel) * 100)) : 100;

  return (
    // Apply appropriate class names from index.css
    <div className="dashboard-card dashboard-profile-card">
      <div className="avatar"> {/* Match CSS selector */}
        <img src={user.avatar || 'https://via.placeholder.com/60?text=P'} alt="Avatar" />
      </div>
      <div className="info"> {/* Match CSS selector */}
        <h4>Welcome back!</h4>
        <p className="stats"> {/* Match CSS selector */}
          Level: <span className="level">{level}</span> | XP: <span className="xp-value">{xp}</span>
        </p>
        <div className="xp-progress-bar" title={`${xpInCurrentLevel} / ${xpNeededForLevel} XP to Level ${level + 1}`}>
          <div className="xp-progress-bar-inner" style={{ width: `${progressPercent}%` }} />
        </div>
        {user.solanaWallet && (
          <p className="wallet-info" title={`Wallet: ${user.solanaWallet}`}>Wallet: {user.solanaWallet.substring(0, 6)}...{user.solanaWallet.substring(user.solanaWallet.length - 4)}</p>
        )}
      </div>
    </div>
  );
};
export default DashboardProfileCard;