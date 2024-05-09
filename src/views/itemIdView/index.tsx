'use client';
import ItemForm from '@/components/itemForm';
import { ItemFormData } from '@/types/forms/item';
import mohColors from '@/utils/moh-theme';
import { ThemeProvider } from '@emotion/react';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ItemResponse, UpdateItemRequest } from '@/types/items';

interface itemProps {
  id: string;
  item: ItemResponse;
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    moh: true;
  }
}

export default function ItemIdView(props: itemProps) {
  const [editSwitch, setEditSwitch] = useState<boolean>(false);
  const [itemForm, setItemForm] = useState<ItemFormData>({
    name: props.item.name,
    category: props.item.category,
    high: props.item.high ?? 0,
    low: props.item.low ?? 0,
    highString: props.item.high?.toFixed(2) ?? '',
    lowString: props.item.low?.toFixed(2) ?? '',
  } as ItemFormData);

  const setItemFormWithItem = (item: ItemResponse) => {
    setItemForm({
      name: item.name,
      category: item.category,
      high: item.high ?? 0,
      low: item.low ?? 0,
      highString: item.high?.toFixed(2) ?? '',
      lowString: item.low?.toFixed(2) ?? '',
    } as ItemFormData);
  };

  const handleCancel = () => {
    // Reset the form data to initial donor data
    setItemFormWithItem(props.item);
    setEditSwitch(false); // Optionally turn off edit mode
  };

  const handleUpdate = async () => {
    if (!props.item._id) {
      console.error('Item ID is missing');
      return;
    }

    try {
      const item: UpdateItemRequest = {
        name: itemForm.name,
        category: itemForm.category,
        high: itemForm.high,
        low: itemForm.low,
      };

      const response = await fetch(`/api/items/${props.item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to update item';
        try {
          // Attempt to parse the error message from the server response
          const errorResponse = await response.json();
          if (errorResponse && errorResponse.error) {
            errorMessage = errorResponse.error;
          }
        } catch {
          throw new Error(errorMessage);
        }
        throw new Error(errorMessage);
      }

      const updatedItem = await response.json();
      setItemFormWithItem(updatedItem);
      setEditSwitch(false); // Optionally turn off edit mode
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <ThemeProvider theme={mohColors}>
      <Grid container spacing={2}>
        <Grid item xs={0} md={2} sm={1}></Grid>
        <Grid item xs={12} md={8} sm={10}>
          <Box p={2} pb={0}>
            <Button
              variant="contained"
              color="moh"
              startIcon={<ArrowBack></ArrowBack>}
              onClick={() => (window.location.href = `/item/`)}
            >
              View Items
            </Button>
          </Box>
          <Box
            sx={{
              border: '1px solid #00000030',
              borderRadius: '10px',
              boxShadow: '0px 4px 4px 0px #00000040',
            }}
            // width={"60%"}
            p={2}
            m={2}
          >
            <Grid container spacing={2} sx={{ pl: 2, pr: 2 }}>
              <Grid item xs={12} sm={12}>
                <Typography variant="h4">Edit Item</Typography>
                <Divider></Divider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editSwitch}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => setEditSwitch(event.target.checked)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    }
                    label="Edit"
                  />
                </FormGroup>
              </Grid>
              <ItemForm
                itemForm={itemForm}
                onChange={setItemForm}
                disabled={!editSwitch}
              ></ItemForm>
              <Grid item xs={3} sm={6}></Grid>
              <Grid item xs={3} sm={3}>
                <Button
                  sx={{
                    '&:hover': {
                      backgroundColor: '#666666ff',
                    },
                    backgroundColor: '#666666cc',
                  }}
                  fullWidth
                  disabled={!editSwitch}
                  variant="contained"
                  onClick={handleCancel}
                  // color='moh'
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Button
                  fullWidth
                  disabled={!editSwitch}
                  variant="contained"
                  onClick={handleUpdate}
                  color="moh"
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={0} md={2} sm={1}></Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
