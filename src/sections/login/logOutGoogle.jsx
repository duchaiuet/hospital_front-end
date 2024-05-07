import React from 'react';
import { GoogleLogoutButton } from '@react-oauth/google';

const LogoutGoogle = () => {
  const handleLogoutSuccess = () => {
    console.log('Logged out successfully');
    // Handle successful logout here
  };

  const handleLogoutFailure = (error) => {
    console.error('Logout failed: ', error);
    // Handle failed logout
  };

  return (
    <div>
      <GoogleLogoutButton
        onLogoutSuccess={handleLogoutSuccess}
        onLogoutFailure={handleLogoutFailure}
      />
    </div>
  );
};

export default LogoutGoogle;
