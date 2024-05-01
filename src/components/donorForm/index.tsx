'use client';
import { DonorFormData } from '@/types/forms/donor';
import { Grid, TextField } from '@mui/material';
import { useEffect } from 'react';

interface donorProps {
  donorData: DonorFormData;
  disabled: boolean;
  onChange: (DonorData: DonorFormData) => void;
}

export default function DonorForm(props: donorProps) {
  useEffect(() => {
    console.log(props.donorData.firstName);
  }, [props.donorData]);
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="outlined-required"
          label="First Name"
          disabled={props.disabled}
          value={props.donorData.firstName ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, firstName: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Last Name"
          disabled={props.disabled}
          value={props.donorData.lastName ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, lastName: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Address"
          disabled={props.disabled}
          value={props.donorData.address ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, address: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={5}>
        <TextField
          fullWidth
          id="outlined-required"
          label="City"
          disabled={props.disabled}
          value={props.donorData.city ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, city: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="State"
          disabled={props.disabled}
          value={props.donorData.state ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, state: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Zip"
          disabled={props.disabled}
          value={props.donorData.zip ?? ''}
          type="number"
          inputMode="numeric"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({
              ...props.donorData,
              zip: Number(e.target.value),
            });
          }}
        />
      </Grid>
    </>
  );
}
