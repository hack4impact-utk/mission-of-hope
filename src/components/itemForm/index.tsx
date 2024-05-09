import { ItemFormData } from '@/types/forms/item';
import {
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
        <TextField
          required
          label="Category"
          variant="outlined"
          fullWidth
          disabled={props.disabled}
          value={props.itemForm.category}
          onChange={(e) =>
            props.onChange({ ...props.itemForm, category: e.target.value })
          }
        />
        {/* Consider using Select component here for dropdown */}
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth disabled={props.disabled}>
          <InputLabel htmlFor="highValue">High Value</InputLabel>
          <OutlinedInput
            error={!!highValueError}
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
              return formatPriceFields(
                e.target.value,
                (value) => {
                  props.onChange({ ...props.itemForm, highString: value });
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
            value={props.itemForm.lowString}
            onChange={(e) => {
              props.onChange({
                ...props.itemForm,
                low: Number(e.target.value),
                lowString: e.target.value,
              });
            }}
            onBlur={(e) => {
              formatPriceFields(
                e.target.value,
                (value) =>
                  props.onChange({ ...props.itemForm, lowString: value }),
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
