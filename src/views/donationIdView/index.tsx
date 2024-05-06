'use client';
import DonationItemForm from '@/components/donationItemForm';
import { DonationResponse } from '@/types/donation';
import { DonationFormData } from '@/types/forms/donation';
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
}

export default function DonationIdView(props: donationProps) {
  const [editSwitch, setEditSwitch] = useState<boolean>(false);
  const [donationForm, setDonationFormData] = useState<DonationFormData>({
    donationDate: props.donation.entryDate,
  } as DonationFormData);

  const handleUpdate = () => {
    setEditSwitch(false);
  };

  const handleCancel = () => {
    // Reset the form data to initial donor data
    // setDonorFormFromDonor(props.donor);
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
                    value={donationForm.donationDate}
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
                  donationData={donationForm}
                  setDonationData={setDonationFormData}
                  disabled={!editSwitch}
                ></DonationItemForm>
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
            <Grid item xs={0} md={2} sm={1}></Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
