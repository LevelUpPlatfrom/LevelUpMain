// frontend/client/src/components/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DarkModeToggle from './DarkModeToggle';

// Styled Components
const NavWrapper = styled.nav`
  background-color: var(--bg-secondary);
  padding: var(--spacing-small) var(--spacing-large);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  box-shadow: 0 2px 5px rgba(0,0,0,0.06);
  position: sticky; // Make navbar sticky
  top: 0;
  z-index: 1000; // Ensure it's above other content
  height: 60px; // Fixed height for consistency
`;

const BrandLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: var(--text-primary);
  text-decoration: none !important;
  &:hover { filter: none; text-decoration: none !important; }
`;

const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-medium);

  a, button {
    font-size: 0.95rem;
    text-decoration: none;
    padding: var(--spacing-small) var(--spacing-medium);
    border-radius: 6px;
    transition: var(--transition);
    color: var(--text-secondary);
    background: none; // Reset button background
    border: none; // Reset button border
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  // Hover effect for general links/buttons
  a:hover, button:not(.signup-button):not(.logout-button):hover {
    color: var(--text-primary);
    background-color: var(--bg-accent);
    text-decoration: none;
  }

  // Specific button styles
  .signup-button {
    background-color: var(--neon-blue);
    color: ${({ theme }) => theme.colors.darkText}; // Use dark text for contrast
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    &:hover { filter: brightness(0.9); color: ${({ theme }) => theme.colors.darkText}; }
  }

  .logout-button {
    border: 1px solid var(--border-color);
    color: var(--text-secondary);
    &:hover { background-color: var(--bg-accent); border-color: var(--text-secondary); }
  }
`;

// Component
const NavBar = ({ themeMode, toggleTheme, isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        navigate('/auth'); // Redirect to login after logout
    };

    return (
        <NavWrapper>
            <BrandLink to={isLoggedIn ? "/dashboard" : "/"}>LevelUp</BrandLink>
            <NavLinksContainer>
                {isLoggedIn ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/marketplace">Marketplace</Link>
                        <Link to="/leaderboard">Leaderboard</Link>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </>
                ) : (
                    <>
                         <Link to="/auth">Login</Link>
                         <Link to="/auth" className="signup-button">Sign Up</Link>
                    </>
                )}
                <DarkModeToggle themeMode={themeMode} toggleTheme={toggleTheme} />
            </NavLinksContainer>
        </NavWrapper>
    );
};
export default NavBar;