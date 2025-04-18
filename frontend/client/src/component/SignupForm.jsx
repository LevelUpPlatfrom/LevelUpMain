// frontend/client/src/components/SignupForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Reusable Styles (Import or define inline)
const FormWrapper = styled.div``;
const FormTitle = styled.h2` text-align: center; font-size: 1.8rem; font-weight: ${({ theme }) => theme.fontWeights.bold}; margin-bottom: var(--spacing-large); color: var(--text-primary); `;
const StyledForm = styled.form` margin-top: var(--spacing-medium); `;
const FormGroup = styled.div` margin-bottom: var(--spacing-medium); `;
const Label = styled.label` display: block; margin-bottom: var(--spacing-small); font-weight: ${({ theme }) => theme.fontWeights.medium}; font-size: 0.9rem; color: var(--text-primary); `;
const Input = styled.input` /* Uses global */ margin-bottom: 0.2rem; `;
const ErrorMessage = styled.p` color: var(--danger); font-size: 0.8rem; margin-top: 0.2rem; min-height: 1em; `;
const SubmitButton = styled.button` width: 100%; padding: var(--spacing-medium); font-size: 1rem; margin-top: var(--spacing-small); color: #fff; font-weight: ${({ theme }) => theme.fontWeights.bold}; &:hover { filter: brightness(1.1); transform: scale(1.02); } `;
const ApiErrorMessage = styled.p` color: var(--danger); text-align: center; margin-bottom: var(--spacing-medium); font-size: 0.9rem; background-color: color-mix(in srgb, var(--danger) 10%, transparent); border: 1px solid color-mix(in srgb, var(--danger) 30%, transparent); padding: var(--spacing-small); border-radius: 4px; `;
const WalletSection = styled(FormGroup)` margin-top: var(--spacing-large); border-top: 1px dashed var(--border-color); padding-top: var(--spacing-large); `;
const WalletLabel = styled(Label)` color: var(--text-secondary); `;
const WalletInputGroup = styled.div` display: flex; `;
const WalletInput = styled(Input)` border-top-right-radius: 0; border-bottom-right-radius: 0; margin-bottom: 0; background-color: var(--bg-accent); cursor: default; `;
const WalletButton = styled.button` border-top-left-radius: 0; border-bottom-left-radius: 0; white-space: nowrap; background-color: var(--bg-accent); color: var(--text-primary); border: 1px solid var(--border-color); border-left: none; padding: 0.75rem; &:hover { background-color: var(--border-color); } `;
const WalletConnectedText = styled.p` font-size: 0.8rem; color: var(--success); margin-top: var(--spacing-small); `;

// Signup Specific Styles
const SignupSubmitButton = styled(SubmitButton)`
  background: linear-gradient(90deg, var(--neon-purple), color-mix(in srgb, var(--neon-purple) 70%, var(--neon-blue)));
  &:hover { box-shadow: 0 4px 15px color-mix(in srgb, var(--neon-purple) 30%, transparent); }
`;

// Component
const SignupForm = ({ setIsLoggedIn }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const [solanaWallet, setSolanaWallet] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const password = watch("password", "");

  const connectPhantomWallet = async () => { setApiError(''); if (window.solana?.isPhantom) { try { const resp = await window.solana.connect({ onlyIfTrusted: false }); setSolanaWallet(resp.publicKey.toString()); } catch (err) { if (err.code !== 4001) setApiError("Wallet connect failed."); } } else { setApiError("Phantom not found."); } };
  const onSubmit = async (data) => { setApiError(''); const signupData = { email: data.email, password: data.password, solanaWallet: solanaWallet || undefined }; try { const response = await axios.post('/auth/register', signupData); localStorage.setItem('token', response.data.token); localStorage.setItem('userId', response.data.userId); setIsLoggedIn(true); navigate(from, { replace: true }); } catch (err) { const message = err.response?.data?.message || err.message || 'Signup failed.'; setApiError(message); } };

  return ( <FormWrapper> <FormTitle>Create Account</FormTitle> <StyledForm onSubmit={handleSubmit(onSubmit)}> {apiError && <ApiErrorMessage>{apiError}</ApiErrorMessage>} <FormGroup> <Label htmlFor="signup-email">Email</Label> <Input id="signup-email" type="email" autoComplete="email" {...register("email", { required: "Email required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })} placeholder="you@example.com" /> {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>} </FormGroup> <FormGroup> <Label htmlFor="signup-password">Password</Label> <Input id="signup-password" type="password" autoComplete="new-password" {...register("password", { required: "Password required", minLength: { value: 6, message: "Min 6 chars" } })} placeholder="Min. 6 characters" /> {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>} </FormGroup> <FormGroup> <Label htmlFor="confirm-password">Confirm Password</Label> <Input id="confirm-password" type="password" autoComplete="new-password" {...register("confirmPassword", { required: "Confirm password", validate: value => value === password || "Passwords don't match" })} placeholder="Confirm password" /> {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>} </FormGroup> <WalletSection> <WalletLabel htmlFor="solana-wallet-display">Solana Wallet (Optional)</WalletLabel> <WalletInputGroup> <WalletInput type="text" id="solana-wallet-display" placeholder="Wallet not connected" value={solanaWallet} readOnly /> <WalletButton type="button" onClick={connectPhantomWallet}>{solanaWallet ? 'Connected' : 'Connect Phantom'}</WalletButton> </WalletInputGroup> {solanaWallet && <WalletConnectedText>Wallet linked!</WalletConnectedText>} </WalletSection> <SignupSubmitButton type="submit"> Sign Up & Start Leveling </SignupSubmitButton> </StyledForm> </FormWrapper> );
};
export default SignupForm;