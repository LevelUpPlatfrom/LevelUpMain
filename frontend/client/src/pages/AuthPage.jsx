// frontend/client/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
// REMOVED: styled-components import

// UseAuth hook handles setIsLoggedIn
const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  return (
    // Use CSS classes for layout
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button onClick={() => setIsLoginView(true)} className={`auth-tab ${isLoginView ? 'active' : ''}`}> Login </button>
          <button onClick={() => setIsLoginView(false)} className={`auth-tab ${!isLoginView ? 'active' : ''}`}> Sign Up </button>
        </div>
        {/* No need to pass setIsLoggedIn down */}
        {isLoginView ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
};
export default AuthPage;