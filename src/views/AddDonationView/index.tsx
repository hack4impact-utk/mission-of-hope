'use client';
import AutofillDonorEmail from '@/components/donation-form/AutofillDonorEmail';
import DonorForm from '@/components/donorForm';
import useValidation from '@/hooks/useValidation';
import { DonationFormData, zDonationFormData } from '@/types/forms/donation';
import { DonorFormData, zDonorFormData } from '@/types/forms/donor';
import { DonorResponse } from '@/types/persons';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import { CreateItemRequest, ItemResponse } from '@/types/items';
import DonationItemForm from '@/components/donationItemForm';
import { DonationItemFormData } from '@/types/forms/donationItem';
import mohColors from '@/utils/moh-theme';
import {
  CreateDonationItemRequest,
  DonationItemResponse,
} from '@/types/donation';

interface AddDonationViewProps {
  donorOptions: DonorResponse[];
  itemOptions: ItemResponse[];
}

export default function AddDonationView({
  donorOptions,
  itemOptions,
}: AddDonationViewProps) {
  const [donationData, setDonationFormData] = useState<DonationFormData>({
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

  const handleAddDonation = async () => {
    try {
      addDonor();
      await addDonationItems();
      addDonation();
    } catch (error) {
      showSnackbar(`Error:'${error}`, 'error');
    }
  };

  const addDonationItems = async () => {
    const donationItemResponces = donationItemFormDatas.map(
      async (itemForm): Promise<DonationItemResponse> => {
        if (!itemForm.itemRes) {
          itemForm.itemRes = await addItem(itemForm);
        }

        const donationItem: CreateDonationItemRequest = {
          item: itemForm.itemRes._id,
          quantity: itemForm.quantity,
          value: {
            price: itemForm.price,
            evaluation:
              itemForm.newOrUsed === 'New'
                ? 'New'
                : itemForm.highOrLow === 'High'
                ? 'High'
                : 'Low',
          },
        };

        try {
          const donationItemRes = await fetch('/api/donationItems', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(donationItem),
          });
          if (donationItemRes.ok) {
            console.log('Donation item added successfully');
            return await donationItemRes.json();
          } else {
            showSnackbar(
              `Error adding donation item, status: ${donationItemRes.status}`,
              'error'
            );
            throw `Error adding donation item, status: ${donationItemRes.status}`;
          }
        } catch (error) {
          showSnackbar(`Error:'${error}`, 'error');
          throw `Error:'${error}`;
        }
      }
    );

    for (const dItem in donationItemResponces) {
      if (!dItem) {
        return null;
      }
    }
    return donationItemResponces.map(async (res) => {
      return (await res)._id;
    });
  };

  const addItem = async (
    itemForm: DonationItemFormData
  ): Promise<ItemResponse> => {
    const item: CreateItemRequest = {
      name: itemForm.name,
      category: itemForm.category,
    };

    try {
      const itemRes = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (itemRes.ok) {
        console.log('Item added successfully');
        return await itemRes.json();
      } else {
        showSnackbar(`Error adding item, status: ${itemRes.status}`, 'error');
        throw `Error adding item, status: ${itemRes.status}`;
      }
    } catch (error) {
      showSnackbar(`Error:'${error}`, 'error');
      throw `Error:'${error}`;
    }
  };

  const addDonor = async () => {
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

  const addDonation = () => {
    const errors = validateDonation(donationData);
    if (errors) {
      showSnackbar('Cannot add donation', 'error');
      setValidationErrors(errors);
      return;
    }
    setValidationErrors(undefined);
    showSnackbar('Donation added successfully.', 'success');
    setDonationFormData({
      donationDate: new Date(),
    } as DonationFormData);
  };

  return (
    <ThemeProvider theme={mohColors}>
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
            Add Donation
          </Typography>
          <Divider></Divider>
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
                  setDonationFormData({ ...donationData, donationDate: date });
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
                <Grid item sm={1} display={'flex'} alignContent={'center'}>
                  <Tooltip title="Remove">
                    <IconButton
                      onClick={() => {
                        donationItemFormDatas.splice(index, 1);
                        setDonationItemFormDatas([...donationItemFormDatas]);
                      }}
                      key={index}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <DonationItemForm
                  itemOptions={itemOptions}
                  donationItemData={donationItemFormDatas[index]}
                  onChange={(value: DonationItemFormData) =>
                    handleDonationItemFormChange(value, index)
                  }
                  key={index}
                  disabled={false}
                  // validationErrors={}
                />
              </>
            ))}
            <Grid item sm={4}>
              <Button
                sx={{ height: '100%' }}
                variant="outlined"
                startIcon={<AddIcon></AddIcon>}
                color="moh"
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
                  setDonationFormData({
                    ...donationData,
                    user: e.target.value,
                  });
                }}
                error={!!validationErrors?.user}
                helperText={validationErrors?.user}
              />
            </Grid>

            <Grid item sm={4}>
              <Button
                variant="contained"
                sx={{ height: '100%' }}
                onClick={() => handleAddDonation()}
                color="moh"
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
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
