import React from 'react';
import {
  FormControl,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
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
      <div className="form-container">
        <form>
          <TextField
            id="donorName"
            label="Donor Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            type="date"
            id="donationDate"
            label="Donation Date"
            variant="outlined"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="donatedItem"
            label="Donated Item"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="itemValue"
            label="Item Value"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            type="number"
            id="quantity"
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="donationValue"
            label="Donation Value"
            variant="outlined"
            fullWidth
            margin="normal"
          />

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

          <TextField
            id="user"
            label="User"
            variant="outlined"
            fullWidth
            margin="normal"
          />

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

          {/* Repeat the TextField pattern for the new donor fields */}
          <TextField
            type="email"
            id="donorEmail"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            type="tel"
            id="donorPhone"
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="donorAddress"
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="donorCity"
            label="City"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="donorState"
            label="State"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <TextField
            id="donorZip"
            label="Zip Code"
            variant="outlined"
            fullWidth
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="submit-button"
          >
            Add Donation
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddDonationForm;
