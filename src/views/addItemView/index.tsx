'use client';
import TopBar from '@/components/top-bar';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function AddItemView() {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [highValue, setHighValue] = useState('');
  const [lowValue, setLowValue] = useState('');
  const [highValueError, setHighValueError] = useState('');
  const [lowValueError, setLowValueError] = useState('');

  const formatPriceFields = (
    value: string,
    setValue: (value: string) => void,
    setError: (error: string) => void
  ): void => {
    // Validate high and low values
    if (Number(value) < 0 || isNaN(Number(value))) {
      setError('value must be a positive number');
      return;
    } else {
      setError('');
    }

    const formattedValue = Number(value).toFixed(2);
    setValue(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    const requestData = {
      name: itemName,
      category: category,
      high: Number(highValue),
      low: Number(lowValue),
    };

    try {
      // Send POST request to add item
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      // Check if response is successful
      if (response.ok) {
        // Handle successful response
        alert('Item added successfully');
        // Reset form fields
        setItemName('');
        setCategory('');
        setHighValue('');
        setLowValue('');
      } else {
        // Handle error response
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <TopBar />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 100,
          pl: 7,
          mt: '10vh',
        }}
      >
        <Typography variant="h4" sx={{ pl: 5 }}>
          Add Item
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          border: '1px solid rgba(118, 118, 118, 0.5)',
          position: 'absolute',
          left: 0,
          right: 0,
        }}
      >
        {/* vector as seen on figma */}
      </Box>
      <Box sx={{ p: 5, m: 7, boxShadow: 4 }}>
        <form onSubmit={handleSubmit}>
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
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="highValue">High Value</InputLabel>
                <OutlinedInput
                  error={!!highValueError}
                  label="High Value"
                  id="highValue"
                  type="number"
                  value={highValue}
                  onChange={(e) => setHighValue(e.target.value)}
                  onBlur={(e) =>
                    formatPriceFields(
                      e.target.value,
                      setHighValue,
                      setHighValueError
                    )
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
                {highValueError && (
                  <Typography variant="caption" color="error">
                    {highValueError}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="lowValue">Low Value</InputLabel>
                <OutlinedInput
                  error={!!lowValueError}
                  label="Low Value"
                  id="lowValue"
                  type="number"
                  value={lowValue}
                  onChange={(e) => setLowValue(e.target.value)}
                  onBlur={(e) =>
                    formatPriceFields(
                      e.target.value,
                      setLowValue,
                      setLowValueError
                    )
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
                {lowValueError && (
                  <Typography variant="caption" color="error">
                    {lowValueError}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={highValueError || lowValueError ? true : false}
                sx={{
                  height: 56,
                  textTransform: 'none',
                  fontSize: 'large',
                  backgroundColor: 'rgba(55, 149, 65, 0.8)',
                }}
              >
                Add Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
