'use client';
import { DonorFormData } from '@/types/forms/donor';
import { Grid, TextField } from '@mui/material';

interface donorProps {
  donorData: DonorFormData;
  disabled: boolean;
  onChange: (DonorData: DonorFormData) => void;
}

export default function DonorForm(props: donorProps) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="outlined-required"
          disabled={props.disabled}
          label="First Name"
          required
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
          disabled={props.disabled}
          label="Last Name"
          required
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
          disabled={props.disabled}
          label="Address"
          value={props.donorData.address ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, address: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="outlined-required"
          disabled={props.disabled}
          label="City"
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
          disabled={props.disabled}
          label="State"
          value={props.donorData.state ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, state: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="outlined-required"
          disabled={props.disabled}
          label="Zip"
          value={props.donorData.zip ?? ''}
          type="number"
          inputMode="numeric"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({
              ...props.donorData,
              zip: e.target.value,
            });
          }}
        />
      </Grid>
    </>
  );
}
