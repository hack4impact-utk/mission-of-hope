import React from 'react';
import {
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from '@mui/material';
import './styles.css';

const AddDonationForm = () => {
  return (
    <>
      <div className="topBar"></div>
      <div className="title">
        <h1>Add Donation</h1>
      </div>
      <div className="vector"></div>
      <Grid
        container
        spacing={3}
        className="form-container"
        justifyContent="center"
      >
        <Grid item xs={12} sm={6}>
          <TextField
            id="donorName"
            label="Donor Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            id="donationDate"
            label="Donation Date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="donatedItem"
            label="Donated Item"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="number"
            id="quantity"
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="itemValue"
            label="Item Value"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="donationValue"
            label="Donation Value"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="highOrLowValue-label">High or Low Value</InputLabel>
            <Select
              labelId="highOrLowValue-label"
              id="highOrLowValue"
              label="High or Low Value"
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="user"
            label="User"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-button"
          >
            Add Donation
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="hasDonatedBefore-label">
              Has this donor previously donated?
            </InputLabel>
            <Select
              labelId="hasDonatedBefore-label"
              id="hasDonatedBefore"
              label="Has this donor previously donated?"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="email"
            id="donorEmail"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type="tel"
            id="donorPhone"
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="donorAddress"
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="donorCity"
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="donorState"
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="donorZip"
            label="Zip Code"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AddDonationForm;
