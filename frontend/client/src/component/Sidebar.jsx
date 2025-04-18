// frontend/client/src/components/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import DarkModeToggle from './DarkModeToggle';

// Styled Components
const SidebarWrapper = styled.aside`
    width: 240px;
    background-color: var(--bg-secondary);
    height: 100vh; // Full height
    border-right: 1px solid var(--border-color);
    position: fixed; // Fixed position
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: var(--spacing-large) var(--spacing-medium);
    z-index: 999; // High z-index, but below potential modals/navbars
    transition: ${({ theme }) => theme.transition}; // Use theme transition
`;

const SidebarBrand = styled(NavLink)`
    font-size: 1.8rem;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: var(--spacing-xlarge); // More space below brand
    text-align: center;
    color: var(--text-primary);
    text-decoration: none !important;
     &:hover { text-decoration: none !important; filter: none;}
`;

const NavList = styled.nav`
    flex-grow: 1; // Takes up available space
    overflow-y: auto; // Add scroll if needed for many items
`;

const NavItem = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: var(--spacing-medium);
    padding: var(--spacing-medium);
    border-radius: var(--border-radius);
    color: var(--text-secondary);
    margin-bottom: var(--spacing-small);
    font-size: 0.95rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    text-decoration: none !important;
    transition: ${({ theme }) => theme.transition}; // Use theme transition

    span:first-child { // Icon
        font-size: 1.2rem;
        line-height: 1; // Align icon better
    }

    &:hover {
        background-color: var(--bg-accent);
        color: var(--text-primary);
        text-decoration: none !important;
    }

    // Active state using NavLink's className injection
    &.active {
        background-color: var(--text-accent); // Use theme accent
        color: ${({ theme }) => theme.mode === 'light' ? theme.colors.white : theme.colors.bgPrimary};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        box-shadow: 0 3px 8px color-mix(in srgb, var(--text-accent) 25%, transparent);

        /* Optionally add subtle icon color change */
        span:first-child {
            color: inherit; // Inherit color from parent (white/dark)
        }
    }
`;

const SidebarFooterDiv = styled.div`
    margin-top: auto; // Pushes to bottom
    padding-top: var(--spacing-medium);
    border-top: 1px solid var(--border-color);
    display: flex; // Arrange items in footer
    flex-direction: column;
    align-items: center; // Center items like toggle
    gap: var(--spacing-small);
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: var(--spacing-medium);
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: var(--text-secondary);
    padding: var(--spacing-medium);
    border-radius: var(--border-radius);
    margin-top: var(--spacing-small);
    font-size: 0.95rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    cursor: pointer;
    transition: ${({ theme }) => theme.transition};

    span:first-child { font-size: 1.2rem; }

    &:hover {
        background-color: color-mix(in srgb, var(--danger) 10%, transparent);
        color: var(--danger);
    }
`;

// Component
const Sidebar = ({ themeMode, toggleTheme, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('userId');
    setIsLoggedIn(false); navigate('/auth');
  };
  const navLinks = [
    { to: "/dashboard", text: "Dashboard", icon: "📊" },
    { to: "/profile", text: "Profile", icon: "🧑‍🚀" },
    { to: "/leaderboard", text: "Leaderboard", icon: "🏆" },
    { to: "/marketplace", text: "Marketplace", icon: "🛍️" },
    { to: "/settings", text: "Settings", icon: "⚙️" },
  ];

  return (
    <SidebarWrapper>
      <div>
        <SidebarBrand to="/dashboard">LevelUp</SidebarBrand>
        <NavList>
          {navLinks.map(link => (
            <NavItem key={link.to} to={link.to}>
              <span>{link.icon}</span> <span>{link.text}</span>
            </NavItem>
          ))}
        </NavList>
      </div>
      <SidebarFooterDiv>
        <DarkModeToggle themeMode={themeMode} toggleTheme={toggleTheme} />
        <LogoutButton onClick={handleLogout}><span>🚪</span> <span>Logout</span></LogoutButton>
      </SidebarFooterDiv>
    </SidebarWrapper>
  );
};
export default Sidebar;