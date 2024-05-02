import * as React from 'react';
import Button from '@mui/material/Button';

export default function Home() {
  return (
    <>
      <div
        className="text-weight"
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: '10px',
        }}
      >
        <img
          className="rounded-md"
          alt="logo"
          src="https://missionofhope.org/wp-content/uploads/2023/04/cropped-MOH-Logo-768x393.png"
          width="180"
          height="100"
          style={{ marginRight: '50px' }} // Add spacing between the image and links
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
          <Button
            href="./"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Home
          </Button>
          <Button
            href="./donationItem"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Resources
          </Button>
          <Button
            href="./user"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            User
          </Button>
          <Button
            href="./donationItem"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Inventory Management
          </Button>
        </div>
      </div>
    </>
  );
}
