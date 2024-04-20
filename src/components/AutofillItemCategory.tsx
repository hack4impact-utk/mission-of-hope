import { ItemResponse } from '@/types/items';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

interface Item {
  ItemOptions: ItemResponse[];
  onItemSelect: (item: ItemResponse) => void;
}

export default function AutofillItem(props: Item) {
  const [itemOptions] = useState<ItemResponse[]>(props.ItemOptions);

  function onItemChange(value: string) {
    const itemMatch = itemOptions.find(
      (item) => item.name.toLowerCase() === value.toLowerCase()
    );
    if (itemMatch) {
      // Pass selected Item details back to parent component
      props.onItemSelect(itemMatch);
    }
  }

  return (
    <Autocomplete
      freeSolo
      autoComplete
      value={''}
      options={itemOptions}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      getOptionLabel={(item) => (typeof item === 'string' ? item : item.name)}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Donated Item"
          id="outlined-required"
          value={''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onItemChange(e.target.value);
          }}
          type="string"
        />
      )}
      onInputChange={(_, value) => {
        if (value) {
          onItemChange(value);
        }
      }}
    />
  );
}
