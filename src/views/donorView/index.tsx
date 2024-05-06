'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DonorResponse } from '@/types/persons';
import { Container, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface DonorViewProps {
  donors: DonorResponse[];
}

export default function DonorView({ donors }: DonorViewProps) {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', maxWidth: 30, flex: 0.5 },
    { field: 'name', headerName: 'Name', maxWidth: 150, flex: 0.5 },
    { field: 'address', headerName: 'Address', maxWidth: 250, flex: 0.5 },
    { field: 'city', headerName: 'City', maxWidth: 200, flex: 0.6 },
    { field: 'state', headerName: 'State', maxWidth: 70, flex: 0.5 },
    { field: 'zip', headerName: 'Zipcode', maxWidth: 150, flex: 0.5 },
    { field: 'email', headerName: 'Email', maxWidth: 250, flex: 0.6 },
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
            onClick={() => (window.location.href = `/donors/${params.value}`)} // Adjust the path as needed
          >
            <EditIcon></EditIcon>
          </IconButton>
        );
      },
    },
  ];

  const rows = donors.map((donor, index) => ({
    id: index + 1,
    name: `${donor.firstName} ${donor.lastName}`,
    address: donor.address,
    city: donor.city,
    state: donor.state,
    zip: donor.zip,
    email: donor.email,
    edit: donor._id,
  }));

  return (
    <Container>
      <Box sx={{ maxWidth: '70vw', height: '78vh' }}>
        <Box p={3}>
          <Typography variant="h4">Donor List</Typography>
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
