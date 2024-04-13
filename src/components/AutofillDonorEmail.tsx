import { DonorResponse } from '@/types/persons';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

interface Donor {
  DonorOptions: DonorResponse[];
  DonorOption: DonorResponse;
}

export default function AutofillDonorEmail(props: Donor) {
  const [donorOptions] = useState<DonorResponse[]>(props.DonorOptions);

  const [donorOption, setDonorOption] = useState<DonorResponse>(
    props.DonorOption
  );

  function onEmailChange(value: string) {
    const donorMatch = donorOptions.filter(
      (don) => don.email.toLowerCase() === value.toLowerCase()
    );

    if (donorMatch.length === 1) {
      setDonorOption(donorMatch[0]);
    }
  }

  return (
    <Autocomplete
      sx={{ mt: 2 }}
      freeSolo
      autoComplete
      value={donorOption.email || ''}
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
          value={donorOption.email || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onEmailChange(e.target.value);
          }}
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
