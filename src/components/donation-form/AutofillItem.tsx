import { ItemResponse } from '@/types/items';
import { Autocomplete, TextField } from '@mui/material';

interface Item {
  ItemOptions: ItemResponse[];
  onItemSelect: (item: ItemResponse) => void;
  category: string;
}

export default function AutofillItem(props: Item) {
  const filteredItems = props.ItemOptions.filter((item) => {
    if (!props.category) {
      return true;
    }
    return item.category === props.category;
  });

  function onItemChange(value: string) {
    const itemMatch = props.ItemOptions.find(
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
      options={filteredItems}
      isOptionEqualToValue={(option, value) => option.name == value.name}
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
        if (value) {
          onItemChange(value);
        }
      }}
    />
  );
}
