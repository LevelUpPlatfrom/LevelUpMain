// frontend/client/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
// NavBar/Footer handled by App.js potentially, or include manually if needed outside protected routes

const AuthPageContainer = styled.div` display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: calc(100vh - 60px); /* Adjust if NavBar height changes */ padding: var(--spacing-xlarge) var(--spacing-medium); `;
const AuthCard = styled.div` background-color: var(--bg-secondary); padding: var(--spacing-large) var(--spacing-xlarge); border-radius: var(--border-radius); box-shadow: var(--card-shadow); max-width: 480px; width: 100%; border: 1px solid var(--border-color); `;
const AuthTabs = styled.div` display: flex; border-bottom: 1px solid var(--border-color); margin-bottom: var(--spacing-large); `;
const AuthTab = styled.button` flex: 1; padding: var(--spacing-medium) 0; text-align: center; font-weight: ${({ theme }) => theme.fontWeights.medium}; cursor: pointer; border: none; background: none; border-bottom: 3px solid transparent; margin-bottom: -1px; color: var(--text-secondary); transition: border-color 0.2s ease, color 0.2s ease; font-size: 1.1rem; &:hover { color: var(--text-primary); } &.active { border-bottom-color: var(--text-accent); color: var(--text-accent); font-weight: ${({ theme }) => theme.fontWeights.bold}; } `;

const AuthPage = ({ setIsLoggedIn }) => { // Removed theme props as they come from ThemeProvider
  const [isLoginView, setIsLoginView] = useState(true);
  return ( <AuthPageContainer> <AuthCard> <AuthTabs> <AuthTab onClick={() => setIsLoginView(true)} className={isLoginView ? 'active' : ''}> Login </AuthTab> <AuthTab onClick={() => setIsLoginView(false)} className={!isLoginView ? 'active' : ''}> Sign Up </AuthTab> </AuthTabs> {isLoginView ? <LoginForm setIsLoggedIn={setIsLoggedIn} /> : <SignupForm setIsLoggedIn={setIsLoggedIn} />} </AuthCard> </AuthPageContainer> );
};
export default AuthPage;