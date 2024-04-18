import * as React from 'react';
import Link from '@mui/material/Link';

export default function NavBar() {
  return (
    <>
      <div
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
          style={{ marginRight: '100px' }} // Add spacing between the image and links
        />

        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '100px' }}
        >
          <Link href="./donor" style={{ color: 'black', fontSize: '40px' }}>
            Donor
          </Link>
          <Link href="./user" style={{ color: 'black', fontSize: '40px' }}>
            User
          </Link>
          <Link href=".item" style={{ color: 'black', fontSize: '40px' }}>
            Items
          </Link>
          <Link
            href="./donationItem"
            style={{ color: 'black', fontSize: '40px' }}
          >
            Donation Items
          </Link>
          <Link href="./donation" style={{ color: 'black', fontSize: '40px' }}>
            Donation
          </Link>
        </div>
      </div>
    </>
  );
}
