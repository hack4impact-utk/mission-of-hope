import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import Image from 'next/image';

export default function Navbar() {
  return (
    <>
      <Box height={'100vh'}>
        <Box display={'flex'} justifyContent={'center'} p={2}>
          <Image
            className="rounded-md"
            alt="logo"
            src="/cropped-MOH-Logo-768x393.png"
            width="180"
            height="100"
            // style={{ marginRight: '25px' }} // Add spacing between the image and links
          />
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
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
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            href="/donation/add"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Add Donation
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            href="/donation"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            View Donations
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            href="/donors"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            View Donors
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            href="/donationItem"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Inventory
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            href="/item/add"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Add Evaluation
          </Button>
        </Box>
        <Box display={'flex'} justifyContent={'center'}>
          <Button
            href="/item"
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            View Evaluations
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
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
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
    </>
  );
}
