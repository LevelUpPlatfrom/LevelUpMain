// frontend/client/src/components/DashboardLeaderboardPreview.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Card = styled.div` background-color: var(--bg-secondary); padding: var(--spacing-large); border-radius: var(--border-radius); box-shadow: var(--card-shadow); border: 1px solid var(--border-color); `;
const CardTitle = styled.h3` margin-bottom: var(--spacing-medium); font-size: 1.2rem; border-bottom: 1px solid var(--border-color); padding-bottom: var(--spacing-medium); color: var(--text-primary); `;
const LeaderboardList = styled.ol` list-style: none; padding: 0; `;
const LeaderboardItem = styled.li` display: flex; align-items: center; justify-content: space-between; padding: var(--spacing-small) 0; border-bottom: 1px dashed var(--border-color); &:last-child { border-bottom: none; } `;
const Rank = styled.span` font-weight: ${({ theme }) => theme.fontWeights.bold}; min-width: 25px; text-align: right; margin-right: var(--spacing-medium); color: var(--text-secondary); `;
const UserInfo = styled.div` flex-grow: 1; display: flex; align-items: center; gap: var(--spacing-small); font-size: 0.9rem; color: var(--text-primary); overflow: hidden; `;
const Avatar = styled.img` width: 24px; height: 24px; border-radius: 50%; object-fit: cover; background-color: var(--border-color);`;
const UserName = styled.span` white-space: nowrap; overflow: hidden; text-overflow: ellipsis; `;
const UserXP = styled.span` font-weight: ${({ theme }) => theme.fontWeights.bold}; color: var(--neon-gold); font-size: 0.9rem; margin-left: var(--spacing-small); `;
const ViewAllLink = styled(Link)` display: block; margin-top: var(--spacing-medium); text-align: right; font-size: 0.9rem; font-weight: ${({ theme }) => theme.fontWeights.medium}; `;

// Component
const DashboardLeaderboardPreview = ({ topUsers }) => {
   if (!topUsers) return <Card><p>Loading leaderboard...</p></Card>;
  return ( <Card> <CardTitle>Leaderboard</CardTitle> {topUsers.length === 0 ? ( <p>Leaderboard is empty.</p> ) : ( <LeaderboardList> {topUsers.map((user, index) => ( <LeaderboardItem key={user._id || index}> <Rank>{index + 1}</Rank> <UserInfo> <Avatar src={user.avatar || 'https://via.placeholder.com/24?text=U'} alt="avatar" /> <UserName title={user.email}>{user.email || 'User'}</UserName> </UserInfo> <UserXP>{user.xp || 0} XP</UserXP> </LeaderboardItem> ))} </LeaderboardList> )} <ViewAllLink to="/leaderboard">View All</ViewAllLink> </Card> );
};
export default DashboardLeaderboardPreview;