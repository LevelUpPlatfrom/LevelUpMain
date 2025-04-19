// frontend/client/src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // CORRECT react-router-dom import
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../hooks/useAuth';
// REMOVED: styled-components import

const NavBar = ({ themeMode, toggleTheme }) => { // Removed isLoggedIn/setIsLoggedIn
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth(); // Use hook

    const handleLogout = () => { logout(); navigate('/auth'); };

    return (
        <nav className="navbar">
            <Link to={isLoggedIn ? "/dashboard" : "/"} className="navbar-brand">LevelUp</Link>
            <div className="navbar-links">
                {isLoggedIn ? ( <> <Link to="/dashboard">Dashboard</Link> <Link to="/marketplace">Marketplace</Link> <Link to="/leaderboard">Leaderboard</Link> <button onClick={handleLogout} className="logout-button">Logout</button> </> )
                : ( <> <Link to="/auth">Login</Link> <Link to="/auth" className="signup-button">Sign Up</Link> </> )}
                <DarkModeToggle themeMode={themeMode} toggleTheme={toggleTheme} />
            </div>
        </nav>
    );
};
export default NavBar;