import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { getUserByEmail } from 'src/api/login';


const clientId = '447499911959-09kgl3k46d3094ku9e0aikfo09ueiclu.apps.googleusercontent.com';

const LoginGoogelComponent = () => {
  const navigate = useNavigate();
  const onSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    const user = await getUserByEmail(decoded.email, decoded.sub)

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    }
  };

  const onError = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
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
