import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Link from 'next/link';

export default function SimplePage() {
  return (
    <>
      <h1>This is a simple page</h1>
      <Link href="https://www.google.com">Here is a link to google</Link>

      <Box sx={{ width: 300 }}>
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
        />
      </Box>
    </>
  );
}
