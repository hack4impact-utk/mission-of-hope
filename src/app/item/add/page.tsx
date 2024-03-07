import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import './styles.css'; // Make sure the path is correct

const AddDonationForm = () => {
  return (
    <div className="form-container">
      <h2>Add Donation</h2>
      <form>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donorName">Donor Name</InputLabel>
          <Input id="donorName" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donationDate">Donation Date</InputLabel>
          <Input type="date" id="donationDate" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="category">Category</InputLabel>
          <Input id="category" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donatedItem">Donated Item</InputLabel>
          <Input id="donatedItem" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="itemValue">Item Value</InputLabel>
          <Input id="itemValue" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="quantity">Quantity</InputLabel>
          <Input type="number" id="quantity" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donationValue">Donation Value</InputLabel>
          <Input id="donationValue" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="highOrLowValue-label">High or Low Value</InputLabel>
          <Select
            labelId="highOrLowValue-label"
            id="highOrLowValue"
            displayEmpty
            value=""
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="user">User</InputLabel>
          <Input id="user" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="hasDonatedBefore-label">
            Has this donor previously donated?
          </InputLabel>
          <Select
            labelId="hasDonatedBefore-label"
            id="hasDonatedBefore"
            displayEmpty
            value=""
          >
            <MenuItem value="" disabled>
              Select
            </MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>

        {/* Repeat the FormControl pattern for the new donor fields */}
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donorEmail">Email</InputLabel>
          <Input type="email" id="donorEmail" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donorPhone">Phone</InputLabel>
          <Input type="tel" id="donorPhone" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donorAddress">Address</InputLabel>
          <Input id="donorAddress" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donorCity">City</InputLabel>
          <Input id="donorCity" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donorState">State</InputLabel>
          <Input id="donorState" />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="donorZip">Zip Code</InputLabel>
          <Input id="donorZip" />
        </FormControl>

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
  );
};

export default AddDonationForm;
