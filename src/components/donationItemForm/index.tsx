'use client';

import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import AutofillCategory from '../donation-form/AutofillCategory';
import AutofillItem from '../donation-form/AutofillItem';
import { ItemResponse } from '@/types/items';
import { DonationItemFormData } from '@/types/forms/donationItem';
import { useEffect } from 'react';

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
  itemOptions: ItemResponse[];
  donationItemData: DonationItemFormData;
  onChange: (donationItemDatas: DonationItemFormData) => void;
  disabled?: boolean;
  // validationErrors: Record<string, string> | undefined;
}

export default function DonationItemForm({
  itemOptions,
  donationItemData,
  onChange,
  disabled,
}: DonationItemFormProps) {
  useEffect(() => {
    if (donationItemData.newOrUsed === 'Used') {
      if (donationItemData.highOrLow === 'High') {
        onChange({
          ...donationItemData,
          price: donationItemData.itemRes.high ?? 0,
        });
      }
      if (donationItemData.highOrLow === 'Low') {
        onChange({
          ...donationItemData,
          price: donationItemData.itemRes.low ?? 0,
        });
      }
    }
  });

  const handleItemSelect = (name: string | ItemResponse) => {
    if (typeof name === 'string') {
      onChange({ ...donationItemData, name: name });
    } else {
      onChange({ ...donationItemData, name: name.name, itemRes: name });
    }
  };

  const handleCategorySelect = (category: string | ItemResponse) => {
    if (typeof category === 'string') {
      onChange({ ...donationItemData, category: category });
    } else {
      onChange({
        ...donationItemData,
        category: category.category,
        itemRes: category,
      });
    }
  };

  return (
    <>
      <Grid item xs={12} sm={8}>
        <AutofillItem
          ItemOptions={itemOptions}
          onItemSelect={handleItemSelect}
          category={donationItemData.category}
          value={donationItemData.name}
          disabled={disabled}
          // error={!!validationErrors?.donatedItemName}
          // helperText={validationErrors?.donatedItemName}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Quantity"
          type="number"
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
          disabled={disabled}
          // error={!!validationErrors?.quantity}
          // helperText={validationErrors?.quantity}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <AutofillCategory
          ItemOptions={itemOptions}
          onCategorySelect={handleCategorySelect}
          name={donationItemData.name}
          value={donationItemData.category}
          disabled={disabled}
          // error={!!validationErrors?.category}
          // helperText={validationErrors?.category}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl fullWidth disabled={disabled}>
          <InputLabel>New or Used?</InputLabel>
          <Select
            value={donationItemData.newOrUsed ?? ''}
            onChange={(e) => {
              onChange({ ...donationItemData, newOrUsed: e.target.value });
            }}
            label="New or Used?"
            id="new-or-used"
            // error={!!validationErrors?.newOrUsed}
          >
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
          </Select>
          {/* <FormHelperText>{validationErrors?.newOrUsed}</FormHelperText> */}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={4}>
        <FormControl
          fullWidth
          disabled={donationItemData.newOrUsed !== 'Used' || disabled} // Disable if new
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
              });
            }}
            label="High or Low Value?"
            id="high-or-low-value"
            // error={!!validationErrors?.highOrLow}
          >
            <MenuItem value="High">High</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
          </Select>
          {/* <FormHelperText>{validationErrors?.highOrLow}</FormHelperText> */}
        </FormControl>
        {/* onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
               setHighOrLow(e.target.value);
            }}*/}
      </Grid>
      <Grid item xs={12} sm={3} md={3.5}>
        <TextField
          id="price"
          label="Price"
          type="number"
          value={donationItemData.price ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange({
              ...donationItemData,
              price: Number(e.target.value),
            });
          }}
          onBlur={(e) =>
            onChange({
              ...donationItemData,
              price: getPriceFormatted(e.target.value),
            })
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          disabled={donationItemData.newOrUsed !== 'New' || disabled} // Disable if used
          fullWidth
          // error={!!validationErrors?.price}
          // helperText={validationErrors?.price}
        />
      </Grid>
    </>
  );
}
