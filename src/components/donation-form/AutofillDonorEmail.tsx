import { DonorFormData } from '@/types/forms/donor';
import { DonorResponse } from '@/types/donors';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

interface Donor {
  DonorOptions: DonorResponse[];
  DonorForm: DonorFormData;
  disable?: boolean;
  onDonorSelect: (donor: DonorResponse) => void;
  onChange: (donor: DonorFormData) => void;
  onClear: () => void;
}

export default function AutofillDonorEmail(props: Donor) {
  const [donorOptions] = useState<DonorResponse[]>(props.DonorOptions);

  // Kepps track of whether the form is filled or not
  const [formFilled, setFormFilled] = useState(false);

  function onEmailChange(value: string) {
    const donorMatch = donorOptions.find(
      (don) => don.email.toLowerCase() === value.toLowerCase()
    );
    props.onChange({ ...props.DonorForm, email: value });
    if (donorMatch) {
      // Pass selected donor details back to parent component
      props.onDonorSelect(donorMatch);
      setFormFilled(true);
    } else if (formFilled) {
      clear_form();
    }
  }

  function clear_form() {
    if (props.disable) return;
    props.onChange({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      _id: '',
    });
    setFormFilled(false);
  }

  return (
    <Autocomplete
      freeSolo
      autoComplete
      value={props.DonorForm.email ?? ''}
      options={donorOptions}
      disableClearable={props.disable}
      disabled={props.disable}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(don) => (typeof don === 'string' ? don : don.email)}
      renderOption={(optionProps, option) => {
        return (
          <li {...optionProps} key={option._id}>
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
          disabled={props.disable}
          inputProps={{
            ...params.inputProps,
            readOnly: props.disable, // Prevents dropdown when disable
          }}
        />
      )}
      onInputChange={(_, value) => {
        onEmailChange(value);
      }}
      onChange={(_, value) => {
        if (!value) {
          clear_form();
          props.onClear();
        }
      }}
    />
  );
}
