// frontend/client/src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  /* CSS Variables from Theme for potential direct use if needed */
  body {
    --bg-primary: ${({ theme }) => theme.colors.bgPrimary};
    --bg-secondary: ${({ theme }) => theme.colors.bgSecondary};
    --bg-accent: ${({ theme }) => theme.colors.bgAccent};
    --text-primary: ${({ theme }) => theme.colors.textPrimary};
    --text-secondary: ${({ theme }) => theme.colors.textSecondary};
    --text-accent: ${({ theme }) => theme.colors.textAccent};
    --border-color: ${({ theme }) => theme.colors.border};
    --card-shadow: ${({ theme }) => theme.colors.cardShadow};
    --neon-blue: ${({ theme }) => theme.colors.neonBlue};
    --neon-purple: ${({ theme }) => theme.colors.neonPurple};
    --neon-green: ${({ theme }) => theme.colors.neonGreen};
    --neon-gold: ${({ theme }) => theme.colors.neonGold};
    --danger: ${({ theme }) => theme.colors.danger};
    --success: ${({ theme }) => theme.colors.success};
    --border-radius: ${({ theme }) => theme.borderRadius};
    --spacing-small: ${({ theme }) => theme.spacing.small};
    --spacing-medium: ${({ theme }) => theme.spacing.medium};
    --spacing-large: ${({ theme }) => theme.spacing.large};
    --spacing-xlarge: ${({ theme }) => theme.spacing.xlarge};
  }

  /* Basic Reset */
  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
    font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    font-size: 16px; /* Base font size */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden; /* Prevent horizontal scroll on body */
  }

  /* Links */
  a { color: var(--text-accent); text-decoration: none; transition: color 0.2s ease; }
  a:hover { text-decoration: underline; filter: brightness(0.9); }

  /* Headings */
  h1, h2, h3, h4, h5, h6 { color: var(--text-primary); margin-bottom: var(--spacing-medium); font-weight: ${({ theme }) => theme.fontWeights.bold}; line-height: 1.3; }
  h1 { font-size: 2.5rem; } h2 { font-size: 2rem; } h3 { font-size: 1.5rem; } h4 { font-size: 1.2rem; }

  /* Paragraphs */
  p { margin-bottom: var(--spacing-medium); color: var(--text-secondary); }

  /* Buttons */
  button {
    cursor: pointer; padding: var(--spacing-small) var(--spacing-medium); border: none;
    border-radius: 6px; font-weight: ${({ theme }) => theme.fontWeights.medium};
    transition: ${({ theme }) => theme.transition}; font-family: inherit; font-size: 1rem;
    &:active { transform: scale(0.98); }
  }

  /* Inputs */
  input[type="text"], input[type="email"], input[type="password"] {
    width: 100%; padding: var(--spacing-medium); margin-bottom: var(--spacing-medium);
    border: 1px solid var(--border-color); border-radius: 4px;
    background-color: var(--bg-secondary); color: var(--text-primary);
    font-size: 1rem; transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  input:focus {
    outline: none; border-color: var(--text-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--text-accent) 20%, transparent);
  }
  body.dark input { background-color: var(--bg-accent); border-color: #555; } /* Target dark mode */

  /* Layout Helpers */
  .app-container.with-sidebar { display: flex; }
  .main-content-area { flex-grow: 1; width: 100%; transition: margin-left 0.3s ease; }
  .content-with-sidebar { margin-left: 240px; width: calc(100% - 240px); }
  .page-container { padding: var(--spacing-large) var(--spacing-xlarge); max-width: 1200px; margin: 0 auto; }
  .loading-message, .error-message { text-align: center; padding: var(--spacing-xlarge); font-size: 1.1rem; color: var(--text-secondary); }
  .error-message {
      color: var(--danger); background-color: color-mix(in srgb, var(--danger) 10%, transparent);
      border: 1px solid color-mix(in srgb, var(--danger) 30%, transparent);
      border-radius: var(--border-radius); margin: var(--spacing-medium);
  }
  .back-button { display: inline-block; margin-bottom: var(--spacing-medium); color: var(--text-accent); font-size: 0.9rem; }
`;
export default GlobalStyles;