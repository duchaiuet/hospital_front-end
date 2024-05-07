import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '447499911959-09kgl3k46d3094ku9e0aikfo09ueiclu.apps.googleusercontent.com'; // Replace with your actual client ID

const LoginComponent = () => {
  const [key, setKey] = useState(0);
  const [isEmailExists, setIsEmailExists] = useState(null);
  const onSuccess = (response) => {
    console.log('response: ', response);
    console.log('Login Successful:');
    setKey((prevKey) => prevKey + 1);
  };

  const onError = (error) => {
    setIsEmailExists(false);
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {isEmailExists === null && (
        <GoogleLogin
          key={key}
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
      {isEmailExists === false && <p>Email does not exist, please try again.</p>}
    </GoogleOAuthProvider>
  );
};

export default LoginComponent;
