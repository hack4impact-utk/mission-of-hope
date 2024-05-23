'use client';
import useSnackbar from '@/hooks/useSnackbar';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function SettingsView() {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const { showSnackbar } = useSnackbar();

  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInfo({ ...userInfo, firstName: event.target.value });
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, lastName: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, email: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Make an API call to update the user's information
      const response = await fetch('/api/settings', {
        method: 'PUT',
        body: JSON.stringify({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        showSnackbar('Failed to update user information', 'error');
        throw new Error("Failed to update user's information");
      }

      const data = await response.json();
      console.log(data); // TODO: Logging response data for now
      showSnackbar('User information updated successfully', 'success');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        margin: '20px',
        border: '1px solid #00000030',
        borderRadius: '10px',
        width: '40%',
        boxShadow: '0px 4px 4px 0px #00000040',
      }}
    >
      <Typography variant="h4">Settings</Typography>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            variant="outlined"
            value={userInfo.firstName}
            onChange={handleFirstNameChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            variant="outlined"
            value={userInfo.lastName}
            onChange={handleLastNameChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={11.2}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={userInfo.email}
            onChange={handleEmailChange}
            margin="normal"
          />
        </Grid>
        {/* Admin boolean cannot be edited */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#7ca86f',
            color: 'white',
            marginTop: '20px',
            marginLeft: '10px',
          }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
      </Grid>
    </Box>
  );
}
