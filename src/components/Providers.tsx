'use client';
import { SnackbarProvider } from '@/hooks/useSnackbar';
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { ConfirmProvider } from 'material-ui-confirm';
//import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

// Returning the next auth provider
interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    //<SessionProvider>
    //<LocalizationProvider dateAdapter={AdapterDayjs}>
    //<ConfirmProvider>
    <SnackbarProvider>{props.children}</SnackbarProvider>
    //</ConfirmProvider>
    //</LocalizationProvider>
    //</SessionProvider>
  );
};

export default Providers;
