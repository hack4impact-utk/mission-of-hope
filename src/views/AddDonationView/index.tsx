'use client';
import AutofillDonorEmail from '@/components/AutofillDonorEmail';
import { DonorResponse } from '@/types/persons';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function getPriceFormatted(
  value: string,
  setError: (error: string) => void
): string {
  // Validate high and low values
  if (Number(value) < 0 || isNaN(Number(value))) {
    setError('value must be a positive number');
    return value;
  } else {
    setError('');
  }

  const formattedValue = Number(value).toFixed(2);
  return formattedValue.toString();
}

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
}

export default function AddDonationView({
  donorOptions,
}: AddDonationViewProps) {
  const [donationData, setDonorData] = useState({
    donorName: '',
    donorEmail: '',
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
  const [priceError, setPriceError] = useState('');

  const handleDonorSelect = (selectedDonor: DonorResponse) => {
    setDonorData({
      ...donationData,
      donorName: `${selectedDonor.firstName} ${selectedDonor.lastName}`,
      donorAddress: selectedDonor.address,
      donorCity: selectedDonor.city,
      donorEmail: selectedDonor.email,
      donorState: selectedDonor.state,
      donorZip: selectedDonor.zip.toString(),
    });
  };

  const handleAddDonation = () => {
    alert('Donation added successfully!');
    donationData.donationDate = '';
    donationData.donorEmail = '';
    donationData.category = '';
    donationData.donatedItem = '';
    donationData.quantity = '';
    donationData.alertQuantity = '';
    donationData.newOrUsed = '';
    donationData.price = '';
    donationData.prevDonated = false;
    donationData.user = '';
    donationData.donorName = '';
    donationData.donorAddress = '';
    donationData.donorCity = '';
    donationData.donorState = '';
    donationData.donorZip = '';
  };

  const handleAddDonor = async () => {
    // If donor has previously donated, don't add them to the database
    if (donationData.prevDonated) return;

    const nameParts = donationData.donorName.split(' ');
    const donor = {
      firstName: nameParts[0],
      lastName: nameParts[1] || '',
      email: donationData.donorEmail,
      address: donationData.donorAddress,
      state: donationData.donorState,
      city: donationData.donorCity,
      zip: Number(donationData.donorZip),
    };

    try {
      // fetch request to add donor
      const donorRes = await fetch('/api/donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donor),
      });

      if (donorRes.ok) {
        console.log('Donor added successfully');
        donationData.donationDate = '';
        donationData.donorEmail = '';
        donationData.category = '';
        donationData.donatedItem = '';
        donationData.quantity = '';
        donationData.alertQuantity = '';
        donationData.newOrUsed = '';
        donationData.price = '';
        donationData.prevDonated = false;
        donationData.user = '';
        donationData.donorName = '';
        donationData.donorAddress = '';
        donationData.donorCity = '';
        donationData.donorState = '';
        donationData.donorZip = '';
      } else {
        console.log('Error adding donor, status:', donorRes.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            value={donationData.donationDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, donationDate: e.target.value });
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
            value={donationData.category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, category: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donated Item"
            value={donationData.donatedItem}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, donatedItem: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Quantity"
            type="number"
            value={donationData.quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, quantity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>New or Used</InputLabel>
            <Select
              value={donationData.newOrUsed}
              onChange={(e) => {
                setDonorData({ ...donationData, newOrUsed: e.target.value });
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
            value={donationData.alertQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, alertQuantity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            error={!!priceError}
            id="price"
            label="Price"
            type="number"
            defaultValue="0.00"
            value={donationData.price}
            helperText={priceError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, price: e.target.value });
            }}
            onBlur={(e) =>
              setDonorData({
                ...donationData,
                price: getPriceFormatted(e.target.value, setPriceError),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={8} sm={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="User"
            value={donationData.user}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, user: e.target.value });
            }}
          />
        </Grid>

        <Grid item sm={4}>
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: '#379541cc' }}
            onClick={() => [handleAddDonor(), handleAddDonation()]}
          >
            Add Donation
          </Button>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControl fullWidth>
            <InputLabel>Has this donor previously donated?</InputLabel>
            <Select
              value={donationData.prevDonated ? 'yes' : 'no'}
              onChange={(e) => {
                setDonorData({
                  ...donationData,
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
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donor Name"
            value={donationData.donorName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, donorName: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Address"
            value={donationData.donorAddress}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, donorAddress: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id="outlined-required"
            label="City"
            value={donationData.donorCity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, donorCity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="State"
            value={donationData.donorState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({ ...donationData, donorState: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Zip"
            value={donationData.donorZip.toString()}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorData({
                ...donationData,
                donorZip: e.target.value,
              });
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
