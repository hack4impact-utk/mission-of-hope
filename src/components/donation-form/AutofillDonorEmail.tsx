import { DonorResponse } from '@/types/persons';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

interface Donor {
  DonorOptions: DonorResponse[];
  onDonorSelect: (donor: DonorResponse) => void;
}

export default function AutofillDonorEmail(props: Donor) {
  const [donorOptions] = useState<DonorResponse[]>(props.DonorOptions);

  function onEmailChange(value: string) {
    const donorMatch = donorOptions.find(
      (don) => don.email.toLowerCase() === value.toLowerCase()
    );
    if (donorMatch) {
      // Pass selected donor details back to parent component
      props.onDonorSelect(donorMatch);
    }
  }

  return (
    <Autocomplete
      freeSolo
      autoComplete
      value={''}
      options={donorOptions}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(don) => (typeof don === 'string' ? don : don.email)}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.email}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Email Address"
          id="outlined-required"
          value={''}
          type="email"
        />
      )}
      onInputChange={(_, value) => {
        if (value) {
          onEmailChange(value);
        }
      }}
    />
  );
}
