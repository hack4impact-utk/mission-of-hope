import { DonorFormData } from '@/types/forms/donor';
import { Grid, TextField } from '@mui/material';

interface donorProps {
  donorData: DonorFormData;
  onChange: (DonorData: DonorFormData) => void;
}

export default function DonorForm(props: donorProps) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Donor Name"
          value={props.donorData.firstName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange({ ...props.donorData, firstName: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Donor Name"
          value={props.donorData.lastName}
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
          value={props.donorData.address}
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
          value={props.donorData.city}
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
          value={props.donorData.state}
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
          value={props.donorData.zip}
          type="number"
          inputMode="numeric"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            ({
              ...props.donorData,
              zip: e.target.value,
            });
          }}
        />
      </Grid>
    </>
  );
}
