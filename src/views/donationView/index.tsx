'use client';
import { DonationResponse } from '@/types/donation';
import { Box, Container, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

interface DonationViewProps {
  donations: DonationResponse[];
}

export default function DonationView({ donations }: DonationViewProps) {
  const rows = donations.map((donation, index) => ({
    id: index + 1,
    donor: `${donation.donor.firstName} ${donation.donor.lastName}`,
    quantity: donation.items.length,
    user_name: donation.user.email,
    date: donation.entryDate,
    edit: donation._id,
  }));

  const columns: GridColDef[] = [
    { field: 'donor', headerName: 'Donor Name', width: 250, flex: 0.5 },
    { field: 'quantity', headerName: 'Quantity', width: 50, flex: 0.5 },
    { field: 'user_name', headerName: 'User Email', width: 300, flex: 0.7 },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      flex: 0.5,
      valueFormatter: (value?: Date) => {
        if (!value) {
          return '';
        }
        return new Date(value).toLocaleDateString();
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
            onClick={() => (window.location.href = `/donation/${params.value}`)} // Adjust the path as needed
          >
            <EditIcon></EditIcon>
          </IconButton>
        );
      },
    },
  ];

  return (
    <Container>
      <Box sx={{ maxWidth: '73vw', height: '78vh' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pl: 0 }}>
          <Typography variant="h4" sx={{ mr: 2 }}>
            Donation List
          </Typography>
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
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
    </Container>
  );
}
