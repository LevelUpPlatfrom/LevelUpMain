// frontend/client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Placeholder links - replace # with actual URLs later
  const socialLinks = [
    { name: 'Twitter', url: '#', icon: '🐦' }, // Example icons
    { name: 'GitHub', url: '#', icon: '🐙' },
    { name: 'Discord', url: '#', icon: '💬' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 var(--sp-md)' }}> {/* Added container style */}
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/settings">Settings</Link>
        </nav>
        {/* Optional Social Links Section */}
        <div className="footer-socials" style={{ marginBottom: 'var(--sp-md)' }}>
          {socialLinks.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={link.name} style={{ margin: '0 var(--sp-sm)', fontSize: '1.2rem', textDecoration: 'none' }}>
              {link.icon}
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} LevelUp.earth - Elevate Yourself.</p>
      </div>
    </footer>
  );
};

export default Footer;