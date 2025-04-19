// frontend/client/src/pages/SettingsPage.jsx
import React, { useState, useEffect } from 'react'; // REMOVED: useCallback
import api from '../utils/api';
import { useAuth } from '../hooks/useAuth';

const SettingsPage = () => {
  const { user, refreshUser, isLoading: isAuthLoading } = useAuth();
  const [formData, setFormData] = useState({ avatar: '' });
  const [originalAvatar, setOriginalAvatar] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Populate form from user context
  useEffect(() => {
    if (user) {
      setFormData({ avatar: user.avatar || '' });
      setOriginalAvatar(user.avatar || '');
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setSuccess(null); setError(null);
  };

  // handleSaveChanges doesn't need useCallback unless passed to memoized child
  const handleSaveChanges = async (e) => {
    e.preventDefault(); if (isSaving) return; setError(null); setSuccess(null);
    const dataToUpdate = {}; if (formData.avatar !== originalAvatar) dataToUpdate.avatar = formData.avatar;
    if (Object.keys(dataToUpdate).length === 0) { setSuccess("No changes."); return; }
    setIsSaving(true); alert("Save needs backend!"); setIsSaving(false);
    /* Placeholder: try { await api.put('/api/profile/settings', dataToUpdate); setSuccess("Saved!"); setOriginalAvatar(formData.avatar); refreshUser(); } catch (err) { setError(err.response?.data?.message || 'Save failed.'); } finally { setIsSaving(false); } */
  };

  const handleWalletConnect = () => { alert("Wallet connect logic needed."); };
  const hasChanges = formData.avatar !== originalAvatar;

  if (isAuthLoading || !user) return <div className="loading-message">Loading...</div>;
  if (authError) return <div className="error-message">{authError}</div>; // Check for authError


  return (
    <div className="page-container settings-page">
      <h1>Settings</h1>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="settings-message success">{success}</div>}
      <form className="settings-form" onSubmit={handleSaveChanges}>
         {/* Sections using className */}
         <div className="settings-form-section"> <h2>Account</h2> <div className="settings-form-group"> <label htmlFor="email">Email</label> <input className="form-input" type="email" id="email" value={user.email || ''} disabled readOnly /> <small>Email cannot be changed here.</small> </div> </div>
         <div className="settings-form-section"> <h2>Profile</h2> <div className="settings-form-group"> <label htmlFor="avatar">Avatar URL</label> <input className="form-input" type="text" id="avatar" name="avatar" placeholder="Image URL" value={formData.avatar} onChange={handleInputChange} disabled={isSaving}/> <img className="settings-avatar-preview" src={formData.avatar} alt="Preview" onError={(e) => {e.target.style.display='none'}} /> </div> </div>
         <div className="settings-form-section"> <h2>Wallet</h2> <div className="settings-form-group"> <label htmlFor="solanaWalletDisplay">Solana Wallet</label> <div className="settings-wallet-input-group"> <input className="form-input" type="text" id="solanaWalletDisplay" value={user.solanaWallet || ''} placeholder="Not connected" readOnly /> <button type="button" onClick={handleWalletConnect} disabled={isSaving}>{user.solanaWallet ? 'Disconnect' : 'Connect'}</button> </div> </div> </div>
         <button type="submit" className="save-settings-button" disabled={isSaving || !hasChanges}>{isSaving ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
};
export default SettingsPage;