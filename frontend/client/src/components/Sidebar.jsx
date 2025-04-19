// frontend/client/src/components/Sidebar.jsx
import React from 'react'; // REMOVED useTheme import
import { NavLink, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../hooks/useAuth';
// REMOVED: styled-components import

const Sidebar = ({ themeMode, toggleTheme }) => { // Removed setIsLoggedIn
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use hook

  const handleLogout = () => { logout(); navigate('/auth'); };
  const navLinks = [ { to: "/dashboard", text: "Dashboard", icon: "📊" }, { to: "/profile", text: "Profile", icon: "🧑‍🚀" }, { to: "/leaderboard", text: "Leaderboard", icon: "🏆" }, { to: "/marketplace", text: "Marketplace", icon: "🛍️" }, { to: "/settings", text: "Settings", icon: "⚙️" }, ];

  return (
    <aside className="sidebar">
      <div>
        <NavLink to="/dashboard" className="sidebar-brand">LevelUp</NavLink>
        <nav className="sidebar-nav">
          {navLinks.map(link => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}>
              <span>{link.icon}</span> <span>{link.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="sidebar-footer">
        <DarkModeToggle themeMode={themeMode} toggleTheme={toggleTheme} />
        <button onClick={handleLogout} className="sidebar-logout-button"><span>🚪</span> <span>Logout</span></button>
      </div>
    </aside>
  );
};
export default Sidebar;