// frontend/client/src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // CORRECT react-hook-form import
import { useNavigate, useLocation } from 'react-router-dom'; // CORRECT react-router-dom import
import { useAuth } from '../hooks/useAuth';
// REMOVED: styled-components import

const LoginForm = () => { // Removed setIsLoggedIn prop
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    if (isLoading) return; setApiError(''); setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) { setApiError(err.response?.data?.message || err.message || 'Login failed.'); }
    finally { setIsLoading(false); }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form-title">Log In</h2>
      <form className="styled-form" onSubmit={handleSubmit(onSubmit)}> {/* Keep class if defined in index.css */}
        {apiError && <p className="form-api-error">{apiError}</p>}
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">Email</label>
          <input className="form-input" id="login-email" type="email" autoComplete="email" disabled={isLoading} {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })} placeholder="you@example.com" />
          {errors.email && <p className="form-error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="login-password">Password</label>
          <input className="form-input" id="login-password" type="password" autoComplete="current-password" disabled={isLoading} {...register("password", { required: "Password is required" })} placeholder="••••••••" />
          {errors.password && <p className="form-error-message">{errors.password.message}</p>}
        </div>
        <div className="form-group form-remember-me">
          <input id="remember-me" type="checkbox" disabled={isLoading} {...register("rememberMe")} />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="form-submit-button login" disabled={isLoading}>
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};
export default LoginForm;