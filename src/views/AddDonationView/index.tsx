'use client';
import AutofillDonorEmail from '@/components/donation-form/AutofillDonorEmail';
import DonorForm from '@/components/donorForm';
import useValidation from '@/hooks/useValidation';
import { DonationFormData, zDonationFormData } from '@/types/forms/donation';
import { DonorFormData, zDonorFormData } from '@/types/forms/donor';
import { DonorResponse } from '@/types/persons';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import { ItemResponse } from '@/types/items';
import DonationItemForm from '@/components/donationItemForm';
import { DonationItemFormData } from '@/types/forms/donationItem';

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
  itemOptions: ItemResponse[];
}

export default function AddDonationView({
  donorOptions,
  itemOptions,
}: AddDonationViewProps) {
  const [donationData, setDonationData] = useState<DonationFormData>({
    donationDate: new Date(),
  } as DonationFormData);
  const [donorFormData, setDonorFormData] = useState<DonorFormData>(
    {} as DonorFormData
  );
  const [donationItemFormDatas, setDonationItemFormDatas] = useState<
    DonationItemFormData[]
  >([{} as DonationItemFormData] as DonationItemFormData[]);
  const [prevDonated, setPrevDonated] = useState(false);

  const { validate: validateDonation } = useValidation(zDonationFormData);
  const { validate: validateDonor } = useValidation(zDonorFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string> | undefined
  >(undefined);
  const { showSnackbar } = useSnackbar();

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
    setPrevDonated(true);
  };

  const handleDonationItemFormChange = (
    updatedDonationItem: DonationItemFormData,
    index: number
  ) => {
    const newArr = [...donationItemFormDatas];

    newArr[index] = updatedDonationItem;

    setDonationItemFormDatas(newArr);
  };

  const handleAddDonation = () => {
    const errors = validateDonation(donationData);
    if (errors) {
      showSnackbar('Cannot add donation', 'error');
      setValidationErrors(errors);
      return;
    }
    setValidationErrors(undefined);
    showSnackbar('Donation added successfully.', 'success');
    setDonationData({
      donationDate: new Date(),
    } as DonationFormData);
    setDonorFormData({} as DonorFormData);
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
        setDonorFormData({} as DonorFormData);
      } else {
        showSnackbar(`Error adding donor, status: ${donorRes.status}`, 'error');
      }
    } catch (error) {
      showSnackbar(`Error:'${error}`, 'error');
    }
  };

  const [counter, setCounter] = useState(0);
  //increase counter
  const increase = () => {
    setCounter((count) => count + 1);
  };

  //decrease counter
  const decrease = () => {
    setCounter((count) => count - 1);
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
        Add Donation
      </Typography>

      <hr />

      <Grid container spacing={2} sx={{ mt: 1, pl: 2, pr: 2 }}>
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

        {donationItemFormDatas.map((_, index) => (
          <>
            <Grid item sm={4}>
              <Button
                startIcon={<RemoveIcon></RemoveIcon>}
                variant="outlined"
                sx={{ height: '100%' }}
                size="medium"
                fullWidth
                onClick={() => {
                  // console.log(donationItemFormDatas)
                  donationItemFormDatas.splice(index, 1);
                  setDonationItemFormDatas([...donationItemFormDatas]);
                }}
                key={index}
              >
                Remove
              </Button>
            </Grid>
            <DonationItemForm
              itemOptions={itemOptions}
              donationItemData={donationItemFormDatas[index]}
              onChange={(value: DonationItemFormData) =>
                handleDonationItemFormChange(value, index)
              }
              key={index}
              // validationErrors={}
            />
          </>
        ))}
        <Grid item sm={4}>
          <Button
            sx={{ height: '100%' }}
            variant="outlined"
            startIcon={<AddIcon></AddIcon>}
            onClick={() =>
              setDonationItemFormDatas([
                ...donationItemFormDatas,
                {} as DonationItemFormData,
              ])
            }
            fullWidth
          >
            Add Item
          </Button>
        </Grid>
        <Grid item xs={8} sm={8}>
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
            sx={{ backgroundColor: '#379541cc', height: '100%' }}
            onClick={() => [handleAddDonor(), handleAddDonation()]}
            fullWidth
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

        <DonorForm
          donorData={donorFormData}
          disabled={prevDonated}
          onChange={setDonorFormData}
        />

        <Typography variant="h6" color="#379541cc" sx={{ ml: 2, pt: 2 }}>
          Donation Information
        </Typography>

        <Grid container>
          <Typography variant="body1" sx={{ ml: 2, pt: 2 }}>
            Distinct donation items:
          </Typography>
          <ButtonGroup
            variant="contained"
            aria-label="Basic button group"
            sx={{ ml: 2, mt: 2 }}
          >
            <div></div>
            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#379541cc' }}
              onClick={decrease}
              // onClick={() => [handleAddDonor(), handleAddDonation()]}
            >
              -
            </Button>

            <Grid
              item
              className="counter__output"
              justifyContent="center"
              sx={{ pl: 8 }}
            >
              {counter}
            </Grid>

            <Button
              variant="contained"
              size="large"
              sx={{ backgroundColor: '#379541cc' }}
              onClick={increase}
              // onClick={() => [handleAddDonor(), handleAddDonation()]}
            >
              +
            </Button>
          </ButtonGroup>
          {/* // {' '} */}
        </Grid>
      </Grid>
    </Box>
  );
}
