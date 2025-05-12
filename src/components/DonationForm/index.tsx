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
import React, { useEffect, useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import DonationItemForm from '@/components/donationItemForm';
import { DonationItemFormData } from '@/types/forms/donationItem';
import mohColors from '@/utils/moh-theme';
import GenerateReceiptButton from '@/components/generateReceiptButton';
import ApiAutoComplete, {
  ApiAutocompleteOption,
} from '@/components/ApiAutoComplete';
import { useSession } from 'next-auth/react';
import useItemCategoryOptions from '@/hooks/useItemCategories';
import { DonationItemResponse } from '@/types/donation';

interface DonationFormProps {
  donationId?: string;
}

export default function DonationForm({ donationId }: DonationFormProps) {
  const isEditing = Boolean(donationId);
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const categoryOptions = useItemCategoryOptions();
  const session = useSession();
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
        zip: donorData.zip ?? '',
        email: donorData.email ?? '',
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
        _id: undefined,
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        email: '',
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
    setFieldErrors({});
    const payload = {
      entryDate: new Date(donationData.donationDate),
      user: session.data?.user._id,
      items: donationItemFormDatas.map((di) => ({
        item: di.item?._id ?? {
          name: di.item?.name,
          category: di.item?.category,
          high: di.item?.high,
          low: di.item?.low,
        },
        quantity: di.quantity,
        barcode: di.barcode,
        value: {
          price: di.value.price,
          evaluation:
            di.newOrUsed === 'New'
              ? 'New'
              : di.highOrLow === 'High'
                ? 'High'
                : 'Low',
        },
      })),
      donor: donorFormData._id ? donorFormData._id : donorFormData,
      receipt: donationData.receipt,
    };

    const url = isEditing ? `/api/donations/${donationId}` : '/api/donations';
    const method = isEditing ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    setIsLoading(false);

    if (res.ok) {
      showSnackbar(
        isEditing ? 'Donation saved!' : 'Donation created!',
        'success'
      );
      setTimeout(() => {
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        window.location.assign(`/donation?month=${month}&year=${year}`);
      }, 500);
    } else if (res.status === 400 && json.validation?.fieldErrors) {
      setFieldErrors(json.validation.fieldErrors);
      showSnackbar('Please fix the errors below.', 'error');
    } else {
      showSnackbar(json.message || 'Donation submission failed', 'error');
    }
  };

  useEffect(() => {
    if (!donationId) return;

    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/donations/${donationId}`);
        if (!res.ok) throw new Error('Failed to load donation');
        const data = await res.json();

        setDonationFormData({
          donationDate: new Date(data.entryDate),
          receipt: data.receipt,
          prevDonated: false,
        });
        setDonorFormData({
          _id: data.donor._id,
          firstName: data.donor.firstName,
          lastName: data.donor.lastName,
          email: data.donor.email,
          address: data.donor.address,
          city: data.donor.city,
          state: data.donor.state,
          zip: data.donor.zip,
        });
        setDonorOption({
          value: data.donor._id,
          label: data.donor.email,
          created: false,
        });
        setDonorInfoFormDisabled(true);

        const itemForms: DonationItemFormData[] = data.items.map(
          (di: DonationItemResponse) => {
            const evaln = di.value.evaluation as 'New' | 'High' | 'Low';
            return {
              item: {
                _id: di.item._id,
                name: di.item.name,
                category: di.item.category,
                high: di.item.high,
                low: di.item.low,
              },
              quantity: di.quantity,
              barcode: di.barcode || '',
              newOrUsed: evaln === 'New' ? 'New' : 'Used',
              highOrLow: evaln === 'New' ? '' : evaln,
              value: {
                price: di.value.price,
                evaluation: evaln,
              },
            };
          }
        );
        setDonationItemFormDatas(itemForms);
      } catch {
        showSnackbar('Error loading donation data', 'error');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [donationId, showSnackbar]);

  return (
    <ThemeProvider theme={mohColors}>
      <Box display="flex" justifyContent="center">
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddDonation();
          }}
          sx={{
            padding: 2,
            margin: 2,
            border: '1px solid #00000030',
            borderRadius: 1,
            width: '60vw',
            boxShadow: '0px 4px 4px #00000040',
          }}
        >
          <Box
            sx={{
              display: isLoading ? 'flex' : 'none',
              position: 'fixed',
              inset: 0,
              bgcolor: 'rgba(0,0,0,0.25)',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
            }}
          >
            <CircularProgress />
          </Box>

          <Typography variant="h4" mb={2} ml={2}>
            {isEditing ? 'Edit Donation' : 'Add Donation'}
          </Typography>
          <Divider sx={{ bgcolor: '#379541' }} />

          <Typography variant="overline" fontSize="large" mt={2}>
            Donor Information
          </Typography>
          <Grid container spacing={2} px={2} mt={1}>
            <Grid item xs={12} sm={8}>
              <ApiAutoComplete
                apiUrl="/api/donors/autocomplete"
                label="Email Address"
                value={donorOption}
                onChange={(opt) => {
                  setDonorOption(opt);
                  handleDonorOptionChange(opt);
                }}
                creatable
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Donation Date"
                type="date"
                disabled={isLoading}
                value={donationData.donationDate.toISOString().split('T')[0]}
                onChange={(e) =>
                  setDonationFormData({
                    ...donationData,
                    donationDate: new Date(e.target.value),
                  })
                }
                InputLabelProps={{ shrink: true }}
                required
                error={!!fieldErrors.entryDate}
                helperText={fieldErrors.entryDate?.[0]}
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
                label="Receipt"
                required
                disabled={isLoading}
                value={donationData.receipt || ''}
                onChange={(e) => {
                  const re = /^[0-9\b]*$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setDonationFormData({
                      ...donationData,
                      receipt: e.target.value,
                    });
                  }
                }}
                InputLabelProps={{ shrink: !!donationData.receipt }}
                InputProps={{
                  endAdornment: (
                    <GenerateReceiptButton
                      disabled={isLoading}
                      onChange={async (res) => {
                        if (res.ok) {
                          const val = await res.json();
                          setDonationFormData({
                            ...donationData,
                            receipt: val.value,
                          });
                        } else {
                          showSnackbar(
                            `Error generating receipt: ${res.status}`,
                            'error'
                          );
                        }
                      }}
                    />
                  ),
                }}
                error={!!fieldErrors.receipt}
                helperText={fieldErrors.receipt?.[0]}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="overline" fontSize="large">
                ITEMS
              </Typography>
            </Grid>

            {donationItemFormDatas.map((_, index) => (
              <Grid container item xs={12} spacing={2} key={index}>
                <DonationItemForm
                  donationItemData={donationItemFormDatas[index]}
                  onChange={(val) => handleDonationItemFormChange(val, index)}
                  disabled={false}
                  categoryOptions={categoryOptions}
                  fieldErrors={fieldErrors}
                  index={index}
                />

                {donationItemFormDatas.length > 1 && (
                  <Grid item xs={12} display="flex" justifyContent="flex-end">
                    <Tooltip title="Remove">
                      <Button
                        onClick={() => {
                          donationItemFormDatas.splice(index, 1);
                          setDonationItemFormDatas([...donationItemFormDatas]);
                        }}
                        endIcon={<DeleteIcon />}
                        color="moh"
                      >
                        Remove Item
                      </Button>
                    </Tooltip>
                  </Grid>
                )}

                {index < donationItemFormDatas.length - 1 && (
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2, bgcolor: '#379541' }} />
                  </Grid>
                )}
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() =>
                  setDonationItemFormDatas([
                    ...donationItemFormDatas,
                    {} as DonationItemFormData,
                  ])
                }
                disabled={isLoading}
                fullWidth
                sx={{ height: 40 }}
              >
                {donationItemFormDatas.length === 0
                  ? 'Add Item'
                  : 'Add Additional Item'}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                fullWidth
                sx={{ height: 40 }}
              >
                {isLoading ? (
                  <CircularProgress size={30} color="inherit" />
                ) : isEditing ? (
                  'Save Donation'
                ) : (
                  'Create Donation'
                )}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
