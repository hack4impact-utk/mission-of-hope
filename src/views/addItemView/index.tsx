'use client';
import mohColors from '@/utils/moh-theme';
import { ThemeProvider } from '@emotion/react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import useSnackbar from '@/hooks/useSnackbar';
import { ItemFormData } from '@/types/forms/item';
import { CreateItemRequest } from '@/types/items';
import ItemForm from '@/components/itemForm';

export default function AddItemView() {
  const [itemFormData, setItemFormData] = useState<ItemFormData>(
    {} as ItemFormData
  );

  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        setItemFormData({} as ItemFormData);
      } else {
        // Handle error response
        console.error('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
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
          <Divider></Divider>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent="flex-start">
              <ItemForm
                itemForm={itemFormData}
                onChange={setItemFormData}
                disabled={false}
              ></ItemForm>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="moh"
                  fullWidth
                  // disabled={highValueError || lowValueError ? true : false}
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
