// frontend/client/src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled Components
const FormWrapper = styled.div``;
const FormTitle = styled.h2` text-align: center; font-size: 1.8rem; font-weight: ${({ theme }) => theme.fontWeights.bold}; margin-bottom: var(--spacing-large); color: var(--text-primary); `;
const StyledForm = styled.form` margin-top: var(--spacing-medium); `;
const FormGroup = styled.div` margin-bottom: var(--spacing-medium); `;
const Label = styled.label` display: block; margin-bottom: var(--spacing-small); font-weight: ${({ theme }) => theme.fontWeights.medium}; font-size: 0.9rem; color: var(--text-primary); `;
const Input = styled.input` /* Inherits from GlobalStyles */ margin-bottom: 0.2rem; `;
const ErrorMessage = styled.p` color: var(--danger); font-size: 0.8rem; margin-top: 0.2rem; min-height: 1em; `;
const RememberMeGroup = styled(FormGroup)` display: flex; align-items: center; input[type="checkbox"] { width: auto; margin-right: var(--spacing-small); margin-bottom: 0; } label { margin-bottom: 0; font-weight: ${({ theme }) => theme.fontWeights.regular}; color: var(--text-secondary); } `;
const SubmitButton = styled.button` width: 100%; padding: var(--spacing-medium); font-size: 1rem; margin-top: var(--spacing-small); background: linear-gradient(90deg, var(--neon-blue), color-mix(in srgb, var(--neon-blue) 70%, var(--neon-green))); color: ${({ theme }) => theme.colors.darkText}; font-weight: ${({ theme }) => theme.fontWeights.bold}; border: none; &:hover { filter: brightness(1.1); transform: scale(1.02); box-shadow: 0 4px 15px color-mix(in srgb, var(--neon-blue) 30%, transparent); } `;
const ApiErrorMessage = styled.p` color: var(--danger); text-align: center; margin-bottom: var(--spacing-medium); font-size: 0.9rem; background-color: color-mix(in srgb, var(--danger) 10%, transparent); border: 1px solid color-mix(in srgb, var(--danger) 30%, transparent); padding: var(--spacing-small); border-radius: 4px; `;

// Component
const LoginForm = ({ setIsLoggedIn }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data) => {
    setApiError('');
    try {
      const response = await axios.post('/auth/login', data);
      localStorage.setItem('token', response.data.token); localStorage.setItem('userId', response.data.userId);
      setIsLoggedIn(true); navigate(from, { replace: true });
    } catch (err) { const message = err.response?.data?.message || err.message || 'Login failed.'; setApiError(message); }
  };

  return ( <FormWrapper> <FormTitle>Log In</FormTitle> <StyledForm onSubmit={handleSubmit(onSubmit)}> {apiError && <ApiErrorMessage>{apiError}</ApiErrorMessage>} <FormGroup> <Label htmlFor="login-email">Email</Label> <Input id="login-email" type="email" autoComplete="email" {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" } })} placeholder="you@example.com" /> {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>} </FormGroup> <FormGroup> <Label htmlFor="login-password">Password</Label> <Input id="login-password" type="password" autoComplete="current-password" {...register("password", { required: "Password is required" })} placeholder="••••••••" /> {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>} </FormGroup> <RememberMeGroup> <input id="remember-me" type="checkbox" {...register("rememberMe")} /> <Label htmlFor="remember-me">Remember me</Label> </RememberMeGroup> <SubmitButton type="submit"> Sign In </SubmitButton> </StyledForm> </FormWrapper> );
};
export default LoginForm;