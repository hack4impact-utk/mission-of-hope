'use client';

import {
  Autocomplete,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ItemResponse } from '@/types/items';
import { DonationItemFormData } from '@/types/forms/donationItem';
import { useState } from 'react';
import ApiAutoComplete, { ApiAutocompleteOption } from '../ApiAutoComplete';

function getPriceFormatted(value: string): number {
  const numberValue = Number(value);
  // Validate high and low values
  if (numberValue < 0 || isNaN(numberValue)) {
    return numberValue;
  }

  const formattedValue = Number(numberValue.toFixed(2));
  return formattedValue;
}

interface DonationItemFormProps {
  donationItemData: DonationItemFormData;
  categoryOptions: { label: string }[];
  onChange: (donationItemDatas: DonationItemFormData) => void;
  disabled?: boolean;
  // validationErrors: Record<string, string> | undefined;
}
export default function DonationItemForm({
  donationItemData,
  onChange,
  disabled,
  categoryOptions,
}: DonationItemFormProps) {
  // Tracking the value of newOrUsed to render Price or highOrLow
  const [isNew, setIsNew] = useState<boolean>(false);
  const [itemOption, setItemOption] = useState<ApiAutocompleteOption | null>(
    null
  );

  // Tracking the current high/low values to show it instantly
  const [highLowVals, setHighLowVals] = useState<[string, string]>([
    'High',
    'Low',
  ]);

  // Show/clear the High/Low values based on existence of the ItemResponse
  const updateHighLowVals = (newOrUsed: string) => {
    if (newOrUsed === 'Used' && donationItemData.item) {
      setHighLowVals([
        `High ($${donationItemData.item.high})`,
        `Low ($${donationItemData.item.low})`,
      ]);
    } else if (newOrUsed === 'Used') {
      setHighLowVals(['High', 'Low']);
    }
  };

  const handleItemChange = async (newItem: ApiAutocompleteOption | null) => {
    if (!newItem) {
      setHighLowVals(['High', 'Low']);
      onChange({
        ...donationItemData,
        item: undefined,
      });
      setIsNew(false);
      return;
    }

    if (newItem.created) {
      onChange({
        ...donationItemData,
        item: {
          ...donationItemData.item,
          name: newItem.value,
          category: '',
          _id: undefined,
        },
        newOrUsed: 'New',
      });
      setIsNew(true);
    } else {
      const itemRes = await fetch('/api/items/' + newItem.value);
      const itemData: ItemResponse = await itemRes.json();
      onChange({
        ...donationItemData,
        item: itemData,
      });
      setIsNew(false);
    }
  };

  const handleCategoryChange = (newCategory: { label: string } | null) => {
    if (!newCategory) {
      onChange({
        ...donationItemData,
        item: {
          ...donationItemData.item,
          name: donationItemData.item?.name || '',
          category: '',
        },
      });
    } else {
      onChange({
        ...donationItemData,
        item: {
          ...donationItemData.item,
          name: donationItemData.item?.name || '',
          category: newCategory.label,
        },
      });
    }
  };

  return (
    <>
      <Grid item xs={12} sm={8}>
        <ApiAutoComplete
          apiUrl="/api/items/autocomplete"
          value={itemOption}
          onChange={(newItem) => {
            setItemOption(newItem);
            handleItemChange(newItem);
          }}
          label="Item"
          TextFieldProps={{
            required: true,
          }}
          creatable
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Quantity"
          type="number"
          required
          value={donationItemData.quantity ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange({
              ...donationItemData,
              quantity: Number(e.target.value),
            });
          }}
          disabled={disabled}
          // error={!!validationErrors?.quantity}
          // helperText={validationErrors?.quantity}
        />
      </Grid>
      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Barcode"
          type="string"
          value={donationItemData.barcode ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange({
              ...donationItemData,
              barcode: e.target.value,
            });
          }}
          required
          disabled={disabled}
          // error={!!validationErrors?.quantity}
          // helperText={validationErrors?.quantity}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Autocomplete
          value={
            donationItemData.item?.category
              ? {
                  label: donationItemData.item.category,
                }
              : null
          }
          isOptionEqualToValue={(option, value) => option.label == value.label}
          disabled={!isNew}
          disablePortal
          options={categoryOptions}
          renderInput={(params) => (
            <TextField {...params} label="Category" required />
          )}
          onChange={(_, newCategory) => handleCategoryChange(newCategory)}
        />
      </Grid>
      {donationItemData.item && (
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel>New or Used?</InputLabel>
            <Select
              value={donationItemData.newOrUsed ?? ''}
              onChange={(e) => {
                if (e.target.value === 'New') {
                  setIsNew(true);
                } else {
                  setIsNew(false);
                }
                onChange({
                  ...donationItemData,
                  value: {
                    ...donationItemData.value,
                    evaluation: e.target.value == 'New' ? 'New' : 'High',
                  },
                  newOrUsed: e.target.value,
                });
                updateHighLowVals(e.target.value);
              }}
              label="New or Used?"
              id="new-or-used"
              disabled={disabled || !donationItemData.item._id}
              // error={!!validationErrors?.newOrUsed}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
            {/* <FormHelperText>{validationErrors?.newOrUsed}</FormHelperText> */}
          </FormControl>
        </Grid>
      )}

      <Grid item xs={12} sm={6}>
        {donationItemData.newOrUsed == 'New' && ( // Display Price field if the item is "New"
          <FormControl fullWidth>
            <TextField
              id="price"
              label="Price"
              type="number"
              required
              value={donationItemData.value?.price ?? ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onChange({
                  ...donationItemData,
                  value: {
                    ...donationItemData.value,
                    price: Number(e.target.value),
                  },
                });
              }}
              onBlur={(e) =>
                onChange({
                  ...donationItemData,
                  value: {
                    ...donationItemData.value,
                    price: getPriceFormatted(e.target.value),
                  },
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </FormControl>
        )}
        {donationItemData.newOrUsed == 'Used' && (
          // Display HighLow field if the item is "Used"
          <FormControl
            fullWidth
            // Disable if Item or Category is not selected or invalid
            required
          >
            <InputLabel id="high-or-low-value-label">
              High or Low Value?
            </InputLabel>
            <Select
              labelId="high-or-low-value-label"
              value={donationItemData.highOrLow ?? ''}
              onChange={(e) => {
                onChange({
                  ...donationItemData,
                  highOrLow: e.target.value,
                  value: {
                    evaluation: e.target.value.toLowerCase().includes('high')
                      ? 'High'
                      : 'Low',
                    price: (e.target.value.toLowerCase().includes('high')
                      ? donationItemData.item?.high
                      : donationItemData.item?.low) as number,
                  },
                });
              }}
              label="High or Low Value"
              id="high-or-low-value"
              // error={!!validationErrors?.highOrLow}
            >
              <MenuItem value="High">{highLowVals[0]}</MenuItem>
              <MenuItem value="Low">{highLowVals[1]}</MenuItem>
            </Select>
            {/* <FormHelperText>{validationErrors?.highOrLow}</FormHelperText> */}
          </FormControl>
          /*{ onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setHighOrLow(e.target.value);
                }}}*/
        )}
      </Grid>
    </>
  );
}
