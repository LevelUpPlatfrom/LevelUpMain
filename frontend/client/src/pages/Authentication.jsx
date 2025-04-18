// frontend/client/src/pages/AuthPage.jsx
import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const AuthPage = ({ setIsLoggedIn }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-tabs">
          <button onClick={() => setIsLoginView(true)} className={`auth-tab ${isLoginView ? 'active' : ''}`}> Login </button>
          <button onClick={() => setIsLoginView(false)} className={`auth-tab ${!isLoginView ? 'active' : ''}`}> Sign Up </button>
        </div>
        {isLoginView
           ? <LoginForm setIsLoggedIn={setIsLoggedIn} />
           : <SignupForm setIsLoggedIn={setIsLoggedIn} />
         }
      </div>
    </div>
  );
};
export default AuthPage;