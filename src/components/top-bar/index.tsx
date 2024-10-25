import React from 'react';

import { AppBar } from '@mui/material';
import AccountMenu from '../AccountMenu';

const TopBar: React.FC = () => {
  return (
    <AppBar
      sx={{
        width: '100%',
        height: '10vh',
        backgroundColor: '#379541cc',
        position: 'static',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center', // vertically center the icon
        alignItems: 'flex-end', // right justify the icon
        p: 2, // add some space between icon and bar
      }}
    >
      <AccountMenu />
    </AppBar>
  );
};

export default TopBar;
