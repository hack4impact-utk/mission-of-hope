import { Card, Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function signIn() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
      }}
    >
      <Box>
        <img
          className="rounded-md"
          alt="logo"
          src="https://missionofhope.org/wp-content/uploads/2023/04/cropped-MOH-Logo-768x393.png"
          width="360px"
          height="200px"
          style={{ marginRight: '100px' }}
        />
      </Box>
      <Card
        sx={{
          padding: '2rem 3rem',
          color: '#144D29',
          background: '#ABABAB4D',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '35vw',
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Sign in with your Google Account
        </Typography>
        <AccountCircleIcon sx={{ color: '#FFFFFF', fontSize: '10rem' }} />
      </Card>
    </Box>
  );
}
