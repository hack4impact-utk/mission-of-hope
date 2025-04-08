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
import { useState } from 'react';

interface itemFormProps {
  itemForm: ItemFormData;
  onChange: (itemForm: ItemFormData) => void;
  disabled: boolean;
  categories: string[];
}

export default function ItemForm(props: itemFormProps) {
  const [highValueError, setHighValueError] = useState('');
  const [lowValueError, setLowValueError] = useState('');

  const formatPriceFields = (
    value: string,
    onChange: (value: string) => void,
    setError: (error: string) => void
  ): string | void => {
    if (value === '') return;
    // Validate high and low values
    if (Number(value) < 0 || isNaN(Number(value))) {
      setError('value must be a positive number');
      return;
    } else {
      setError('');
    }

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
          required
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
              required
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
            error={!!highValueError}
            label="High Value"
            id="highValue"
            type="number"
            value={props.itemForm.high?.toString() || ''}
            onChange={(e) =>
              props.onChange({
                ...props.itemForm,
                high: Number(e.target.value),
              })
            }
            onBlur={(e) => {
              return formatPriceFields(
                e.target.value,
                (value) => {
                  props.onChange({
                    ...props.itemForm,
                    high: parseFloat(value),
                  });
                },
                setHighValueError
              );
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          {highValueError && (
            <Typography variant="caption" color="error">
              {highValueError}
            </Typography>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth disabled={props.disabled}>
          <InputLabel htmlFor="lowValue">Low Value</InputLabel>
          <OutlinedInput
            // error={!!lowValueError}
            label="Low Value"
            id="lowValue"
            type="number"
            value={props.itemForm.low?.toString() || ''}
            onChange={(e) => {
              props.onChange({
                ...props.itemForm,
                low: Number(e.target.value),
              });
            }}
            onBlur={(e) => {
              formatPriceFields(
                e.target.value,
                (value) =>
                  props.onChange({ ...props.itemForm, low: parseFloat(value) }),
                setLowValueError
              );
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          {lowValueError && (
            <Typography variant="caption" color="error">
              {lowValueError}
            </Typography>
          )}
        </FormControl>
      </Grid>
    </>
  );
}
