import { jwtDecode } from 'jwt-decode';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '447499911959-09kgl3k46d3094ku9e0aikfo09ueiclu.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/userinfo.profile';

const LoginComponent = () => {
  const [user, setUser] = useState({});
  useEffect(() => {}, [user]);

  const getInfomation = async (email) => {
    await fetch(`http://localhost:3000/user?email=${email}`)
      .then((response) => {
        if (response.ok) {
          setKey((prevKey) => prevKey + 1);
          return response.json();
        }
        toast.error('login failded');
        throw new Error('Failed to fetch user data');
      })
      .then((data) => {
        setUser(data);
        toast.success('login successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const [key, setKey] = useState(0);
  const onSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    console.log('email: ', decoded);
    await getInfomation(decoded.email);
    setUser((prevUser) => prevUser);
  };

  const onError = (error) => {};

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          key={key}
          clientId={clientId}
          buttonText="Login with Google"
          onSuccess={onSuccess}
          scope={scope}
          onError={onError}
          useOneTap
        />
      </GoogleOAuthProvider>
      <ToastContainer />
    </>
  );
};

export default LoginComponent;
