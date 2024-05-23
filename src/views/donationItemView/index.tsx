'use client';
import React from 'react';
import { Box, Chip, Container, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DonationItemResponse } from '@/types/donation';
import EditIcon from '@mui/icons-material/Edit';

interface DonationItemProps {
  donationItems: DonationItemResponse[];
}

const columns: GridColDef[] = [
  //declared the columns for the data grid and their stylings
  { field: 'product', headerName: 'Product', maxWidth: 300, flex: 0.4 },
  { field: 'category', headerName: 'Category', maxWidth: 300, flex: 0.4 },
  { field: 'quantity', headerName: 'Quantity', maxWidth: 80, flex: 0.5 },
  {
    field: 'evaluation',
    headerName: 'Evaluation',
    maxWidth: 80,
    flex: 0.5,
  },
  {
    field: 'barcode',
    headerName: 'Barcode (if food)',
    maxWidth: 200,
    flex: 0.5,
    renderCell: (params) => {
      return params.value ? (
        <Chip // kept the same styling from og
          label={params.value}
          sx={{
            bgcolor: '#37954173',
            border: 'solid',
            borderColor: '#ABABAB',
          }}
        />
      ) : null;
    },
  },
  { field: 'price', headerName: 'Price', maxWidth: 100, flex: 0.5 },
  {
    field: 'edit',
    headerName: 'Edit',
    maxWidth: 80,
    flex: 0.5,
    sortable: false,
    filterable: false,
    renderCell: (params) => {
      return (
        <IconButton
          color="primary"
          size="small"
          onClick={() => (window.location.href = `/donation/${params.value}`)}
        >
          <EditIcon></EditIcon>
        </IconButton>
      );
    },
  },
];

export default function DonationItemView({ donationItems }: DonationItemProps) {
  //map the donation items to the rows
  const formattedRows = donationItems.map((row) => ({
    id: row._id,
    product: row.item.name,
    category: row.item.category,
    quantity: row.quantity,
    evaluation: row.value.evaluation,
    barcode: row.barcode,
    price: `$${row.value.price}`,
    edit: row._id,
  }));

  return (
    <Container>
      <Box sx={{ maxWidth: '73vw', height: '78vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pl: 0 }}>
          <Typography variant="h4">Inventory</Typography>
        </Box>
        <DataGrid
          rows={formattedRows}
          columns={columns}
          disableColumnFilter
          disableDensitySelector
          slots={{ toolbar: GridToolbar }} // added the toolbar to the grid
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }, // each search query will be delayed by 500ms
            },
          }}
        />
      </Box>
    </Container>
  );
}
