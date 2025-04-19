// frontend/client/src/components/TaskCard.jsx
import React, { useState } from 'react';
// import api from '../utils/api'; // Option 1: Use api directly
import courseService from '../services/courseService'; // Option 2: Use service
import { useAuth } from '../hooks/useAuth'; // Import useAuth to update global state

const TaskCard = ({ task, isLocked, isCompleted, isNextUp, onTaskComplete }) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const { updateUserState } = useAuth(); // Get function to update global user state

  const cardType = task.taskType || 'task';
  let iconChar = '📄'; if (cardType === 'video') iconChar = '▶️'; if (cardType === 'golden') iconChar = '⭐';

  const handleComplete = async (e) => {
    if (e) e.stopPropagation(); // Prevent card click if button is clicked
    if (isCompleting || isLocked || isCompleted) return;
    setIsCompleting(true);
    try {
      // Use the courseService to complete the task
      const result = await courseService.completeTask(task._id, task.xpReward, taskType);
      updateUserState(result.user); // <-- Update global user state with the user data from backend response

      if (onTaskComplete) onTaskComplete(); // Still call parent callback if needed (e.g., for refetching course data)

    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed task.';
      alert(`Error: ${message}`); // Simple error feedback
      console.error("Task completion error:", error);
    } finally {
      setIsCompleting(false);
    }
  };

  const cardClickHandler = (!isLocked && !isCompleted) ? handleComplete : undefined;
  let cardClassName = `task-card ${cardType}`;
  if (isLocked) cardClassName += ' locked'; if (isCompleted) cardClassName += ' completed'; if (isNextUp) cardClassName += ' next-up';

  return (
    <div className={cardClassName} onClick={cardClickHandler} title={isLocked ? "Locked" : isCompleted ? "Done!" : `Complete: ${task.title}`} >
      <div>
        <div className={`task-card-icon`}>{isCompleted ? '✅' : iconChar}</div>
        <h4 className="task-card-title">{task.title || 'Task'}</h4>
        <p className="task-card-xp">+{task.xpReward || 0} XP</p>
      </div>
      <div className="task-card-button-wrapper">
        {!isLocked && !isCompleted && (
          <button className={`task-card-button ${cardType}`} onClick={handleComplete} disabled={isCompleting} >
            {isCompleting ? '...' : (cardType === 'video' ? 'Watch' : 'Done')}
          </button>
        )}
        {isCompleted && <p style={{ color: 'var(--success)', fontWeight: 'bold', fontSize: '0.9rem', margin: 0 }}>✓ Completed</p>}
      </div>
      {isLocked && <div className="task-card-lock-icon" title="Locked">🔒</div>}
    </div>
  );
};
export default TaskCard;