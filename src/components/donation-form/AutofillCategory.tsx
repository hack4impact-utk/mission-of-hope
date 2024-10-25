import { ItemResponse } from '@/types/items';
import { Autocomplete, TextField } from '@mui/material';
interface AutofillCategoryProps {
  categoryOptions: ItemResponse[];
  onCategorySelect: (category: string | ItemResponse) => void;
  name: string;
  value: string;
  disabled?: boolean;
}

export default function AutofillCategory(props: AutofillCategoryProps) {
  let selectedCategory = '';

  const filteredCategories = props.categoryOptions.filter((item) => {
    if (!props.name) {
      return true;
    }
    return item.name === props.name;
  });

  // If the filtered items gets down to one, set the value equal to said category of the item.
  if (filteredCategories.length === 1) {
    selectedCategory = filteredCategories[0].category;
  }

  function onCategoryChange(value: string) {
    const categoryMatches = props.categoryOptions.filter(
      (item) => item.category.toLowerCase() === value.toLowerCase()
    );
    if (categoryMatches.length > 0 && props.name) {
      // Pass selected Item details back to parent component
      props.onCategorySelect(categoryMatches[0]);
    } else {
      props.onCategorySelect(value);
    }
  }
  //

  return (
    <>
      <Autocomplete
        freeSolo
        autoComplete
        value={selectedCategory ?? ''}
        options={filteredCategories}
        disabled={props.disabled}
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
