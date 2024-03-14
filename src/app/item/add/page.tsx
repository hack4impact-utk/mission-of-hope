'use client';

import { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import './styles.css';

const AddItemForm = () => {
  // Example state for item reference, could be replaced by actual item fetching and selection mechanism
  const [itemRef, setItemRef] = useState('');
  const [quantity, setQuantity] = useState('');
  const [barcodes, setBarcodes] = useState('');
  const [price, setPrice] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [inRange, setInRange] = useState('');

  return (
    <>
      <div className="topBar"></div>
      <div className="title">
        <h1>Add Donation Item</h1>
      </div>
      <div className="vector">{/* vector as seen on figma */}</div>
      <div className="form-container">
        <Grid container spacing={3} justifyContent="left">
          <Grid item xs={12} sm={9}>
            <TextField
              id="itemRef"
              label="Item Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={itemRef}
              onChange={(e) => setItemRef(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="number"
              id="quantity"
              label="Quantity"
              variant="outlined"
              fullWidth
              margin="normal"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="barcode"
              label="Barcode"
              variant="outlined"
              fullWidth
              margin="normal"
              value={barcodes}
              onChange={(e) => setBarcodes(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="number"
              id="price"
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="evaluation-label">Evaluation</InputLabel>
              <Select
                labelId="evaluation-label"
                id="evaluation"
                value={evaluation}
                label="Evaluation"
                onChange={(e) => setEvaluation(e.target.value)}
              >
                {['high', 'low'].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="inRange-label">
                Price in Expected Range
              </InputLabel>
              <Select
                labelId="inRange-label"
                id="inRange"
                value={inRange}
                label="Price in Expected Range"
                onChange={(e) => setInRange(e.target.value)}
              >
                {['Yes', 'No'].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
