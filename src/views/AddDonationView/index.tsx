'use client';
import AutofillDonorEmail from '@/components/AutofillDonorEmail';
import useValidation from '@/hooks/useValidation';
import { DonationFormData, zDonationFormData } from '@/types/forms/donation';
import { DonorFormData, zDonorFormData } from '@/types/forms/donor';
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

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
}

/*
  Function to format the price to 2 decimal places
  @param {string} value - The value to format
  @returns {number} - The formatted value
*/
function getPriceFormatted(value: string): number {
  const numberValue = Number(value);
  // Validate high and low values
  if (numberValue < 0 || isNaN(numberValue)) {
    return numberValue;
  }

  const formattedValue = Number(numberValue.toFixed(2));
  return formattedValue;
}

export default function AddDonationView({
  donorOptions,
}: AddDonationViewProps) {
  const [donationData, setDonationData] = useState<DonationFormData>({
    donationDate: new Date(),
    category: '',
    donatedItemName: '',
    quantity: 0,
    newOrUsed: '',
    price: 0,
    user: '',
  } as DonationFormData);
  const [donorFormData, setDonorFormData] = useState<DonorFormData>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    email: '',
    state: '',
    zip: 0,
  } as DonorFormData);
  const [prevDonated, setPrevDonated] = useState(false);
  const [highOrLow, setHighOrLow] = useState('');

  const { validate: validateDonation } = useValidation(zDonationFormData);
  const { validate: validateDonor } = useValidation(zDonorFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string> | undefined
  >(undefined);

  const handleDonorSelect = (selectedDonor: DonorResponse) => {
    setDonorFormData({
      ...donorFormData,
      firstName: selectedDonor.firstName ?? '',
      lastName: selectedDonor.lastName ?? '',
      address: selectedDonor.address ?? '',
      city: selectedDonor.city ?? '',
      email: selectedDonor.email ?? '',
      state: selectedDonor.state ?? '',
      zip: selectedDonor.zip ?? 0,
    });
  };

  const handleAddDonation = () => {
    const errors = validateDonation(donationData);
    if (errors) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors(undefined);
    alert('Donation added successfully!');
    setDonationData({
      donationDate: new Date(),
      category: '',
      donatedItemName: '',
      quantity: 0,
      newOrUsed: '',
      price: 0,
      user: '',
    } as DonationFormData);
    setHighOrLow('');
  };

  const handleAddDonor = async () => {
    // If donor has previously donated, don't add them to the database
    if (prevDonated) return;

    const donor = {
      firstName: donorFormData.firstName,
      lastName: donorFormData.lastName,
      email: donorFormData.email,
      address: donorFormData.address,
      state: donorFormData.state,
      city: donorFormData.city,
      zip: donorFormData.zip,
    };

    const errors = validateDonor(donorFormData);
    if (errors) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors(undefined);
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
        setDonorFormData({
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          email: '',
          state: '',
          zip: 0,
        } as DonorFormData);
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
            DonorForm={donorFormData}
            onDonorSelect={handleDonorSelect}
            onChange={setDonorFormData}
          />
        </Grid>
        <Grid item sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donation Date"
            type="date"
            value={
              donationData?.donationDate?.toISOString()?.split('T')[0] || ''
            }
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const date = new Date(e.target.value);
              setDonationData({ ...donationData, donationDate: date });
            }}
            InputLabelProps={{
              shrink: true,
              style: { paddingRight: '10px' },
            }}
            error={!!validationErrors?.donationDate}
            helperText={validationErrors?.donationDate}
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
            error={!!validationErrors?.category}
            helperText={validationErrors?.category}
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
            error={!!validationErrors?.donatedItemName}
            helperText={validationErrors?.donatedItemName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Quantity"
            type="number"
            value={donationData.quantity ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                quantity: Number(e.target.value),
              });
            }}
            error={!!validationErrors?.quantity}
            helperText={validationErrors?.quantity}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>New or Used</InputLabel>
            <Select
              value={donationData.newOrUsed ?? 'new'}
              onChange={(e) => {
                setDonationData({ ...donationData, newOrUsed: e.target.value });
              }}
              label="New or Used"
              id="new-or-used"
              error={!!validationErrors?.newOrUsed}
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
            id="price"
            label="Price"
            type="number"
            value={donationData.price ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                price: Number(e.target.value),
              });
            }}
            onBlur={(e) =>
              setDonationData({
                ...donationData,
                price: getPriceFormatted(e.target.value),
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            error={!!validationErrors?.price}
            helperText={validationErrors?.price}
          />
        </Grid>
        <Grid item xs={8} sm={12}>
          <TextField
            fullWidth
            id="outlined-required"
            label="User"
            value={donationData.user}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({ ...donationData, user: e.target.value });
            }}
            error={!!validationErrors?.user}
            helperText={validationErrors?.user}
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
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donor First Name"
            value={donorFormData.firstName || ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorFormData({
                ...donorFormData,
                firstName: e.target.value,
              });
            }}
            error={!!validationErrors?.firstName}
            helperText={validationErrors?.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Donor Last Name"
            value={donorFormData.lastName ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorFormData({
                ...donorFormData,
                lastName: e.target.value,
              });
            }}
            error={!!validationErrors?.lastName}
            helperText={validationErrors?.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Address"
            value={donorFormData.address ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorFormData({
                ...donorFormData,
                address: e.target.value,
              });
            }}
            error={!!validationErrors?.address}
            helperText={validationErrors?.address}
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            id="outlined-required"
            label="City"
            value={donorFormData.city ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorFormData({ ...donorFormData, city: e.target.value });
            }}
            error={!!validationErrors?.city}
            helperText={validationErrors?.city}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            id="outlined-required"
            label="State"
            value={donorFormData.state ?? ''}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorFormData({ ...donorFormData, state: e.target.value });
            }}
            error={!!validationErrors?.state}
            helperText={validationErrors?.state}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            id="outlined-required"
            label="Zip"
            value={donorFormData.zip ?? ''}
            type="number"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonorFormData({
                ...donorFormData,
                zip: Number(e.target.value),
              });
            }}
            error={!!validationErrors?.zip}
            helperText={validationErrors?.zip}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
