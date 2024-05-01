'use client';
import DonorForm from '@/components/donorForm';
import { DonorFormData } from '@/types/forms/donor';
import { DonorResponse } from '@/types/persons';
import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface donorProps {
  donor: DonorResponse;
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

  return (
    <>
      <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
        <Grid item xs={12} sm={8}></Grid>
        <Grid item xs={2} sm={12}>
          <Box
            sx={{
              border: '1px solid #00000030',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0px #00000040',
            }}
            p={2}
            m={2}
          >
            <Typography variant="h4" sx={{ mb: 2, ml: 2 }}>
              Edit Donor
            </Typography>
            <Divider></Divider>
            <Grid container spacing={2} sx={{ mt: 4, pl: 2, pr: 2 }}>
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
            </Grid>
          </Box>
          <Grid item xs={12} sm={8}></Grid>
        </Grid>
      </Grid>
    </>
  );
}
