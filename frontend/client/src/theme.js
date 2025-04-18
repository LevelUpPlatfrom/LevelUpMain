// frontend/client/src/theme.js

const sharedColors = {
  neonBlue: '#00ccff', // Bright cyan/blue
  neonPurple: '#cc00ff', // Bright magenta/purple
  neonGreen: '#00ffcc', // Bright cyan/green
  neonGold: '#ffdd44', // Brighter gold
  danger: '#dc3545',   // Red for errors
  success: '#28a745',  // Green for success
  white: '#ffffff',
  black: '#000000',
  darkText: '#1a1a1a', // For text on light bright backgrounds
};

export const lightTheme = {
  mode: 'light',
  colors: {
    bgPrimary: '#ffffff',       // Pure white background
    bgSecondary: '#f8f9fa',     // Very light grey (cards, sidebars)
    bgAccent: '#e9ecef',       // Light grey (hover states, borders)
    textPrimary: '#212529',     // Very dark grey (near black)
    textSecondary: '#6c757d',   // Medium grey
    textAccent: sharedColors.neonBlue, // Use neon blue as primary accent
    border: '#dee2e6',         // Light grey border
    cardShadow: '0 5px 15px rgba(0, 0, 0, 0.08)', // Slightly more defined shadow
    ...sharedColors,
  },
  spacing: {
    xsmall: '0.25rem', // 4px
    small: '0.5rem',  // 8px
    medium: '1rem',   // 16px
    large: '1.5rem',  // 24px
    xlarge: '2rem',   // 32px
  },
  borderRadius: '8px',
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  transition: 'all 0.2s ease-in-out',
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    bgPrimary: '#0D0D0D',       // Very dark grey (near black)
    bgSecondary: '#1A1A1A',     // Dark grey (cards, sidebars)
    bgAccent: '#2a2a2a',       // Medium-dark grey (hover states)
    textPrimary: '#f8f9fa',     // Very light grey (near white)
    textSecondary: '#adb5bd',   // Medium light grey
    textAccent: sharedColors.neonBlue, // Keep neon blue as primary accent
    border: '#495057',         // Darker border
    cardShadow: '0 8px 20px rgba(0, 0, 0, 0.35)', // More prominent shadow
    ...sharedColors,
  },
  spacing: {
    xsmall: '0.25rem',
    small: '0.5rem',
    medium: '1rem',
    large: '1.5rem',
    xlarge: '2rem',
  },
  borderRadius: '8px',
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  transition: 'all 0.2s ease-in-out',
};