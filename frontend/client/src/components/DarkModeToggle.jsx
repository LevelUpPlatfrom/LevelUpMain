// frontend/client/src/components/DarkModeToggle.jsx
import React from 'react';
// REMOVED: styled-components import

const DarkModeToggle = ({ themeMode, toggleTheme }) => {
  return (
    <button
      className="dark-mode-toggle" // Use class from index.css
      onClick={toggleTheme}
      title={themeMode === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {themeMode === 'light' ? '🌙' : '☀️'}
    </button>
  );
};
export default DarkModeToggle;