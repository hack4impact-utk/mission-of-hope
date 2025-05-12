'use client';

import {
  Autocomplete,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { ItemResponse } from '@/types/items';
import { DonationItemFormData } from '@/types/forms/donationItem';
import { useEffect, useState } from 'react';
import ApiAutoComplete, { ApiAutocompleteOption } from '../ApiAutoComplete';

function getPriceFormatted(value: string): number {
  const numberValue = Number(value);
  if (numberValue < 0 || isNaN(numberValue)) {
    return numberValue;
  }
  return Number(numberValue.toFixed(2));
}

interface DonationItemFormProps {
  donationItemData: DonationItemFormData;
  categoryOptions: { label: string }[];
  onChange: (donationItemData: DonationItemFormData) => void;
  disabled?: boolean;
  fieldErrors?: Record<string, string[]>;
  index: number;
}

export default function DonationItemForm({
  donationItemData,
  onChange,
  disabled,
  categoryOptions,
  fieldErrors = {},
  index,
}: DonationItemFormProps) {
  const [isNew, setIsNew] = useState<boolean>(false);
  const [itemOption, setItemOption] = useState<ApiAutocompleteOption | null>(
    donationItemData.item && donationItemData.item._id
      ? {
          label: donationItemData.item.name,
          value: donationItemData.item._id,
        }
      : null
  );
  const [highLowVals, setHighLowVals] = useState<[string, string]>([
    'High',
    'Low',
  ]);

  const base = `items[${index}]`;
  const itemError = fieldErrors[`${base}.item`]?.[0];
  const quantityError = fieldErrors[`${base}.quantity`]?.[0];
  const barcodeError = fieldErrors[`${base}.barcode`]?.[0];
  const categoryError = fieldErrors[`${base}.item.category`]?.[0];
  const evaluationError = fieldErrors[`${base}.value.evaluation`]?.[0];
  const priceError = fieldErrors[`${base}.value.price`]?.[0];

  const updateHighLowVals = (newOrUsed: string) => {
    if (newOrUsed === 'Used' && donationItemData.item) {
      setHighLowVals([
        `High ($${donationItemData.item.high})`,
        `Low ($${donationItemData.item.low})`,
      ]);
    } else {
      setHighLowVals(['High', 'Low']);
    }
  };

  const handleItemChange = async (newItem: ApiAutocompleteOption | null) => {
    if (!newItem) {
      setHighLowVals(['High', 'Low']);
      onChange({ ...donationItemData, item: undefined });
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
      onChange({ ...donationItemData, item: itemData });
      setIsNew(false);
    }
  };

  const handleCategoryChange = (newCategory: { label: string } | null) => {
    onChange({
      ...donationItemData,
      item: {
        ...donationItemData.item,
        name: donationItemData.item?.name || '',
        category: newCategory?.label || '',
      },
    });
  };

  useEffect(() => {
    setItemOption((curr) =>
      donationItemData.item && donationItemData.item._id && !curr
        ? {
            label: donationItemData.item.name,
            value: donationItemData.item._id,
          }
        : curr
    );
  }, [donationItemData.item]);

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
            error: !!itemError,
            helperText: itemError,
          }}
          creatable
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          fullWidth
          label="Quantity"
          type="number"
          required
          value={donationItemData.quantity ?? ''}
          onChange={(e) =>
            onChange({
              ...donationItemData,
              quantity: Number(e.target.value),
            })
          }
          disabled={disabled}
          error={!!quantityError}
          helperText={quantityError}
        />
      </Grid>

      <Grid item xs={12} sm={8}>
        <TextField
          fullWidth
          label="Barcode"
          value={donationItemData.barcode ?? ''}
          onChange={(e) =>
            onChange({ ...donationItemData, barcode: e.target.value })
          }
          required
          disabled={disabled}
          error={!!barcodeError}
          helperText={barcodeError}
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <Autocomplete
          value={
            donationItemData.item?.category
              ? { label: donationItemData.item.category }
              : null
          }
          isOptionEqualToValue={(o, v) => o.label === v.label}
          disabled={!isNew}
          options={categoryOptions}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              required
              error={!!categoryError}
              helperText={categoryError}
            />
          )}
          onChange={(_, newCat) => handleCategoryChange(newCat)}
        />
      </Grid>

      {donationItemData.item && (
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required error={!!evaluationError}>
            <InputLabel>New or Used?</InputLabel>
            <Select
              value={donationItemData.newOrUsed ?? ''}
              onChange={(e) => {
                const val = e.target.value as string;
                setIsNew(val === 'New');
                onChange({
                  ...donationItemData,
                  value: {
                    ...donationItemData.value,
                    evaluation: val === 'New' ? 'New' : 'High',
                  },
                  newOrUsed: val,
                });
                updateHighLowVals(val);
              }}
              label="New or Used?"
              disabled={disabled || !donationItemData.item._id}
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Used">Used</MenuItem>
            </Select>
            <FormHelperText>{evaluationError}</FormHelperText>
          </FormControl>
        </Grid>
      )}

      <Grid item xs={12} sm={6}>
        {donationItemData.newOrUsed === 'New' && (
          <TextField
            fullWidth
            label="Price"
            type="number"
            required
            value={donationItemData.value?.price ?? ''}
            onChange={(e) =>
              onChange({
                ...donationItemData,
                value: {
                  ...donationItemData.value,
                  price: Number(e.target.value),
                },
              })
            }
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
            error={!!priceError}
            helperText={priceError}
          />
        )}
        {donationItemData.newOrUsed === 'Used' && (
          <FormControl fullWidth required error={!!evaluationError}>
            <InputLabel id="high-or-low-value-label">
              High or Low Value?
            </InputLabel>
            <Select
              labelId="high-or-low-value-label"
              value={donationItemData.highOrLow ?? ''}
              onChange={(e) => {
                const val = e.target.value as string;
                onChange({
                  ...donationItemData,
                  highOrLow: val,
                  value: {
                    evaluation: val === 'High' ? 'High' : 'Low',
                    price:
                      val === 'High'
                        ? (donationItemData.item?.high as number)
                        : (donationItemData.item?.low as number),
                  },
                });
              }}
              label="High or Low Value"
            >
              <MenuItem value="High">{highLowVals[0]}</MenuItem>
              <MenuItem value="Low">{highLowVals[1]}</MenuItem>
            </Select>
            <FormHelperText>{evaluationError}</FormHelperText>
          </FormControl>
        )}
      </Grid>
    </>
  );
}
