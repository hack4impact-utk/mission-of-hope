'use client';
import AutofillDonorEmail from '@/components/donation-form/AutofillDonorEmail';
import DonorForm from '@/components/donorForm';
import useValidation from '@/hooks/useValidation';
import { DonationFormData, zDonationFormData } from '@/types/forms/donation';
import { DonorFormData, zDonorFormData } from '@/types/forms/donor';
import { CreateDonorRequest, DonorResponse } from '@/types/donors';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import { CreateItemRequest, ItemResponse } from '@/types/items';
import DonationItemForm from '@/components/donationItemForm';
import { DonationItemFormData } from '@/types/forms/donationItem';
import mohColors from '@/utils/moh-theme';
import {
  CreateDonationItemRequest,
  CreateDonationRequest,
  DonationItemResponse,
} from '@/types/donation';
import GenerateReceiptButton from '@/components/generateReceiptButton';

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
    receipt: '',
  } as DonationFormData);
  const [donorFormData, setDonorFormData] = useState<DonorFormData>(
    {} as DonorFormData
  );
  const [donationItemFormDatas, setDonationItemFormDatas] = useState<
    DonationItemFormData[]
  >([{} as DonationItemFormData] as DonationItemFormData[]);
  const [prevDonated, setPrevDonated] = useState(false);
  const [donorInfoFormDisabled, setDonorInfoFormDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // For the loading wheel

  const { validate: validateDonation } = useValidation(zDonationFormData);
  const { validate: validateDonor } = useValidation(zDonorFormData);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string> | undefined
  >(undefined);
  const { showSnackbar } = useSnackbar();

  const handleDonorSelect = (selectedDonor: DonorResponse) => {
    if (selectedDonor) {
      setDonorFormData({
        ...donorFormData,
        _id: selectedDonor._id,
        firstName: selectedDonor.firstName ?? '',
        lastName: selectedDonor.lastName ?? '',
        address: selectedDonor.address ?? '',
        city: selectedDonor.city ?? '',
        email: selectedDonor.email ?? '',
        state: selectedDonor.state ?? '',
        zip: selectedDonor.zip ?? 0,
      });
      setPrevDonated(true);
      setDonorInfoFormDisabled(true);
    } else {
      setDonorFormData({ _id: '' } as DonorFormData); // Clear form when donor is deselected
      setDonorInfoFormDisabled(false);
      setPrevDonated(false);
    }
    // if donr is cleared after selecting a donor, set prevDonated to false
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
    setIsLoading(true);
    const createDonation: CreateDonationRequest = {
      entryDate: new Date(donationData.donationDate),
      user: '661dc544ed3579f193bb008c',
      items: [],
      donor: '',
      receipt: donationData.receipt,
    };

    try {
      createDonation.donor = (await addDonor())._id;
      createDonation.items = (await addDonationItems()).map((item) => {
        return item._id;
      });

      await addDonation(createDonation);

      setDonorFormData({} as DonorFormData);
      setDonationItemFormDatas([{} as DonationItemFormData]);
      setDonationFormData({
        donationDate: new Date(),
        receipt: '',
      } as DonationFormData);
    } catch (error) {
      showSnackbar(`Error: '${error}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const addDonationItems = async (): Promise<DonationItemResponse[]> => {
    const donationItemResponces = donationItemFormDatas.map(
      async (itemForm): Promise<DonationItemResponse> => {
        if (!itemForm.itemRes) {
          itemForm.itemRes = await addItem(itemForm);
        }

        const donationItem: CreateDonationItemRequest = {
          item: itemForm.itemRes._id,
          quantity: itemForm.quantity,
          barcode: itemForm?.barcode,
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

    return Promise.all(donationItemResponces);
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

  const addDonor = async (): Promise<DonorResponse> => {
    // If donor has previously donated, don't add them to the database
    if (prevDonated) {
      return donorFormData as DonorResponse;
    }

    const donor: CreateDonorRequest = {
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
      throw `Error adding donor`;
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
        return await donorRes.json();
      } else {
        showSnackbar(`Error adding donor, status: ${donorRes.status}`, 'error');
        throw `Error adding donor, status: ${donorRes.status}`;
      }
    } catch (error) {
      showSnackbar(`Error:'${error}`, 'error');
      throw `Error:'${error}`;
    }
  };

  const addDonation = async (createDonation: CreateDonationRequest) => {
    donationData.prevDonated = prevDonated;
    const errors = validateDonation(donationData);
    if (errors) {
      setValidationErrors(errors);
      throw 'Cannot add donation';
    }
    setValidationErrors(undefined);
    try {
      // fetch request to add donor
      const donationRes = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createDonation),
      });

      if (donationRes.ok) {
        showSnackbar('Donation added successfully.', 'success');
      } else {
        throw `Error adding donor, status: ${donationRes.status}`;
      }
    } catch (error) {
      throw `Error:'${error}`;
    }
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
          <Divider
            sx={{
              backgroundColor: '#379541',
            }}
          ></Divider>
          <Grid container spacing={2} sx={{ mt: 1, pl: 2, pr: 2 }}>
            <Grid item xs={12} sm={8}>
              <AutofillDonorEmail
                DonorOptions={donorOptions}
                DonorForm={donorFormData}
                disable={isLoading}
                onDonorSelect={handleDonorSelect}
                onChange={setDonorFormData}
                onClear={() => setDonorInfoFormDisabled(false)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="outlined-required"
                label="Donation Date"
                type="date"
                disabled={isLoading}
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

            <DonorForm
              donorData={donorFormData}
              onChange={setDonorFormData}
              disabled={donorInfoFormDisabled || isLoading}
            />

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-required"
                label="Receipt"
                value={donationData.receipt}
                autoComplete="off" // Disable auto fill
                disabled={isLoading}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const re = /^[0-9\b]+$/;
                  // if value is not blank, then test the regex
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setDonationFormData({
                      ...donationData,
                      receipt: e.target.value,
                    });
                  }
                }}
                InputLabelProps={{
                  // Ensures the label floats when a value is present
                  shrink: !!donationData.receipt,
                }}
                InputProps={{
                  endAdornment: (
                    <GenerateReceiptButton
                      disabled={isLoading}
                      onChange={async (Res: Response) => {
                        if (Res.ok) {
                          const receipt = await Res.json();
                          setDonationFormData({
                            ...donationData,
                            receipt: receipt.value,
                          });
                        } else {
                          showSnackbar(
                            `Error adding donation item, status: ${Res.status}`,
                            'error'
                          );
                        }
                      }}
                    />
                  ),
                }}
                error={!!validationErrors?.receipt}
                helperText={validationErrors?.receipt}
              />
            </Grid>

            {donationItemFormDatas.map((_, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12}>
                  <Divider
                    sx={{
                      margin: '18px',
                      backgroundColor: '#379541',
                    }}
                  />
                </Grid>
                <DonationItemForm
                  itemOptions={itemOptions}
                  donationItemData={donationItemFormDatas[index]}
                  onChange={(value: DonationItemFormData) =>
                    handleDonationItemFormChange(value, index)
                  }
                  key={index}
                  disabled={isLoading}
                  // validationErrors={}
                />
                <Grid
                  item
                  xs={12}
                  sm={1}
                  md={0.5}
                  display={'flex'}
                  alignContent={'center'}
                >
                  <Tooltip title="Remove">
                    <IconButton
                      disabled={isLoading}
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
              </React.Fragment>
            ))}
            <Grid item xs={12}>
              <Button
                sx={{ height: '40px' }}
                variant="outlined"
                startIcon={<AddIcon></AddIcon>}
                color="moh"
                disabled={isLoading}
                onClick={() =>
                  setDonationItemFormDatas([
                    ...donationItemFormDatas,
                    {} as DonationItemFormData,
                  ])
                }
                fullWidth
              >
                Add Additional Item
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ height: '40px' }}
                onClick={() => handleAddDonation()}
                color="moh"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? (
                  <CircularProgress
                    size={30}
                    color="inherit"
                  ></CircularProgress>
                ) : (
                  'Submit Donation'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
