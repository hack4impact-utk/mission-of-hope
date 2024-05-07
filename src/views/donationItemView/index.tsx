'use client';
import React from 'react';
import { Box, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DonationItemResponse } from '@/types/donation';

interface DonationItemProps {
  donationItems: DonationItemResponse[];
}

const columns: GridColDef[] = [
  //declared the columns for the data grid and their stylings
  { field: 'product', headerName: 'Product', width: 300 },
  { field: 'category', headerName: 'Category', width: 300 },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  {
    field: 'evaluation',
    headerName: 'Evaluation',
    width: 200,
  },
  {
    field: 'barcode',
    headerName: 'Barcode (if food)',
    width: 200,
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
  { field: 'price', headerName: 'Price', width: 200 },
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
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={formattedRows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
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
  );
}
