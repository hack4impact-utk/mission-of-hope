'use client';
import AutofillDonorEmail from '@/components/AutofillDonorEmail';
import DonationItemForm from '@/components/donationItemForm';
import DonorForm from '@/components/donorForm';
import { DonationFormData } from '@/types/forms/donation';
import { DonorFormData } from '@/types/forms/donor';
import { CreateDonorRequest, DonorResponse } from '@/types/persons';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

// function getPriceFormatted(
//   value: string,
//   setError: (error: string) => void
// ): string {
//   // Validate high and low values
//   if (Number(value) < 0 || isNaN(Number(value))) {
//     setError('value must be a positive number');
//     return value;
//   } else {
//     setError('');
//   }

//   const formattedValue = Number(value).toFixed(2);
//   return formattedValue.toString();
// }

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
}

export default function AddDonationView({
  donorOptions,
}: AddDonationViewProps) {
  const [donationFormData, setDonationFormData] = useState(
    {} as DonationFormData
  );
  // donorName: '',
  // donorEmail: '',
  // donationDate: '',
  // category: '',
  // donatedItem: '',
  // quantity: '',
  // alertQuantity: '',
  // newOrUsed: '',
  // price: '',
  // prevDonated: false,
  // user: '',
  // donorAddress: '',
  // donorCity: '',
  // donorState: '',
  // donorZip: '',
  // const [priceError, setPriceError] = useState('');
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
    setDonationFormData({
      ...donationFormData,
      prevDonated: true,
    });
  };

  const handleAddDonation = () => {
    alert('Donation added successfully!');
    setDonorFormData({} as DonorFormData);
    setDonationFormData({} as DonationFormData);
  };

  const handleAddDonor = async () => {
    // If donor has previously donated, don't add them to the database
    if (donationFormData.prevDonated) return;

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
        setDonorFormData({} as DonorFormData);
        setDonationFormData({} as DonationFormData);
      } else {
        console.log('Error adding donor, status:', donorRes.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          padding: '20px',
          margin: '20px',
          border: '1px solid #00000030',
          borderRadius: '10px',
          width: '60vw',
          boxShadow: '0px 4px 4px 0px #00000040',
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
          Add Donations
        </Typography>
        <Divider></Divider>
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
              value={donationFormData.donationDate}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //   setDonationFormData({
              //     ...donationFormData,
              //     donationDate: e.target.value,
              //   });
              // }}
              InputLabelProps={{
                shrink: true,
                style: { paddingRight: '10px' },
              }}
            />
          </Grid>
          <DonationItemForm
            donationData={donationFormData}
            setDonationData={setDonationFormData}
            disabled={false}
          ></DonationItemForm>

          <Grid item sm={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
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
                value={donationFormData.prevDonated ? 'yes' : 'no'}
                onChange={(e) => {
                  setDonationFormData({
                    ...donationFormData,
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
            disabled={donationFormData.prevDonated}
            onChange={setDonorFormData}
          ></DonorForm>
        </Grid>
      </Box>
    </Box>
  );
}
