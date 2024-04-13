'use client';
import React from 'react';

import { AppBar, Link } from '@mui/material';

const TopBar: React.FC = () => {
  return (
    <AppBar
      sx={{
        width: '100%',
        height: '10vh',
        backgroundColor: '#379541cc',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center', // vertically center the icon
        alignItems: 'flex-end', // right justify the icon
        p: 2, // add some space between icon and bar
      }}
    >
      <Link href="/login">
        <svg
          width="56"
          height="57"
          viewBox="0 0 56 57"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.1841 45.8055C47.7698 45.6813 48.1181 45.0723 47.8818 44.5222C46.5492 41.42 44.084 38.6901 40.784 36.6855C37.1165 34.4576 32.6228 33.25 28 33.25C23.3772 33.25 18.8836 34.4576 15.216 36.6855C11.916 38.6901 9.45082 41.42 8.11826 44.5222C7.88197 45.0723 8.23024 45.6813 8.81589 45.8055L19.6996 48.1143C25.1723 49.2752 30.8277 49.2752 36.3004 48.1143L47.1841 45.8055Z"
            fill="white"
          />
          <ellipse cx="27.9999" cy="19" rx="11.6667" ry="11.875" fill="white" />
        </svg>
      </Link>
    </AppBar>
  );
};

export default TopBar;
