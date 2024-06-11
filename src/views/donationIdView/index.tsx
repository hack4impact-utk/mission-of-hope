'use client';
import DonationItemForm from '@/components/donationItemForm';
import useSnackbar from '@/hooks/useSnackbar';
import {
  DonationResponse,
  UpdateDonationItemRequest,
  UpdateDonationRequest,
} from '@/types/donation';
import { DonationFormData } from '@/types/forms/donation';
import { DonationItemFormData } from '@/types/forms/donationItem';
import { ItemResponse } from '@/types/items';
import mohColors from '@/utils/moh-theme';
import { ThemeProvider } from '@emotion/react';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface donationProps {
  id: string;
  donation: DonationResponse;
  itemOptions: ItemResponse[];
}

export default function DonationIdView(props: donationProps) {
  const { showSnackbar } = useSnackbar();
  const [editSwitch, setEditSwitch] = useState<boolean>(false);
  const [donationForm, setDonationFormData] = useState<DonationFormData>({
    donationDate: new Date(props.donation.entryDate),
    receipt: props.donation.receipt ?? '',
  } as DonationFormData);
  const [donationItemForms, setDonationItemFormDatas] = useState<
    DonationItemFormData[]
  >(
    props.donation.items.map(
      (item) =>
        ({
          itemRes: item.item,
          name: item.item.name,
          category: item.item.category,
          quantity: item.quantity,
          newOrUsed: item.value.evaluation === 'New' ? 'New' : 'Used',
          highOrLow:
            item.value.evaluation === 'New' ? '' : item.value.evaluation,
          price: item.value.price,
        }) as DonationItemFormData
    )
  );

  function setDonationFormFromDonation(donation: DonationResponse) {
    setDonationItemFormDatas(
      donation.items.map(
        (item) =>
          ({
            itemRes: item.item,
            name: item.item.name,
            category: item.item.category,
            quantity: item.quantity,
            newOrUsed: item.value.evaluation === 'New' ? 'New' : 'Used',
            highOrLow:
              item.value.evaluation === 'New' ? '' : item.value.evaluation,
            price: item.value.price,
          }) as DonationItemFormData
      )
    );
    setDonationFormData({
      donationDate: new Date(donation.entryDate),
    } as DonationFormData);
  }

  const handleDonationItemFormChange = (
    updatedDonationItem: DonationItemFormData,
    index: number
  ) => {
    const newArr = [...donationItemForms];

    newArr[index] = updatedDonationItem;

    setDonationItemFormDatas(newArr);
  };

  const handleUpdate = () => {
    if (!props.donation._id) {
      console.error('Donor ID is missing');
      return;
    }

    try {
      // Grab item from the autofill

      const dItems: UpdateDonationItemRequest[] = donationItemForms.map(
        (itemForm) =>
          ({
            quantity: itemForm.quantity,
            value: {
              price: itemForm.price,
              evaluation:
                itemForm.newOrUsed === 'Used' ? itemForm.highOrLow : 'New',
            },
          }) as UpdateDonationItemRequest
      );
      const donation: UpdateDonationRequest = {
        entryDate: donationForm.donationDate,
      };
      console.log(dItems, donation);

      //update the donation
    } catch (error) {
      showSnackbar(`Error updating donor: ${error}`, 'error');
    }
    setEditSwitch(false);
  };

  const handleCancel = () => {
    // Reset the form data to initial donor data
    // setDonorFormFromDonor(props.donor);
    setDonationFormFromDonation(props.donation);
    setEditSwitch(false); // Optionally turn off edit mode
  };

  return (
    <>
      <ThemeProvider theme={mohColors}>
        <Grid container spacing={2}>
          <Grid item xs={0} md={2} sm={1}></Grid>
          <Grid item xs={12} md={8} sm={10}>
            <Box p={2} pb={0}>
              <Button
                variant="contained"
                color="moh"
                startIcon={<ArrowBack></ArrowBack>}
                onClick={() => (window.location.href = `/donation`)}
              >
                View Donations
              </Button>
            </Box>
            {props.donation && (
              <Box
                sx={{
                  border: '1px solid #00000030',
                  borderRadius: '10px',
                  boxShadow: '0px 4px 4px 0px #00000040',
                }}
                // width={"60%"}
                p={2}
                m={2}
              >
                <Grid container spacing={2} sx={{ pl: 2, pr: 2 }}>
                  <Grid item xs={12} sm={12}>
                    <Typography variant="h4">Edit Donation</Typography>
                    <Divider></Divider>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={editSwitch}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => setEditSwitch(event.target.checked)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                        }
                        label="Edit"
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      label="Donation Date"
                      type="date"
                      disabled={!editSwitch}
                      value={
                        donationForm?.donationDate
                          ?.toISOString()
                          ?.split('T')[0] || ''
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDonationFormData({
                          ...donationForm,
                          donationDate: new Date(e.target.value),
                        });
                      }}
                      InputLabelProps={{
                        shrink: true,
                        style: { paddingRight: '10px' },
                      }}
                    />
                  </Grid>
                  {donationItemForms.map((_, index) => (
                    <DonationItemForm
                      itemOptions={props.itemOptions}
                      donationItemData={donationItemForms[index]}
                      onChange={(value: DonationItemFormData) =>
                        handleDonationItemFormChange(value, index)
                      }
                      disabled={!editSwitch}
                      key={index}
                    ></DonationItemForm>
                  ))}
                  <Grid item xs={8} sm={8}>
                    <TextField
                      fullWidth
                      id="outlined-required"
                      label="Receipt"
                      disabled={true}
                      value={donationForm.receipt}
                    />
                  </Grid>

                  <Grid item xs={3} sm={6}></Grid>
                  <Grid item xs={3} sm={3}>
                    <Button
                      sx={{
                        '&:hover': {
                          backgroundColor: '#666666ff',
                        },
                        backgroundColor: '#666666cc',
                      }}
                      fullWidth
                      disabled={!editSwitch}
                      variant="contained"
                      onClick={handleCancel}
                      // color='moh'
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={3} sm={3}>
                    <Button
                      fullWidth
                      disabled={!editSwitch}
                      variant="contained"
                      onClick={handleUpdate}
                      color="moh"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
            <Grid item xs={0} md={2} sm={1}></Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
