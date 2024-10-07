import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import Image from 'next/image';

import HomeIcon from '@mui/icons-material/Home';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddIcon from '@mui/icons-material/Add';
import RedeemIcon from '@mui/icons-material/Redeem';
import BallotIcon from '@mui/icons-material/Ballot';
import InventoryIcon from '@mui/icons-material/Inventory';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import GroupIcon from '@mui/icons-material/Group';

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

        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="./"
            startIcon={<HomeIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Home
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="/donation/add"
            startIcon={<AddIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Add Donation
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="/donation"
            startIcon={<RedeemIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Donations
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="/donors"
            startIcon={<BallotIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Donors
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="/donationItem"
            startIcon={<InventoryIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Inventory
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="/item/add"
            startIcon={<AddBoxIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Add Evaluation
          </Button>
        </Box>
        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="/item"
            startIcon={<BallotIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Evaluations
          </Button>
        </Box>

        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="./"
            startIcon={<SsidChartIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Trends
          </Button>
        </Box>
        <Box display={'flex'} justifyContent={'flex-start'} p={2}>
          <Button
            href="/user"
            startIcon={<GroupIcon />}
            style={{
              color: '#ff8a65',
              fontSize: '25px',
              textTransform: 'none',
            }}
          >
            Users
          </Button>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
    </>
  );
}
