// frontend/client/src/pages/SettingsPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const SettingsPage = () => {
  const [formData, setFormData] = useState({ email: '', solanaWallet: '', avatar: '' });
  const [originalData, setOriginalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const userToken = localStorage.getItem('token');

  const fetchUserData = useCallback(async () => { setIsLoading(true); setError(null); if (!userToken) { setError("Please log in."); setIsLoading(false); return; } try { const res = await axios.get('/auth/me', { headers: { 'x-auth-token': userToken } }); const data = { email: res.data.email || '', solanaWallet: res.data.solanaWallet || '', avatar: res.data.avatar || '' }; setFormData(data); setOriginalData(data); } catch (err) { setError(err.response?.data?.message || 'Failed fetch'); if (err.response?.status === 401) setError("Session expired."); } finally { setIsLoading(false); } }, [userToken]);
  useEffect(() => { fetchUserData(); }, [fetchUserData]);

  const handleInputChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); setSuccess(null); setError(null); };
  const handleSaveChanges = async (e) => { e.preventDefault(); if (isSaving) return; setError(null); setSuccess(null); setIsSaving(true); const dataToUpdate = {}; if (formData.avatar !== originalData.avatar) dataToUpdate.avatar = formData.avatar; if (Object.keys(dataToUpdate).length === 0) { setSuccess("No changes detected."); setIsSaving(false); return; } alert("Save functionality needs backend endpoint!"); setIsSaving(false); /* TODO: API call to save settings */ };
  const handleWalletConnect = () => { alert("Wallet connect logic needed."); };

  const hasChanges = formData.avatar !== originalData.avatar;

  if (isLoading) return <div className="loading-message">Loading Settings...</div>;

  return ( <div className="page-container settings-page"> <h1>Settings</h1> {error && <div className="error-message">{error}</div>} {success && <div className="settings-message success">{success}</div>} <form className="settings-form" onSubmit={handleSaveChanges}> <div className="settings-form-section"> <h2>Account</h2> <div className="settings-form-group"> <label htmlFor="email">Email</label> <input className="form-input" type="email" id="email" value={formData.email} disabled readOnly /> <small>Email cannot be changed here.</small> </div> </div> <div className="settings-form-section"> <h2>Profile</h2> <div className="settings-form-group"> <label htmlFor="avatar">Avatar URL</label> <input className="form-input" type="text" id="avatar" name="avatar" placeholder="Image URL (e.g., imgur, ipfs)" value={formData.avatar} onChange={handleInputChange} disabled={isSaving}/> <img className="settings-avatar-preview" src={formData.avatar} alt="Avatar Preview" onError={(e) => e.target.style.display='none'} onLoad={(e) => e.target.style.display='block'} /> </div> </div> <div className="settings-form-section"> <h2>Wallet</h2> <div className="settings-form-group"> <label htmlFor="solanaWalletDisplay">Solana Wallet</label> <div className="settings-wallet-input-group"> <input className="form-input" type="text" id="solanaWalletDisplay" value={formData.solanaWallet} placeholder="Not connected" readOnly /> <button type="button" onClick={handleWalletConnect} disabled={isSaving}>{formData.solanaWallet ? 'Disconnect' : 'Connect Wallet'}</button> </div> </div> </div> <button type="submit" className="save-settings-button" disabled={isSaving || !hasChanges}>{isSaving ? 'Saving...' : 'Save Changes'}</button> </form> </div> );
};
export default SettingsPage;
