import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

export default function Navbar() {
  return (
    <>
      <Box>
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
            style={{ marginRight: '25px' }} // Add spacing between the image and links
          />
        </div>

        <div style={{ marginLeft: '50px', display: 'flex' }}>
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
        </div>

        <div style={{ marginLeft: '10px', display: 'flex' }}>
          <Button
            href="/donation"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Add Donation
          </Button>
        </div>

        <div style={{ marginLeft: '45px', display: 'flex' }}>
          <Button
            href="/donationItem"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            History
          </Button>
        </div>

        <div style={{ marginLeft: '45px', display: 'flex' }}>
          <Button
            href="./"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Trends
          </Button>
        </div>
      </Box>
      <Divider orientation="vertical" flexItem />
    </>
  );
}
