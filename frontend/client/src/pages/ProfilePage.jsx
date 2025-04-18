// frontend/client/src/pages/ProfilePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProfileCardDisplay from '../components/ProfileCardDisplay';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userToken = localStorage.getItem('token');

  const fetchUserData = useCallback(async () => { setIsLoading(true); setError(null); if (!userToken) { setError("Please log in."); setIsLoading(false); return; } try { const response = await axios.get('/auth/me', { headers: { 'x-auth-token': userToken } }); setUserData(response.data); } catch (err) { const message = err.response?.data?.message || err.message || "Failed to load profile."; setError(message); if (err.response?.status === 401) setError("Session expired."); } finally { setIsLoading(false); } }, [userToken]);
  useEffect(() => { fetchUserData(); }, [fetchUserData]);

  return ( <div className="page-container profile-page"> <h1 style={{textAlign: 'center'}}>Your Profile</h1> {isLoading && <div className="loading-message">Loading Profile...</div>} {error && <div className="error-message">{error}</div>} {!isLoading && !error && userData && ( <ProfileCardDisplay user={userData} /> )} </div> );
};
export default ProfilePage;