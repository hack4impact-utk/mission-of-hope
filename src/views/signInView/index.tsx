'use client';

import { Card, Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button';

export default function SignInView() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around;',
        alignItems: 'center',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        padding: '10%',
      }}
    >
      <img
        className="rounded-md"
        alt="logo"
        src="https://missionofhope.org/wp-content/uploads/2023/04/cropped-MOH-Logo-768x393.png"
        width="360px"
        height="200px"
        style={{ marginRight: '100px' }}
      />
      <Card
        sx={{
          padding: '2rem 3rem',
          color: '#144D29',
          background: '#ABABAB4D',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '25%',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 'bold',
            display: 'flex',
          }}
        >
          Sign in with your Google Account
        </Typography>
        <AccountCircleIcon sx={{ color: '#FFFFFF', fontSize: '8rem' }} />
        <GoogleButton
          onClick={() => signIn('google', { callbackUrl: '/' })}
        ></GoogleButton>
      </Card>
    </Box>
  );
}
