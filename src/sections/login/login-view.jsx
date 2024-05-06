import { gapi, google } from 'gapi-script';
import React, { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const [googleClient, setGoogleClient] = useState < google.accounts.oauth2.OAuth2Client > null;

  const initGoogleClient = useCallback(() => {
    const client = google.accounts.oauth2.initCodeClient({
      client_id: '447499911959-09kgl3k46d3094ku9e0aikfo09ueiclu.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.email',
      ux_mode: 'popup',
      callback: (response) => {
        if (response.error) {
          console.error('Login Failed:', response.error);
        } else {
          // Handle the successful login response here
          console.log('Login Success:', response);
        }
      },
    });

    setGoogleClient(client);
  }, [googleClient, setGoogleClient]);

  const handleGoogleLogin = useCallback(() => {
    if (googleClient) {
      googleClient.requestAccessToken();
    }
  }, [googleClient]);

  useEffect(() => {
    const initClient = () => {
      gapi.load('client:auth2', initGoogleClient);
    };

    gapi.load('client:auth2', initClient);
  }, [initGoogleClient]);

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography sx={{ mb: 3 }} variant="h4">
            Đăng Nhập
          </Typography>

          {renderForm}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              onClick={handleGoogleLogin}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
