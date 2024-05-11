'use client';
import { DonationResponse } from '@/types/donation';
import { DonorResponse } from '@/types/persons';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Container,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';

interface DonorViewProps {
  donors: DonorResponse[];
  donations: DonationResponse[];
}

export default function DonorView({ donors, donations }: DonorViewProps) {
  const [selectedMonth, setSelectedMonth] = useState<string>(
    (new Date().getMonth() + 1).toString() // Default to current month
  );

  // Function to handle month selection change
  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setSelectedMonth(event.target.value as string);
  };

  // Filter donations based on selected month
  const filteredDonations = selectedMonth
    ? donations.filter(
        (donation) =>
          parseInt(
            donation.entryDate.toString().split('T')[0].split('-')[1]
          ) === parseInt(selectedMonth)
      )
    : donations;

  // Extract unique donors from filtered donations
  const uniqueDonors = Array.from(
    new Set(filteredDonations.map((donation) => donation.donor._id))
  );

  // Prepare columns for DataGrid
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
            onClick={() => (window.location.href = `/donors/${params.value}`)}
          >
            <EditIcon></EditIcon>
          </IconButton>
        );
      },
    },
  ];

  // Prepare rows for DataGrid
  const rows = uniqueDonors.map((donorId, index) => {
    const donor = donors.find((donor) => donor._id === donorId);
    return {
      id: index + 1,
      name: `${donor?.firstName} ${donor?.lastName}`,
      address: donor?.address,
      city: donor?.city,
      state: donor?.state,
      zip: donor?.zip,
      email: donor?.email,
      edit: donor?._id,
    };
  });

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" sx={{ mr: 2 }}>
          Donor List
        </Typography>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          variant="outlined"
          displayEmpty
          inputProps={{ 'aria-label': 'Select month' }}
        >
          <MenuItem value="">All Months</MenuItem>
          {/* Generate month options */}
          {[...Array(12).keys()].map((month) => (
            <MenuItem key={month} value={month + 1}>
              {new Date(2000, month).toLocaleString('default', {
                month: 'long',
              })}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ maxWidth: '80vw', height: '78vh' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          disableColumnFilter
          disableColumnSelector
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
