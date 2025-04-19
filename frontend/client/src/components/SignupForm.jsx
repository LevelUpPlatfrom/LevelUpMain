// frontend/client/src/components/SignupForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // CORRECT react-hook-form import
import { useNavigate, useLocation } from 'react-router-dom'; // CORRECT react-router-dom import
import { useAuth } from '../hooks/useAuth';
// REMOVED: styled-components import

const SignupForm = () => { // Removed setIsLoggedIn
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const [solanaWallet, setSolanaWallet] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { register: registerUser } = useAuth(); // Use hook
  const from = location.state?.from?.pathname || "/dashboard";
  const password = watch("password", "");

  const connectPhantomWallet = async () => { if (isLoading) return; setApiError(''); if (window.solana?.isPhantom) { try { const resp = await window.solana.connect({ onlyIfTrusted: false }); setSolanaWallet(resp.publicKey.toString()); } catch (err) { if (err.code !== 4001) setApiError("Wallet connect failed."); } } else { setApiError("Phantom not found."); } };
  const onSubmit = async (data) => { if (isLoading) return; setApiError(''); setIsLoading(true); try { await registerUser(data.email, data.password, solanaWallet || undefined); navigate(from, { replace: true }); } catch (err) { setApiError(err.response?.data?.message || err.message || 'Signup failed.'); } finally { setIsLoading(false); } };

  return (
    <div className="auth-form">
      <h2 className="auth-form-title">Create Account</h2>
      <form className="styled-form" onSubmit={handleSubmit(onSubmit)}> {/* Keep class if needed */}
        {apiError && <p className="form-api-error">{apiError}</p>}
        <div className="form-group"> <label className="form-label" htmlFor="signup-email">Email</label> <input className="form-input" id="signup-email" type="email" autoComplete="email" disabled={isLoading} {...register("email", { required: "Email required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })} placeholder="you@example.com" /> {errors.email && <p className="form-error-message">{errors.email.message}</p>} </div>
        <div className="form-group"> <label className="form-label" htmlFor="signup-password">Password</label> <input className="form-input" id="signup-password" type="password" autoComplete="new-password" disabled={isLoading} {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 chars" } })} placeholder="Min. 6 characters" /> {errors.password && <p className="form-error-message">{errors.password.message}</p>} </div>
        <div className="form-group"> <label className="form-label" htmlFor="confirm-password">Confirm Password</label> <input className="form-input" id="confirm-password" type="password" autoComplete="new-password" disabled={isLoading} {...register("confirmPassword", { required: "Confirm password", validate: value => value === password || "Passwords don't match" })} placeholder="Confirm password" /> {errors.confirmPassword && <p className="form-error-message">{errors.confirmPassword.message}</p>} </div>
        <div className="form-group wallet-section"> <label className="form-label wallet-label" htmlFor="solana-wallet-display">Solana Wallet (Optional)</label> <div className="wallet-input-group"> <input className="form-input wallet-input" type="text" id="solana-wallet-display" placeholder="Wallet not connected" value={solanaWallet} readOnly /> <button className="wallet-button" type="button" onClick={connectPhantomWallet} disabled={isLoading}>{solanaWallet ? 'Connected' : 'Connect Phantom'}</button> </div> {solanaWallet && <p className="wallet-connected-text">Wallet linked!</p>} </div>
        <button type="submit" className="form-submit-button signup" disabled={isLoading}> {isLoading ? 'Creating...' : 'Sign Up & Start'} </button>
      </form>
    </div>
  );
};
export default SignupForm;