import { ItemFormData } from '@/types/forms/item';
import {
  Autocomplete,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';

interface itemFormProps {
  itemForm: ItemFormData;
  onChange: (itemForm: ItemFormData) => void;
  disabled: boolean;
  categories: string[];
}

export default function ItemForm(props: itemFormProps) {
  const formatPriceFields = (
    value: string,
    onChange: (value: string) => void
  ): string | void => {
    const formattedValue = Number(value).toFixed(2);
    onChange(formattedValue);
  };

  const filteredCategories = props.categories.filter((category) => {
    const categoryRegex = new RegExp(props.itemForm.category, 'i');

    return categoryRegex.test(category);
  });

  return (
    <>
      <Grid mt={2} item xs={12}>
        <TextField
          label="Item Name"
          variant="outlined"
          fullWidth
          disabled={props.disabled}
          value={props.itemForm.name}
          onChange={(e) =>
            props.onChange({ ...props.itemForm, name: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          value={props.itemForm.category}
          freeSolo
          onInputChange={(_, value) => {
            props.onChange({ ...props.itemForm, category: value || '' });
          }}
          options={filteredCategories}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              variant="outlined"
              fullWidth
              disabled={props.disabled}
            />
          )}
        />
        {filteredCategories.length === 0 && (
          <Typography variant="caption" sx={{ color: 'gray' }}>
            This is a new category that will be added
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth disabled={props.disabled}>
          <InputLabel htmlFor="highValue">High Value</InputLabel>
          <OutlinedInput
            label="High Value"
            id="highValue"
            type="number"
            value={props.itemForm.highString}
            onChange={(e) =>
              props.onChange({
                ...props.itemForm,
                high: Number(e.target.value),
                highString: e.target.value,
              })
            }
            onBlur={(e) => {
              return formatPriceFields(e.target.value, (value) => {
                props.onChange({ ...props.itemForm, highString: value });
              });
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth disabled={props.disabled}>
          <InputLabel htmlFor="lowValue">Low Value</InputLabel>
          <OutlinedInput
            label="Low Value"
            id="lowValue"
            type="number"
            value={props.itemForm.lowString}
            onChange={(e) => {
              props.onChange({
                ...props.itemForm,
                low: Number(e.target.value),
                lowString: e.target.value,
              });
            }}
            onBlur={(e) => {
              formatPriceFields(e.target.value, (value) =>
                props.onChange({ ...props.itemForm, lowString: value })
              );
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Grid>
    </>
  );
}
