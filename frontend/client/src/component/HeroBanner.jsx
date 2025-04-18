// frontend/client/src/components/HeroBanner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const HeroSection = styled.section`
  padding: 6rem var(--spacing-medium); /* More padding */
  text-align: center;
  /* Enhanced Gradients */
  background: ${({ theme }) => theme.mode === 'light'
    ? 'linear-gradient(145deg, #e0f7fa 0%, #fff0f5 100%)' // Light pastel cyan to pink
    : 'linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)' // Dark blue/indigo
  };
  color: ${({ theme }) => theme.colors.textPrimary};
  overflow: hidden; // Contain potential pseudo-elements
`;

const HeroContainer = styled.div`
  max-width: 850px; /* Slightly wider */
  margin: 0 auto;
  position: relative; // For potential future animations
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem; // Even larger
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: var(--spacing-medium);
  line-height: 1.1; // Tighter line height
  color: inherit; // Inherit color from HeroSection
  text-shadow: ${({ theme }) => theme.mode === 'dark' ? '0 1px 3px rgba(0,0,0,0.5)' : 'none'};

  @media (max-width: 768px) { font-size: 2.8rem; }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem; // Larger subtitle
  margin-bottom: var(--spacing-large);
  color: var(--text-secondary);
  max-width: 600px; // Constrain subtitle width
  margin-left: auto;
  margin-right: auto;
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(90deg, var(--neon-green), color-mix(in srgb, var(--neon-green) 70%, var(--neon-blue))); // Gradient button
  color: ${({ theme }) => theme.colors.darkText}; // Dark text for contrast
  padding: var(--spacing-medium) var(--spacing-xlarge);
  font-size: 1.2rem; // Larger button text
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: 50px; // Pill shape
  text-decoration: none;
  transition: all 0.3s ease; // Smoother transition
  letter-spacing: 0.5px;
  box-shadow: 0 5px 18px color-mix(in srgb, var(--neon-green) 40%, transparent);
  border: none;

  &:hover {
    filter: brightness(1.1); // Make brighter on hover
    transform: scale(1.05) translateY(-2px); // Lift effect
    text-decoration: none;
    box-shadow: 0 8px 25px color-mix(in srgb, var(--neon-green) 50%, transparent);
  }
`;

// Component
const HeroBanner = () => {
  return (
    <HeroSection>
      <HeroContainer>
        <HeroTitle>Level Up Your Skills, Level Up Your Life</HeroTitle>
        <HeroSubtitle>The ultimate gamified self-improvement platform. Fuse learning with XP, track progress, and conquer your goals.</HeroSubtitle>
        <HeroButton to="/auth">Start Your Journey Now</HeroButton>
      </HeroContainer>
    </HeroSection>
  );
};
export default HeroBanner;