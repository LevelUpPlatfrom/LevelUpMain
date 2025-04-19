// frontend/client/src/pages/ProfilePage.jsx
import React from 'react'; // No other imports needed besides the hook and component
import { useAuth } from '../hooks/useAuth'; // Import the hook
import ProfileCardDisplay from '../components/ProfileCardDisplay'; // Import the display component

const ProfilePage = () => {
  // Get user data, loading status, and error directly from the useAuth hook
  const { user, isLoading, error: authError } = useAuth();

  // No need for a separate 'error' variable if just using authError

  return (
    // Apply page container and specific profile page classes
    <div className="page-container profile-page">
      <h1 style={{ textAlign: 'center' }}>Your Profile</h1>

      {/* Display loading message while auth context is loading */}
      {isAuthLoading && <div className="loading-message">Loading Profile...</div>}

      {/* Display error message directly from auth context if it exists */}
      {authError && <div className="error-message">{authError}</div>}

      {/* Display the profile card ONLY if:
          - Not loading
          - No auth error occurred
          - User data actually exists */}
      {!isAuthLoading && !authError && user && (
        <ProfileCardDisplay user={user} />
      )}

       {/* Edge case: Handle if loading is done, no error, but user is still null */}
       {!isAuthLoading && !authError && !user && (
           <div className="error-message">Could not load user profile data. Please try logging in again.</div>
       )}
    </div>
  );
};

export default ProfilePage;