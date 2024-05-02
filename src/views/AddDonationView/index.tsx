'use client';
import AutofillDonorEmail from '@/components/AutofillDonorEmail';
import { DonationFormData } from '@/types/forms/donation';
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
): number {
  const numberValue = Number(value);
  // Validate high and low values
  if (numberValue < 0 || isNaN(numberValue)) {
    setError('value must be a positive number');
    return numberValue;
  } else {
    setError('');
  }

  const formattedValue = Number(numberValue.toFixed(2));
  return formattedValue;
}

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
}

export default function AddDonationView({
  donorOptions,
}: AddDonationViewProps) {
  const [donationData, setDonationData] = useState<DonationFormData>(
    {} as DonationFormData
  );
  const [prevDonated, setPrevDonated] = useState(false);
  const [highOrLow, setHighOrLow] = useState('');
  const [priceError, setPriceError] = useState('');

  const handleDonorSelect = (selectedDonor: DonorResponse) => {
    setDonationData({
      ...donationData,
      donorFirstName: selectedDonor.firstName ?? '',
      donorLastName: selectedDonor.lastName ?? '',
      donorAddress: selectedDonor.address ?? '',
      donorCity: selectedDonor.city ?? '',
      donorEmail: selectedDonor.email ?? '',
      donorState: selectedDonor.state ?? '',
      donorzip: selectedDonor.zip ?? 0,
    });
    console.log('donor data', donationData, 'date', donationData.donationDate);
  };

  const handleAddDonation = () => {
    alert('Donation added successfully!');
    setDonationData({} as DonationFormData);
  };

  const handleAddDonor = async () => {
    // If donor has previously donated, don't add them to the database
    if (prevDonated) return;

    const donor = {
      firstName: donationData.donorFirstName,
      lastName: donationData.donorLastName,
      email: donationData.donorEmail,
      address: donationData.donorAddress,
      state: donationData.donorState,
      city: donationData.donorCity,
      zip: donationData.donorzip,
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
        setDonationData({} as DonationFormData);
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
            value={donationData.donationDate ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const date = new Date(e.target.value).toISOString().split('T')[0];
              setDonationData({
                ...donationData,
                // convert to date type
                donationDate: date as unknown as Date,
              });
              console.log(
                'date',
                new Date(e.target.value).toISOString().split('T')[0]
              );
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
            value={donationData.category ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({ ...donationData, category: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donated Item"
            value={donationData.donatedItemName ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                donatedItemName: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Quantity"
            type="number"
            value={donationData.quantity ?? 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                quantity: Number(e.target.value),
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>New or Used</InputLabel>
            <Select
              value={donationData.newOrUsed ?? ''}
              onChange={(e) => {
                setDonationData({ ...donationData, newOrUsed: e.target.value });
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
            value={highOrLow ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setHighOrLow(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            error={!!priceError}
            id="price"
            label="Price"
            type="number"
            value={donationData.price ?? 0}
            helperText={priceError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                price: Number(e.target.value),
              });
            }}
            onBlur={(e) =>
              setDonationData({
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
            value={donationData.user ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({ ...donationData, user: e.target.value });
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
              value={prevDonated ? 'yes' : 'no'}
              onChange={(e) => {
                setPrevDonated(e.target.value === 'yes');
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
            value={`${donationData.donorFirstName || ''} ${
              donationData.donorLastName || ''
            }`}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                donorFirstName: e.target.value.split(' ')[0],
                donorLastName: e.target.value.split(' ')[1],
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Address"
            value={donationData.donorAddress ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                donorAddress: e.target.value,
              });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id="outlined-required"
            label="City"
            value={donationData.donorCity ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({ ...donationData, donorCity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="State"
            value={donationData.donorState ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({ ...donationData, donorState: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Zip"
            value={donationData.donorzip ?? 0}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                donorzip: Number(e.target.value),
              });
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
