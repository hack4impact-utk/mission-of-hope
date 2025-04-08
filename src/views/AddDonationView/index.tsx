'use client';
import DonorForm from '@/components/donorForm';
import { DonationFormData } from '@/types/forms/donation';
import { DonorFormData } from '@/types/forms/donor';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import DonationItemForm from '@/components/donationItemForm';
import { DonationItemFormData } from '@/types/forms/donationItem';
import mohColors from '@/utils/moh-theme';
import GenerateReceiptButton from '@/components/generateReceiptButton';
import ApiAutoComplete, {
  ApiAutocompleteOption,
} from '@/components/ApiAutoComplete';

export default function AddDonationView() {
  const [isLoading, setIsLoading] = useState(false);
  const [donationData, setDonationFormData] = useState<DonationFormData>({
    donationDate: new Date(),
  } as DonationFormData);
  const [donorFormData, setDonorFormData] = useState<DonorFormData>(
    {} as DonorFormData
  );
  const [donationItemFormDatas, setDonationItemFormDatas] = useState<
    DonationItemFormData[]
  >([{}] as DonationItemFormData[]);
  const [donorInfoFormDisabled, setDonorInfoFormDisabled] = useState(false);
  const [donorOption, setDonorOption] = useState<ApiAutocompleteOption | null>(
    null
  );
  const [categoryOptions, setCategoryOptions] = useState<
    ApiAutocompleteOption[]
  >([]);
  const categoriesLoadedRef = useRef<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const handleDonorOptionChange = async (
    newDonorOption: ApiAutocompleteOption | null
  ) => {
    if (newDonorOption && !newDonorOption.created) {
      const donorResponse = await fetch('/api/donors/' + newDonorOption.value);
      const donorData = await donorResponse.json();
      setDonorFormData({
        ...donorFormData,
        _id: donorData._id,
        firstName: donorData.firstName ?? '',
        lastName: donorData.lastName ?? '',
        address: donorData.address ?? '',
        city: donorData.city ?? '',
        state: donorData.state ?? '',
        zip: donorData.zip ?? 0,
      });
      setDonorInfoFormDisabled(true);
    } else if (newDonorOption && newDonorOption.created) {
      setDonorFormData({
        ...donorFormData,
        email: newDonorOption.value,
      });
      setDonorInfoFormDisabled(false);
    } else {
      setDonorFormData({
        ...donorFormData,
        _id: undefined,
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
      });
      setDonorInfoFormDisabled(false);
    }
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
    const createDonationFormData = {
      entryDate: new Date(donationData.donationDate),
      user: '661dc544ed3579f193bb008c',
      donationItems: donationItemFormDatas.map((donationItem) => ({
        item: donationItem.item?._id
          ? donationItem.item._id
          : {
              name: donationItem.item?.name,
              category: donationItem.item?.category,
              high: donationItem.item?.high,
              low: donationItem.item?.low,
            },
        quantity: donationItem.quantity,
        barcode: donationItem.barcode,
        value: {
          price: donationItem.value.price,
          evaluation:
            donationItem.newOrUsed === 'New'
              ? 'New'
              : donationItem.highOrLow === 'High'
                ? 'High'
                : 'Low',
        },
      })),
      donor: donorFormData._id ? donorFormData._id : donorFormData,
      receipt: donationData.receipt,
    };

    const response = await fetch('/api/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createDonationFormData),
    });
    setIsLoading(false);
    if (response.ok) {
      showSnackbar('Donation created!', 'success');
      setTimeout(() => {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        window.location.assign(`/donation?month=${month}&year=${year}`);
      }, 500);
    } else {
      const { message } = await response.json();
      showSnackbar(message || 'Donation submission failed', 'error');
    }
  };

  const loadCategories = useCallback(async () => {
    const categoryRes = await fetch('/api/categories');
    const categories = await categoryRes.json();
    setCategoryOptions(
      categories.map((categoryName: string) => ({ label: categoryName }))
    );
  }, []);

  useEffect(() => {
    if (!categoriesLoadedRef.current) {
      loadCategories();
      categoriesLoadedRef.current = true;
    }
  }, [loadCategories]);

  return (
    <ThemeProvider theme={mohColors}>
      <Box display={'flex'} justifyContent={'center'}>
        <Box
          component={'form'}
          onSubmit={(event) => {
            event.preventDefault();
            handleAddDonation();
          }}
          sx={{
            padding: '20px',
            margin: '20px',
            border: '1px solid #00000030',
            borderRadius: '10px',
            width: '60vw',
            boxShadow: '0px 4px 4px 0px #00000040',
          }}
        >
          <Box
            sx={{
              display: isLoading ? 'flex' : 'none',
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              justifyContent: 'center',
              alignItems: 'center',
              pointerEvents: 'auto',
              zIndex: 2000,
            }}
          >
            <CircularProgress />
          </Box>
          <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
            Add Donation
          </Typography>
          <Divider
            sx={{
              backgroundColor: '#379541',
            }}
          ></Divider>
          <Typography variant="overline" fontSize={'large'}>
            Donor Information
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1, pl: 2, pr: 2 }}>
            <Grid item xs={12} sm={8}>
              <ApiAutoComplete
                apiUrl="/api/donors/autocomplete"
                label="Email Address"
                value={donorOption}
                onChange={(newDonorOption) => {
                  setDonorOption(newDonorOption);
                  handleDonorOptionChange(newDonorOption);
                }}
                creatable
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
                required
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
                required
                value={donationData.receipt || ''}
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
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="overline" fontSize={'large'} mb={2}>
                ITEMS
              </Typography>
            </Grid>
            {donationItemFormDatas.map((_, index) => (
              <Grid item xs={12} container spacing={2} key={index}>
                <DonationItemForm
                  donationItemData={donationItemFormDatas[index]}
                  onChange={(value: DonationItemFormData) =>
                    handleDonationItemFormChange(value, index)
                  }
                  key={index}
                  disabled={false}
                  categoryOptions={categoryOptions}
                />
                {donationItemFormDatas.length > 1 && (
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignContent={'center'}
                    justifyContent={'flex-end'}
                  >
                    <Tooltip title="Remove">
                      <Button
                        onClick={() => {
                          donationItemFormDatas.splice(index, 1);
                          setDonationItemFormDatas([...donationItemFormDatas]);
                        }}
                        key={index}
                        endIcon={<DeleteIcon />}
                        color="moh"
                      >
                        Remove Item
                      </Button>
                    </Tooltip>
                  </Grid>
                )}
                {index != donationItemFormDatas.length - 1 && (
                  <Grid item xs={12}>
                    <Divider
                      sx={{
                        margin: '18px',
                        backgroundColor: '#379541',
                      }}
                    />
                  </Grid>
                )}
              </Grid>
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
                {donationItemFormDatas.length == 0
                  ? 'Add Item'
                  : 'Add Additional Item'}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{ height: '40px' }}
                type="submit"
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
