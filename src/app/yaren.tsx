import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Header App Bar
          </Typography>
          <Button color="inherit">Sign In</Button>
        </Toolbar>
      </AppBar>

      <Box mt={10}>
        <Button
          color="success"
          variant="contained"
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        >
          Click Here
        </Button>
      </Box>
    </Box>
  );
}
