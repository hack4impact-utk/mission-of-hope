'use client';
import { SnackbarProvider } from '@/hooks/useSnackbar';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: ReactNode;
}

const Providers = (props: Props) => {
  return (
    <SessionProvider>
      <SnackbarProvider>{props.children}</SnackbarProvider>
    </SessionProvider>
  );
};

export default Providers;
