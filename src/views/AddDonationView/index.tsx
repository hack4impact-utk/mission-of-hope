'use client';
import AutofillDonorEmail from '@/components/AutofillDonorEmail';
import DonorForm from '@/components/donorForm';
import { DonorFormData } from '@/types/forms/donor';
import { CreateDonorRequest, DonorResponse } from '@/types/persons';
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
import useSnackbar from '@/hooks/useSnackbar';
import { useEffect, useState } from 'react';

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
  const [donationData, setDonationData] = useState({
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
  const [donorFormData, setDonorFormData] = useState<DonorFormData>(
    {} as DonorFormData
  );
  useEffect(() => {
    console.log(donorFormData);
  }, [donorFormData]);

  const handleDonorSelect = (selectedDonor: DonorResponse) => {
    setDonorFormData({
      ...donorFormData,
      firstName: selectedDonor.firstName ?? '',
      lastName: selectedDonor.lastName,
      address: selectedDonor.address,
      city: selectedDonor.city,
      email: selectedDonor.email,
      state: selectedDonor.state,
      zip: selectedDonor.zip,
    });
    setDonationData({
      ...donationData,
      prevDonated: true,
    });
  };

  const { showSnackbar } = useSnackbar();
  const handleAddDonation = () => {
    showSnackbar('Donation added successfully.', 'success');

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
    setDonorFormData({} as DonorFormData);
  };

  const handleAddDonor = async () => {
    // If donor has previously donated, don't add them to the database
    if (donationData.prevDonated) return;

    // ADD ERROR PARSING

    const donor: CreateDonorRequest = {
      firstName: donorFormData.firstName,
      lastName: donorFormData.firstName,
      email: donorFormData.email,
      address: donorFormData.address,
      state: donorFormData.state,
      city: donorFormData.city,
      zip: donorFormData.zip,
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
        setDonorFormData({} as DonorFormData);
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
            value={donationData.donationDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({
                ...donationData,
                donationDate: e.target.value,
              });
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
              setDonationData({ ...donationData, category: e.target.value });
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
              setDonationData({ ...donationData, donatedItem: e.target.value });
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
              setDonationData({ ...donationData, quantity: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>New or Used</InputLabel>
            <Select // Change to dropdown
              value={donationData.newOrUsed}
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
          <FormControl fullWidth>
            <InputLabel id="high-or-low-value-label">
              High or Low Value
            </InputLabel>
            <Select
              labelId="high-or-low-value-label"
              value={donationData.alertQuantity}
              onChange={(e) => {
                setDonationData({
                  ...donationData,
                  alertQuantity: e.target.value,
                });
              }}
              label="High or Low Value"
              id="high-or-low-value"
              disabled={donationData.newOrUsed === 'new'} // Disable if new
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            error={!!priceError}
            id="price"
            label="Price"
            type="number"
            value={donationData.price}
            helperText={priceError}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDonationData({ ...donationData, price: e.target.value });
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
            disabled={donationData.newOrUsed === 'used'} // Disable if used
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
            <Select // Change to dropdown
              value={donationData.prevDonated ? 'yes' : 'no'}
              onChange={(e) => {
                setDonationData({
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
        <DonorForm
          donorData={donorFormData}
          disabled={donationData.prevDonated}
          onChange={setDonorFormData}
        ></DonorForm>
      </Grid>
    </Box>
  );
}
