import { ItemResponse } from '@/types/items';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

interface Item {
  ItemOptions: ItemResponse[];
  onItemSelect: (item: string) => void;
  category: string;
  value: string;
  disabled?: boolean;
}

export default function AutofillItem(props: Item) {
  const [itemOptions] = useState<ItemResponse[]>(props.ItemOptions);
  const filteredItems = itemOptions.filter((item) => {
    if (!props.category) {
      return true;
    }
    return item.category === props.category;
  });

  function onItemChange(value: string) {
    const itemMatch = itemOptions.filter(
      (item) => item.name.toLowerCase() === value.toLowerCase()
    );
    if (itemMatch.length > 0 || value === '') {
      // Pass selected Item details back to parent component
      props.onItemSelect(value);
    }
  }

  return (
    <Autocomplete
      freeSolo
      autoComplete
      value={props.value ?? ''}
      options={filteredItems}
      disabled={props.disabled}
      isOptionEqualToValue={(option, value) => option.name === value.name}
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
          type="string"
        />
      )}
      onInputChange={(_, value) => {
        onItemChange(value);
      }}
    />
  );
}
