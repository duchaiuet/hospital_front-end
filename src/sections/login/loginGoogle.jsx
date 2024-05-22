import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '447499911959-09kgl3k46d3094ku9e0aikfo09ueiclu.apps.googleusercontent.com';

const LoginGoogelComponent = () => {
  const [key, setKey] = useState(0);
  const onSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log('decoded: ', decoded);
    setKey((prevKey) => prevKey + 1);
  };

  const onError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        key={key}
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onError={onError}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
};

export default LoginGoogelComponent;
