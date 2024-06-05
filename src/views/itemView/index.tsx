'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Container, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ItemResponse } from '@/types/items';

interface itemViewProps {
  items: ItemResponse[];
}

export default function ItemView({ items }: itemViewProps) {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', maxWidth: 30, flex: 0.5 },
    { field: 'name', headerName: 'Name', maxWidth: 300, flex: 0.5 },
    { field: 'category', headerName: 'Category', maxWidth: 300, flex: 0.5 },
    {
      field: 'high',
      headerName: 'High',
      maxWidth: 100,
      flex: 0.3,
      valueFormatter: (value?: number) => {
        if (!value) {
          return '';
        }
        return currency.format(value);
      },
    },
    {
      field: 'low',
      headerName: 'Low',
      maxWidth: 100,
      flex: 0.3,
      valueFormatter: (value?: number) => {
        if (!value) {
          return '';
        }
        return currency.format(value);
      },
    },
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
            onClick={() => (window.location.href = `/item/${params.value}`)} // Adjust the path as needed
          >
            <EditIcon></EditIcon>
          </IconButton>
        );
      },
    },
  ];

  const rows = items.map((item, index) => ({
    id: index + 1,
    name: item.name,
    category: item.category,
    high: item.high,
    low: item.low,
    edit: item._id,
  }));

  return (
    <Container>
      <Box sx={{ maxWidth: '70vw', height: '78vh' }}>
        <Box p={3}>
          <Typography variant="h4">Evaluation List</Typography>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableDensitySelector
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 }, // Optional: Configuring debounce
            },
          }}
        />
      </Box>
    </Container>
  );
}
