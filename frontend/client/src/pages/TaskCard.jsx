// frontend/client/src/components/TaskCard.jsx
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import axios from 'axios';

// --- Animation ---
const goldenGlow = keyframes` 0% { box-shadow: 0 0 5px 0px var(--glow-color); } 50% { box-shadow: 0 0 15px 5px var(--glow-color); } 100% { box-shadow: 0 0 5px 0px var(--glow-color); } `;
const checkMarkAnimation = keyframes` 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } `;

// --- Styled Components ---
const CardWrapper = styled.div`
    flex-shrink: 0; width: 220px; /* Slightly wider */
    background-color: var(--bg-secondary); border-radius: var(--border-radius);
    padding: var(--spacing-large); text-align: center; box-shadow: var(--card-shadow);
    border: 2px solid var(--border-color); position: relative; transition: all 0.3s ease;
    min-height: 220px; display: flex; flex-direction: column; justify-content: space-between;
    cursor: ${props => (props.$isLocked ? 'not-allowed' : 'pointer')};

    body.dark & { background-color: var(--bg-secondary); }

    &:hover { transform: ${props => (props.$isLocked ? 'none' : 'translateY(-5px)')}; }

    /* Type-specific border colors */
    ${props => props.$cardType === 'video' && css` border-color: var(--neon-blue); `}
    ${props => props.$cardType === 'task' && css` border-color: var(--neon-purple); `}
    ${props => props.$cardType === 'golden' && css`
        border-color: var(--neon-gold);
        --glow-color: color-mix(in srgb, var(--neon-gold) 60%, transparent);
        animation: ${goldenGlow} 2.5s infinite ease-in-out;
    `}

    /* Locked state */
    ${props => props.$isLocked && css` opacity: 0.5; filter: grayscale(80%); border-style: dashed; &:hover { transform: none; }`}
    /* Completed state */
    ${props => props.$isCompleted && css` border-color: var(--success); background-color: color-mix(in srgb, var(--success) 10%, var(--bg-secondary)); `}
`;

const Icon = styled.div` font-size: 2.5rem; margin-bottom: var(--spacing-small); line-height: 1; color: ${props => props.$isCompleted ? 'var(--success)' : props.$cardType === 'video' ? 'var(--neon-blue)' : props.$cardType === 'task' ? 'var(--neon-purple)' : props.$cardType === 'golden' ? 'var(--neon-gold)' : 'var(--text-secondary)'}; `;
const Title = styled.h4` font-size: 1.15rem; font-weight: ${({ theme }) => theme.fontWeights.bold}; margin-bottom: var(--spacing-small); color: var(--text-primary); flex-grow: 1; line-height: 1.3; `;
const XPReward = styled.p` font-size: 0.9rem; font-weight: ${({ theme }) => theme.fontWeights.bold}; color: var(--neon-gold); margin-bottom: var(--spacing-medium); `;
const ButtonWrapper = styled.div` margin-top: auto; `;
const CompleteButton = styled.button`
    width: 100%; padding: var(--spacing-small); font-size: 0.9rem; border-radius: 6px; color: ${({ theme }) => theme.colors.white}; margin-top: auto; font-weight: ${({ theme }) => theme.fontWeights.bold};
    background: ${props => props.$cardType === 'video' ? 'var(--neon-blue)' : props.$cardType === 'task' ? 'var(--neon-purple)' : props.$cardType === 'golden' ? 'var(--neon-gold)' : 'var(--text-accent)'};
    ${props => (props.$cardType === 'video' || props.$cardType === 'golden') && css` color: #111; `}
    &:hover { filter: brightness(1.1); transform: scale(1.03); }
    &:disabled { background: var(--border-color); color: var(--text-secondary); cursor: not-allowed; transform: none; filter: none; }
`;
const LockIcon = styled.div` position: absolute; top: 10px; right: 10px; font-size: 1.5rem; opacity: 0.8; color: var(--text-secondary); `;
const CompletedIcon = styled.div` font-size: 1.5rem; color: var(--success); position: absolute; top: 10px; right: 10px; animation: ${checkMarkAnimation} 0.5s ease-out; `;

// Component
const TaskCard = ({ task, isLocked, isCompleted, userToken, onTaskComplete }) => {
  const [isCompleting, setIsCompleting] = useState(false); // Loading state for button
  const cardType = task.taskType || 'task';
  let iconChar = '📄'; // Default
  if (cardType === 'video') iconChar = '▶️';
  if (cardType === 'golden') iconChar = '⭐';

  const handleComplete = async () => {
    if (isCompleting || isLocked || isCompleted) return; // Prevent multiple clicks or clicking locked/done tasks
    setIsCompleting(true); // Show loading state on button
    try {
      await axios.post('/auth/complete-task',
          { taskId: task._id, xpReward: task.xpReward, taskType: cardType }, // Send type for stats
          { headers: { 'x-auth-token': userToken } }
      );
      if (onTaskComplete) onTaskComplete(); // Trigger refresh in parent
      // No need for alert here, parent state update will show visual change
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to complete task';
      alert(`Error: ${message}`); // Show error to user
      console.error("Error completing task:", error);
    } finally {
      setIsCompleting(false); // Reset button state
    }
  };

  return ( <CardWrapper $cardType={cardType} $isLocked={isLocked} $isCompleted={isCompleted} onClick={(!isLocked && !isCompleted) ? handleComplete : undefined} > <div> <Icon $cardType={cardType} $isCompleted={isCompleted}>{isCompleted ? '✅' : iconChar}</Icon> <Title>{task.title || 'Untitled Task'}</Title> <XPReward>+{task.xpReward || 0} XP</XPReward> </div> <ButtonWrapper> {!isLocked && !isCompleted && ( <CompleteButton $cardType={cardType} onClick={handleComplete} disabled={isCompleting} > {isCompleting ? 'Completing...' : (cardType === 'video' ? 'Watch & Earn' : 'Complete Task')} </CompleteButton> )} </ButtonWrapper> {isLocked && <LockIcon title="Complete previous tasks">🔒</LockIcon>} {isCompleted && !isLocked && <CompletedIcon title="Task Completed">✅</CompletedIcon>} </CardWrapper> );
};
export default TaskCard;