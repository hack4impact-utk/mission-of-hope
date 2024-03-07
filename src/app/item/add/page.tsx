import React from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import './styles.css';

const AddDonationForm = () => {
  return (
    <>
      <div className="topBar"></div>
      <div className="title">
        <h1>Add Donation</h1>
      </div>
      <div className="form-container">
        <form>
          <FormControl>
            <InputLabel htmlFor="donorName">Donor Name</InputLabel>
            <Input id="donorName" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="donationDate">Donation Date</InputLabel>
            <Input type="date" id="donationDate" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="category">Category</InputLabel>
            <Input id="category" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="donatedItem">Donated Item</InputLabel>
            <Input id="donatedItem" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="itemValue">Item Value</InputLabel>
            <Input id="itemValue" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="quantity">Quantity</InputLabel>
            <Input type="number" id="quantity" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="donationValue">Donation Value</InputLabel>
            <Input id="donationValue" />
          </FormControl>

          <FormControl>
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

          <FormControl>
            <InputLabel htmlFor="user">User</InputLabel>
            <Input id="user" />
          </FormControl>

          <FormControl>
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
          <FormControl>
            <InputLabel htmlFor="donorEmail">Email</InputLabel>
            <Input type="email" id="donorEmail" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="donorPhone">Phone</InputLabel>
            <Input type="tel" id="donorPhone" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="donorAddress">Address</InputLabel>
            <Input id="donorAddress" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="donorCity">City</InputLabel>
            <Input id="donorCity" />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="donorState">State</InputLabel>
            <Input id="donorState" />
          </FormControl>

          <FormControl>
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
    </>
  );
};

export default AddDonationForm;
