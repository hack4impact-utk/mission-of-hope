'use client';

import { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import './styles.css';

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [highValue, setHigh] = useState('');
  const [lowValue, setLow] = useState('');
  return (
    <>
      <div className="topBar"></div>
      <div className="title">
        <h1>Add Donation Item</h1>
      </div>
      <div className="vector">{/* vector as seen on figma */}</div>
      <div className="form-container">
        <Grid container spacing={3} justifyContent="left">
          {/* each grid item gets an xs and an sm value for grid position.*/}
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="itemName"
              label="Item Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Grid>
          {/* May need to convert to dropdown later */}
          <Grid item xs={12}>
            <TextField
              required
              id="Category"
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
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
              onChange={(e) => setHigh(e.target.value)}
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
              onChange={(e) => setLow(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className="submit-button"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ height: '56px', textTransform: 'none' }}
            >
              Add Donation Item
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddItemForm;
