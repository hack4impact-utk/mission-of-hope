'use client';

import { Card, Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image';
import logo from '/public/cropped-MOH-Logo-768x393.png';
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
        padding: 5,
      }}
    >
      <Image
        priority={true}
        className="rounded-md"
        alt="logo"
        src={logo}
        style={{
          width: '50%', // 768px
          height: 'auto', // 393px
        }}
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
