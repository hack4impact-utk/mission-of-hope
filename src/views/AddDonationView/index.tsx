'use client';
import AutofillDonorEmail from '@/components/AutofillDonorEmail';
import { DonorResponse } from '@/types/persons';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
}

export default function AddDonationView({
  donorOptions,
}: AddDonationViewProps) {
  const [donorData, setDonorData] = useState({
    donorName: '',
    donationDate: '',
    category: '',
    donatedItem: '',
    quantity: '',
    alertQuantity: '',
    newOrUsed: '',
    price: '',
    prevDonated: false,
    user: '',
    donorAddress: '',
    donorCity: '',
    donorState: '',
    donorZip: '',
  });

  const handleDonorSelect = (selectedDonor: DonorResponse) => {
    setDonorData({
      ...donorData,
      donorName: `${selectedDonor.firstName} ${selectedDonor.lastName}`,
      donorAddress: selectedDonor.address,
      donorCity: selectedDonor.city,
      donorState: selectedDonor.state,
      donorZip: selectedDonor.zip.toString(),
    });
  };

  const handleAddDonation = () => {
    alert('Donation added successfully!');
  };

  return (
    <Box
      sx={{
        padding: '20px',
        margin: '20px',
        border: '1px solid #00000030',
        borderRadius: '10px',
        width: '60%',
        boxShadow: '0px 4px 4px 0px #00000040',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
        Add Donations
      </Typography>
      <hr />
      <Grid container spacing={2} sx={{ mt: 4, pl: 2, pr: 2 }}>
        <Grid item sm={8}>
          <AutofillDonorEmail
            DonorOptions={donorOptions}
            onDonorSelect={handleDonorSelect}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donation Date"
            type="date"
            value={donorData.donationDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donationDate: e.target.value });
            }}
            InputLabelProps={{
              shrink: true,
              style: { paddingRight: '10px' },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Category"
            value={donorData.category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, category: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donated Item"
            value={donorData.donatedItem}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donatedItem: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Quantity"
            type="number"
            value={donorData.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, quantity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>New or Used</InputLabel>
            <Select
              value={donorData.newOrUsed}
              onChange={(e) => {
                setDonorData({ ...donorData, newOrUsed: e.target.value });
              }}
              label="New or Used"
              id="new-or-used"
            >
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="used">Used</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="High or Low Value"
            value={donorData.alertQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, alertQuantity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Price"
            type="number"
            value={donorData.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, price: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={8} sm={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="User"
            value={donorData.user}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, user: e.target.value });
            }}
          />
        </Grid>

        <Grid item sm={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: '#379541cc' }}
            onClick={handleAddDonation}
          >
            Add Donation
          </Button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControl fullWidth>
            <InputLabel>Has this donor previously donated?</InputLabel>
            <Select
              value={donorData.prevDonated ? 'yes' : 'no'}
              onChange={(e) => {
                setDonorData({
                  ...donorData,
                  prevDonated: e.target.value === 'yes',
                });
              }}
              label="Has this donor previously donated?"
              id="donor-donated"
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {donorData.prevDonated && (
          <Grid item xs={12}>
            <Typography>Please fill out the email before proceeding</Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donor Name"
            value={donorData.donorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorName: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Address"
            value={donorData.donorAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorAddress: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id="outlined-required"
            label="City"
            value={donorData.donorCity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorCity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="State"
            value={donorData.donorState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donorData, donorState: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Zip"
            value={donorData.donorZip.toString()}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({
                ...donorData,
                donorZip: e.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
