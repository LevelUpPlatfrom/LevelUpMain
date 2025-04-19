// frontend/client/src/components/CourseJourneyMap.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
// REMOVED: styled-components import
import TaskCard from './TaskCard'; // CORRECT Import

const CourseJourneyMap = ({ tasks = [], completedTaskIds = [], onTaskComplete }) => {
  const mapRef = useRef(null);
  const activeCardRef = useRef(null);

  // --- Fix for useEffect dependency warning ---
  const safeCompletedTaskIds = useMemo(() => completedTaskIds || [], [completedTaskIds]);
  // --------------------------------------------

  const [activeTaskIndex, setActiveTaskIndex] = useState(-1);

  // Calculate the index of the first task that is NOT in the completed list
  useEffect(() => {
    const firstUncompletedIndex = tasks.findIndex(task => !safeCompletedTaskIds.includes(task._id));
    setActiveTaskIndex(firstUncompletedIndex === -1 ? tasks.length : firstUncompletedIndex);
  }, [tasks, safeCompletedTaskIds]); // Correct dependencies

  // Scroll the currently active task into view when it changes
  useEffect(() => {
    if (activeCardRef.current) {
      activeCardRef.current.scrollIntoView({
        behavior: 'smooth', inline: 'center', block: 'nearest'
      });
    }
  }, [activeTaskIndex]);

  if (!tasks || tasks.length === 0) {
    return <p className="loading-message">This journey awaits its first steps...</p>;
  }

  return (
    // Use CSS classes defined in index.css
    <div className="journey-map-container">
      <div className="journey-map" ref={mapRef}>
        {tasks.map((task, index) => {
          const isCompleted = safeCompletedTaskIds.includes(task._id);
          const isLocked = index > activeTaskIndex;
          const isNextUp = index === activeTaskIndex;
          const prevTaskCompleted = index === 0 || safeCompletedTaskIds.includes(tasks[index - 1]?._id);

          return (
            <React.Fragment key={task._id || index}>
              <div ref={isNextUp ? activeCardRef : null}>
                <TaskCard
                  task={task}
                  isLocked={isLocked}
                  isCompleted={isCompleted}
                  isNextUp={isNextUp}
                  onTaskComplete={onTaskComplete} // Token handled by TaskCard/api.js now
                />
              </div>
              {index < tasks.length - 1 && (
                <div className={`journey-connector ${prevTaskCompleted ? 'active' : ''}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CourseJourneyMap;