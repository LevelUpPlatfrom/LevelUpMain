// frontend/client/src/components/DashboardProfileCard.jsx
import React from 'react';
import styled from 'styled-components';

// Styled Components
const Card = styled.div`
    background-color: var(--bg-secondary);
    padding: var(--spacing-large);
    border-radius: var(--border-radius);
    box-shadow: var(--card-shadow);
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: var(--spacing-large);
`;
const Avatar = styled.div`
    img { width: 60px; height: 60px; border-radius: 50%; object-fit: cover; border: 3px solid var(--text-accent); background-color: var(--bg-accent); flex-shrink: 0; }
`;
const Info = styled.div` flex-grow: 1; h4 { margin-bottom: var(--spacing-xsmall); font-size: 1.2rem; font-weight: ${({ theme }) => theme.fontWeights.bold}; color: var(--text-primary); }`;
const Stats = styled.div` font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--spacing-small); `;
const Level = styled.span` font-weight: ${({ theme }) => theme.fontWeights.bold}; color: var(--neon-green); `;
const XPValue = styled.span` font-weight: ${({ theme }) => theme.fontWeights.bold}; color: var(--neon-gold); `;
const ProgressBarContainer = styled.div` width: 100%; height: 8px; background-color: var(--bg-accent); border-radius: 4px; overflow: hidden; margin-top: var(--spacing-medium); `;
const ProgressBarInner = styled.div` height: 100%; background-color: var(--neon-gold); border-radius: 4px; transition: width 0.5s ease; width: ${props => props.$progressPercent || 0}%; `;
const WalletInfo = styled.p` font-size: 0.8rem; color: var(--text-secondary); margin-top: var(--spacing-small); word-break: break-all; `;

// Component
const DashboardProfileCard = ({ user }) => {
  if (!user) return <Card><p>Loading profile...</p></Card>;
  const level = user.level || 1; const xp = user.xp || 0; const xpForLevel1 = 100; // Base XP for level 1
  const xpForCurrentLevel = (level - 1) * xpForLevel1; // XP needed TO REACH this level
  const xpForNextLevel = level * xpForLevel1; // XP needed TO REACH next level
  const xpInCurrentLevel = xp - xpForCurrentLevel;
  const xpNeededForLevel = xpForNextLevel - xpForCurrentLevel;
  const progressPercent = xpNeededForLevel > 0 ? Math.max(0, Math.min(100, (xpInCurrentLevel / xpNeededForLevel) * 100)) : 100;

  return ( <Card> <Avatar> <img src={user.avatar || 'https://via.placeholder.com/60?text=P'} alt="Avatar" /> </Avatar> <Info> <h4>Welcome back!</h4> {/* More generic welcome */} <Stats> Level: <Level>{level}</Level> | XP: <XPValue>{xp}</XPValue> </Stats> <ProgressBarContainer title={`${xpInCurrentLevel} / ${xpNeededForLevel} XP to Level ${level + 1}`}> <ProgressBarInner $progressPercent={progressPercent} /> </ProgressBarContainer> {user.solanaWallet && ( <WalletInfo>Wallet: {user.solanaWallet.substring(0, 6)}...{user.solanaWallet.substring(user.solanaWallet.length - 4)}</WalletInfo> )} </Info> </Card> );
};
export default DashboardProfileCard;