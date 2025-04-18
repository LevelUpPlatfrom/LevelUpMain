// frontend/client/src/components/DarkModeToggle.jsx
import React from 'react';
import styled from 'styled-components';

// Styled Components
const ToggleButton = styled.button`
    background: var(--bg-accent);
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    border-radius: 20px; // Pill shape
    padding: 0.4rem 0.8rem;
    font-size: 1.1rem; // Slightly larger icon
    display: flex;
    align-items: center;
    justify-content: center; // Center icon
    cursor: pointer;
    outline: none;
    line-height: 1; // Ensure icon vertical alignment
    transition: ${({ theme }) => theme.transition};
    width: 40px; // Fixed width/height for circle
    height: 40px;

    &:hover {
        color: var(--text-primary);
        border-color: var(--text-secondary);
        background-color: var(--border-color);
    }
`;

// Component
const DarkModeToggle = ({ themeMode, toggleTheme }) => {
  return (
    <ToggleButton onClick={toggleTheme} title={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}>
      {themeMode === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
};
export default DarkModeToggle;