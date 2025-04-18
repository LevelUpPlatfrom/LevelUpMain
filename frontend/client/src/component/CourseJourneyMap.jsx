// frontend/client/src/components/CourseJourneyMap.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import TaskCard from './TaskCard';

// Styled Components (Keep as is - they seem correct)
const MapContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    padding-bottom: var(--spacing-medium);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    background-color: var(--bg-accent);
    margin-top: var(--spacing-medium);
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: var(--border-color) var(--bg-secondary); /* Firefox */

    &::-webkit-scrollbar { height: 10px; }
    &::-webkit-scrollbar-track { background: var(--bg-secondary); border-radius: 5px; }
    &::-webkit-scrollbar-thumb { background-color: var(--border-color); border-radius: 5px; border: 2px solid var(--bg-secondary); }
    &::-webkit-scrollbar-thumb:hover { background-color: var(--text-secondary); }
`;

const Map = styled.div`
    display: inline-flex; /* Use inline-flex for horizontal scroll */
    align-items: center;
    gap: var(--spacing-large);
    padding: var(--spacing-large);
    min-width: 100%; /* Ensure it takes at least full width */
`;

const Connector = styled.div`
    min-width: 60px;
    height: 5px;
    background-color: var(--border-color);
    flex-shrink: 0; /* Prevent connector from shrinking */
    border-radius: 3px;
`;

// Component
const CourseJourneyMap = ({ tasks, completedTaskIds, onTaskComplete }) => {
  // Ensure completedTaskIds is always an array for safe processing
  const safeCompletedTaskIds = Array.isArray(completedTaskIds) ? completedTaskIds : [];
  const userToken = localStorage.getItem('token'); // Assuming token is needed by TaskCard
  const mapRef = useRef(null); // Ref for the scrollable map element

  // State to track the index of the *first uncompleted* task.
  // This determines which tasks are locked.
  const [activeTaskIndex, setActiveTaskIndex] = useState(-1);

  // Effect to determine the active task index and scroll it into view
  useEffect(() => {
    // Ensure tasks is an array before proceeding
    if (!Array.isArray(tasks)) {
        console.error("CourseJourneyMap: tasks prop must be an array.", tasks);
        setActiveTaskIndex(-1); // Reset or handle error state
        return;
    }

    // Find the index of the first task that has an _id and is NOT completed.
    const firstUncompletedIndex = tasks.findIndex(
        task => task && task._id && !safeCompletedTaskIds.includes(task._id)
    );

    // Update the active task index.
    // If all tasks are completed (findIndex returns -1), set index to tasks.length.
    // This effectively unlocks all tasks because the `isLocked` condition (index > tasks.length) will always be false for valid indices.
    // Otherwise, set it to the index of the first uncompleted task.
    setActiveTaskIndex(firstUncompletedIndex === -1 ? tasks.length : firstUncompletedIndex);

    // Scroll the first *active* (uncompleted) task into view
    // We only scroll if there is an uncompleted task (firstUncompletedIndex >= 0)
    if (mapRef.current && firstUncompletedIndex >= 0 && firstUncompletedIndex < tasks.length) {
         // Calculate the index in the DOM: each task is followed by a connector (except the last)
         // The TaskCard element is at index `firstUncompletedIndex * 2`
         const elementIndex = firstUncompletedIndex * 2;
         const cardElement = mapRef.current.children[elementIndex];

         if (cardElement) {
             // Use scrollIntoView with options for smooth centering
             cardElement.scrollIntoView({
                 behavior: 'smooth',
                 inline: 'center', // Try to center horizontally
                 block: 'nearest' // Keep vertical position relative to the scroll container
             });
         } else {
            console.warn(`CourseJourneyMap: Could not find card element at index ${elementIndex} for scrolling.`);
         }
    }
    // Dependencies: Recalculate when the list of tasks or the *normalized* list of completed tasks changes.
  }, [tasks, safeCompletedTaskIds]); // Use safeCompletedTaskIds here


  // Render loading or empty state if tasks are not yet available or empty
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return <p>This journey awaits its first steps...</p>;
  }

  return (
    <MapContainer>
      <Map ref={mapRef}>
        {tasks.map((task, index) => {
          // Defensive check: Ensure task is valid and has an _id before rendering
          if (!task || typeof task._id === 'undefined' || task._id === null) {
              console.warn(`CourseJourneyMap: Task at index ${index} is invalid or missing _id. Skipping render.`, task);
              return null; // Skip rendering this invalid task item
          }

          const isCompleted = safeCompletedTaskIds.includes(task._id);
          // A task is locked if its index is greater than the index of the first uncompleted task.
          // If all tasks are completed, activeTaskIndex is tasks.length, so no task is locked.
          const isLocked = index > activeTaskIndex;
          // const isNextUp = index === activeTaskIndex; // Keep for potential future use

          return (
            // Using React.Fragment with a key is correct for wrapping multiple elements per iteration
            <React.Fragment key={task._id}>
              <TaskCard
                task={task}
                isLocked={isLocked}
                isCompleted={isCompleted}
                userToken={userToken} // Pass token if TaskCard needs it for API calls
                onTaskComplete={onTaskComplete} // Pass the callback
              />
              {/* Render a connector line if this is not the last task */}
              {index < tasks.length - 1 && (
                <Connector />
              )}
            </React.Fragment>
          );
        })}
      </Map>
    </MapContainer>
  );
};

// PropTypes for better component usage validation and error messages
CourseJourneyMap.propTypes = {
  /** Array of task objects, each requiring at least an _id */
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // Define other expected properties of a task object here for better validation
    // e.g., title: PropTypes.string, description: PropTypes.string,
  })),
  /** Array of IDs (_id) of the completed tasks */
  completedTaskIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  /** Callback function triggered when a task's completion status changes */
  onTaskComplete: PropTypes.func,
};

// Default props for robustness if props are not provided
CourseJourneyMap.defaultProps = {
  tasks: [],
  completedTaskIds: [],
  onTaskComplete: () => {}, // Provide a no-op default function to prevent errors if not passed
};

export default CourseJourneyMap;