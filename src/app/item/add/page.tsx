'use client';

import { useState } from 'react';
import { Grid, TextField, Button, Typography, Box } from '@mui/material';

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [highValue, setHighValue] = useState('');
  const [lowValue, setLowValue] = useState('');

  return (
    <Box>
      <Box
        sx={{ width: '100%', height: 82, backgroundColor: '#379541cc' }}
      ></Box>
      <Box sx={{ display: 'flex', alignItems: 'center', height: 100, pl: 7 }}>
        <Typography variant="h4">Add Item</Typography>
      </Box>
      <Box sx={{ width: '100%', border: '1px solid rgba(118, 118, 118, 0.5)' }}>
        {/* vector as seen on figma */}
      </Box>
      <Box
        sx={{ p: 5, m: 7, boxShadow: '4px 4px 4px 4px rgba(0, 0, 0, 0.25)' }}
      >
        <Grid container spacing={3} justifyContent="flex-start">
          <Grid item xs={12}>
            <TextField
              required
              label="Item Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {/* Consider using Select component here for dropdown */}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              id="highValue"
              label="High Value"
              variant="outlined"
              fullWidth
              margin="normal"
              value={highValue}
              // now sets value to 0 if input is negative
              onChange={(e) =>
                setHighValue(Number(e.target.value) < 0 ? '0' : e.target.value)
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              id="lowValue"
              label="Low Value"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lowValue}
              onChange={(e) =>
                setLowValue(Number(e.target.value) < 0 ? '0' : e.target.value)
              }
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                height: 56,
                textTransform: 'none',
                mt: 2,
                fontSize: 'large',
                backgroundColor: 'rgba(55, 149, 65, 0.8)',
              }}
            >
              Add Donation Item
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddItemForm;
