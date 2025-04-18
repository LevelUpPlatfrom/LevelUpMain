// frontend/client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const FooterWrapper = styled.footer`
  background-color: var(--bg-accent);
  padding: var(--spacing-large) var(--spacing-medium); /* Use CSS vars */
  margin-top: var(--spacing-xlarge); /* Use CSS vars */
  text-align: center;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.9rem;
`;

const FooterNav = styled.nav`
  margin-bottom: var(--spacing-medium);
  a {
    margin: 0 var(--spacing-medium);
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.2s ease; /* Use global transition */
  }
  a:hover {
    color: var(--text-accent);
    text-decoration: underline;
  }
`;

const Container = styled.div` /* Simple container if needed */
  max-width: 1100px;
  margin: 0 auto;
`;

// Component
const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <FooterNav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/settings">Settings</Link>
        </FooterNav>
        <p>© {new Date().getFullYear()} LevelUp. All rights reserved.</p>
      </Container>
    </FooterWrapper>
  );
};
export default Footer;