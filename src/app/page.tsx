import * as React from 'react';
import Link from '@mui/material/Link';
import '../server/actions/donations';

export default function Home() {
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
          <Link href="./Home" style={{ color: 'black', fontSize: '40px' }}>
            Home
          </Link>
          <Link href="./Donor" style={{ color: 'black', fontSize: '40px' }}>
            Resources
          </Link>
          <Link href="./User" style={{ color: 'black', fontSize: '40px' }}>
            User
          </Link>
          <Link href="./Item" style={{ color: 'black', fontSize: '40px' }}>
            Inventory
          </Link>
        </div>
      </div>
      <div
        style={{
          width: '550px',
          backgroundColor: '#f4f4f4',
          marginLeft: '380px',
          marginTop: '150px',
        }}
      >
        <a
          style={{ color: 'black', justifyContent: 'center', fontSize: '80px' }}
        >
          {' '}
          Mission of Hope{' '}
        </a>
      </div>
    </>
  );
}
