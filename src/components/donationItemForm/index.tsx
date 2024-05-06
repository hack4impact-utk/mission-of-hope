'use client';
import { DonationFormData } from '@/types/forms/donation';
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useState } from 'react';

interface donationItemProps {
  donationData: DonationFormData;
  setDonationData: (donation: DonationFormData) => void;
}

function getPriceFormatted(
  value: string,
  setError: (error: string) => void
): string {
  // Validate high and low values
  if (Number(value) < 0 || isNaN(Number(value))) {
    setError('value must be a positive number');
    return value;
  } else {
    setError('');
  }

  const formattedValue = Number(value).toFixed(2);
  return formattedValue.toString();
}

export default function DonationItemForm(props: donationItemProps) {
  const [priceError, setPriceError] = useState('');
  return (
    <>
      <Grid item xs={12}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Category"
          value={props.donationData.category}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.setDonationData({
              ...props.donationData,
              category: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Donated Item"
          value={props.donationData.donatedItemName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.setDonationData({
              ...props.donationData,
              donatedItemName: e.target.value,
            });
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          id="outlined-required"
          label="Quantity"
          type="number"
          value={props.donationData.quantity}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.setDonationData({
              ...props.donationData,
              quantity: Number(e.target.value),
            });
          }}
        />
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <FormControl fullWidth>
          <InputLabel>New or Used</InputLabel>
          <Select // Change to dropdown
            value={props.donationData.newOrUsed}
            onChange={(e) => {
              props.setDonationData({
                ...props.donationData,
                newOrUsed: e.target.value,
              });
            }}
            label="New or Used"
            id="new-or-used"
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="used">Used</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={4}>
        <FormControl fullWidth>
          <InputLabel id="high-or-low-value-label">
            High or Low Value
          </InputLabel>
          <Select
            labelId="high-or-low-value-label"
            value={props.donationData.highOrLow}
            onChange={(e) => {
              props.setDonationData({
                ...props.donationData,
                highOrLow: e.target.value,
              });
            }}
            label="High or Low Value"
            id="high-or-low-value"
            disabled={props.donationData.newOrUsed !== 'used'} // Disable if new
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4} sm={4} md={4}>
        <TextField
          error={!!priceError}
          id="price"
          label="Price"
          type="number"
          value={props.donationData.price}
          helperText={priceError}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            props.setDonationData({
              ...props.donationData,
              price: Number(e.target.value),
            });
          }}
          onBlur={(e) =>
            props.setDonationData({
              ...props.donationData,
              price: Number(getPriceFormatted(e.target.value, setPriceError)),
            })
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          disabled={props.donationData.newOrUsed !== 'new'} // Disable if used
        />
      </Grid>
    </>
  );
}
