import { ItemResponse } from '@/types/items';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

interface Item {
  ItemOptions: ItemResponse[];
  onCategorySelect: (category: string) => void;
  name: string;
  value: string;
}

export default function AutofillCategory(props: Item) {
  const [itemOptions] = useState<ItemResponse[]>(props.ItemOptions);
  const filteredItems = itemOptions.filter((item) => {
    if (!props.name) {
      return true;
    }
    return item.name === props.name;
  });

  function onCategoryChange(value: string) {
    const categoryMatches = itemOptions.filter(
      (item) => item.category.toLowerCase() === value.toLowerCase()
    );
    if (categoryMatches.length > 0 || value === '') {
      // Pass selected Item details back to parent component
      props.onCategorySelect(value);
    }
  }
  //

  return (
    <>
      <Autocomplete
        freeSolo
        autoComplete
        value={props.value ?? ''}
        options={filteredItems}
        isOptionEqualToValue={(option, value) =>
          option.category === value.category
        }
        getOptionLabel={(item) =>
          typeof item === 'string' ? item : item.category
        }
        renderOption={(props, option) => {
          return (
            <li {...props} key={option._id}>
              {option.category}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Category"
            id="outlined-required"
            value={''}
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   console.log('hello');
            //   onCategoryChange(e.target.value);
            // }}
            type="string"
          />
        )}
        onInputChange={(_, value) => {
          onCategoryChange(value);
          console.log(value);

          // whent you type or click, what event handler is actually being called and what does it return?
          // then, pass the setstate from the parent component to update the parent state with the new category
          // deletion is not updating it
        }}
      />
    </>
  );
}
