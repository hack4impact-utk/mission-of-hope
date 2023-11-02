import * as React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Toolbar,
  Button,
  AppBar,
  Typography,
} from '@mui/material';

export default function PageHop() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {' '}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit">Click Here</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box mt={10}>
        <Tooltip title="Don't click this">
          <Button
            color="success"
            variant="contained"
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          >
            Click This
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
