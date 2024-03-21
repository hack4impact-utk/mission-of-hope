'use client'; //Needed for useState
import { Autocomplete, TextField } from '@mui/material';
import { DonationItemResponse } from '@/types/donation';
import { useState } from 'react';

interface Props {
  donationItems: DonationItemResponse[];
  donationItemData: DonationItemResponse;
  onChange: (donationItemData: DonationItemResponse) => void;
}

export default function Home(props: Props) {
  const [donationItemOptions] = useState<DonationItemResponse[]>(
    props.donationItems
  );
  return (
    <Autocomplete
      sx={{ mt: 2 }}
      freeSolo
      autoComplete
      value={props.donationItemData.item.name || ''}
      options={donationItemOptions}
      getOptionLabel={(donIt) =>
        typeof donIt === 'string' ? donIt : donIt.item.name
      }
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.item.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Email Address"
          onChange={(e) => {
            props.onChange({
              ...props.donationItemData,
              item: { ...props.donationItemData.item, name: e.target.value },
            });
          }}
        />
      )}
    />
  );
}
