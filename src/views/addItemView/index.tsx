'use client';
import mohColors from '@/utils/moh-theme';
import { ThemeProvider } from '@emotion/react';
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
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
};

interface AddItemViewProps {
  categories: string[];
}

export default function AddItemView(props: AddItemViewProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false); // For the loading wheel
  const [itemFormData, setItemFormData] =
    useState<ItemFormData>(initialFormData);
  const { showSnackbar } = useSnackbar();

  const handleChange = (newItemForm: ItemFormData) => {
    setItemFormData(newItemForm);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { high, low } = itemFormData;
    if (high == undefined || low == undefined) {
      return;
    }

    // Check if high is greater than low
    if (high < low) {
      showSnackbar(
        'Low Value must be less than or equal to High Value',
        'error'
      );
      return;
    }

    // Start showing the loading wheel
    setIsLoading(true);

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
    } finally {
      // Stop showing the wheel
      setIsLoading(false);
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
                categories={props.categories}
                disabled={isLoading}
              />
              <Grid item xs={12}>
                <Button
                  disabled={isLoading}
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
                  {isLoading ? (
                    <CircularProgress color="inherit"></CircularProgress>
                  ) : (
                    'Add Item'
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
