'use client';
import DonorForm from '@/components/donorForm';
import { DonorFormData } from '@/types/forms/donor';
import { DonorResponse } from '@/types/persons';
import mohColors from '@/utils/moh-theme';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface donorProps {
  id: string;
  donor: DonorResponse;
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    moh: true;
  }
}

export default function DonorIdView(props: donorProps) {
  const [editSwitch, setEditSwitch] = useState<boolean>(false);
  const [donorForm, setDonorFormData] = useState<DonorFormData>({
    firstName: props.donor.firstName ?? '',
    lastName: props.donor.lastName,
    email: props.donor.email,
    address: props.donor.address,
    city: props.donor.city,
    state: props.donor.state,
    zip: props.donor.zip,
  });

  function setDonorFormFromDonor(donor: DonorResponse) {
    setDonorFormData({
      firstName: donor.firstName ?? '',
      lastName: donor.lastName,
      email: donor.email,
      address: donor.address,
      city: donor.city,
      state: donor.state,
      zip: donor.zip,
    });
  }

  const handleCancel = () => {
    // Reset the form data to initial donor data
    setDonorFormFromDonor(props.donor);
    setEditSwitch(false); // Optionally turn off edit mode
  };

  const handleUpdate = async () => {
    if (!props.donor._id) {
      console.error('Donor ID is missing');
      return;
    }

    try {
      const response = await fetch(`/api/donors/${props.donor._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donorForm),
      });

      if (!response.ok) {
        throw new Error('Failed to update donor');
      }

      const updatedDonor = await response.json();
      setDonorFormFromDonor(updatedDonor);
      setEditSwitch(false); // Optionally turn off edit mode
      // console.log('Donor updated successfully:', updatedDonor);
      // Optionally update local state or trigger other UI updates
    } catch (error) {
      console.error('Error updating donor:', error);
    }
  };

  return (
    <>
      <ThemeProvider theme={mohColors}>
        <Grid container spacing={2}>
          {' '}
          <Grid item xs={0} md={2} sm={1}></Grid>
          <Grid item xs={12} md={8} sm={10}>
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
                  <Typography variant="h4">Edit Donor</Typography>
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
                    label="Last Name"
                    disabled={!editSwitch}
                    value={donorForm.email ?? ''}
                  ></TextField>
                </Grid>
                <DonorForm
                  donorData={donorForm}
                  onChange={setDonorFormData}
                  disabled={!editSwitch}
                ></DonorForm>
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
