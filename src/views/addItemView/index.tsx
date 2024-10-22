'use client';
import mohColors from '@/utils/moh-theme';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import { ItemFormData } from '@/types/forms/item';
import { CreateItemRequest } from '@/types/items';
import ItemForm from '@/components/itemForm';

const initialFormData: ItemFormData = {
  name: '',
  category: '',
  high: 0,
  low: 0,
  highString: '',
  lowString: '',
};

export default function AddItemView() {
  const [itemFormData, setItemFormData] =
    useState<ItemFormData>(initialFormData);
  const { showSnackbar } = useSnackbar();

  const handleChange = (newItemForm: ItemFormData) => {
    setItemFormData(newItemForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { high, low } = itemFormData;

    // Check if high is greater than low
    if (high < low) {
      showSnackbar('Low Value greater than High Value', 'error');
      return;
    }

    // Validate form fields
    const requestData = {
      name: itemFormData.name,
      category: itemFormData.category,
      high: itemFormData.high,
      low: itemFormData.low,
    } as CreateItemRequest;

    try {
      // Send POST request to add item
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      // Check if response is successful
      if (response.ok) {
        // Handle successful response
        showSnackbar('Item added successfully.', 'success');
        // Reset form fields
        setItemFormData(initialFormData);
      } else {
        // Handle error response
        showSnackbar('Failed to add item', 'error');
      }
    } catch (error) {
      showSnackbar(`Error: ${error}`, 'error');
    }
  };

  return (
    <ThemeProvider theme={mohColors}>
      <Box display={'flex'} justifyContent={'center'}>
        <Box
          sx={{
            padding: '20px',
            margin: '20px',
            border: '1px solid #00000030',
            borderRadius: '10px',
            width: '80%',
            maxWidth: '50vw',
            boxShadow: '0px 4px 4px 0px #00000040',
          }}
        >
          <Typography variant="h4" sx={{ p: 1 }}>
            Add Item
          </Typography>
          <Divider />
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="flex-start">
              <ItemForm
                itemForm={itemFormData}
                onChange={handleChange}
                disabled={false}
              />
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="moh"
                  fullWidth
                  sx={{
                    height: 56,
                    textTransform: 'none',
                    fontSize: 'large',
                    backgroundColor: 'rgba(55, 149, 65, 0.8)',
                  }}
                >
                  Add Item
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
