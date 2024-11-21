'use client';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import React from 'react';

export default function SettingsView() {
  return (
    <Grid2 container>
      <Grid2 xs={12} sx={{ mb: 3 }}>
        <Typography variant="h3">Settings</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="h6">Admins</Typography>
      </Grid2>

      <Grid2 xs={12} md={6}>
        should display list of admins
      </Grid2>
      <Grid2 xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Add admins</Typography>
      </Grid2>
      <Grid2 xs={12} md={6} sx={{ mt: 1 }}>
        place to add admins
      </Grid2>
      <Grid2 xs={12} sx={{ mt: 3 }}>
        <Typography variant="h6">Users</Typography>
      </Grid2>
      <Grid2 xs={12} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Emails allowed to log in</Typography>
      </Grid2>
      <Grid2 xs={12}>
        <Typography variant="caption" color="textSecondary">
          placeholder
        </Typography>
      </Grid2>
      <Grid2 xs={12} md={6} sx={{ mt: 1 }}>
        placeholder
      </Grid2>
      <Grid2 xs={12} sx={{ mt: 2 }}>
        Save
      </Grid2>
    </Grid2>
  );
}
