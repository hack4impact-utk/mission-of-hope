'use client';
import { useEffect } from 'react';
import { DonationResponse } from '@/types/donation';
import {
  Box,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import useSearch from '@/hooks/useSearch';
import useMonth from '@/hooks/useMonth';
import useYear from '@/hooks/useYear';

interface DonationViewProps {
  donations: DonationResponse[];
}

export default function DonationView({ donations }: DonationViewProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();
  const { selectedMonth, monthQuery, setMonthQuery } = useMonth();
  const { selectedYear, yearQuery, setYearQuery } = useYear();
  const startYear = 2024;

  useEffect(() => {
    if (!yearQuery || yearQuery === '') {
      setYearQuery('0'); // Default to 'All Years' option
    }
    if (!monthQuery || monthQuery === '') {
      setMonthQuery('0'); // Default to 'All Months' option
    }
  });

  // const [selectedMonth, setSelectedMonth] = useState<string>(
  //   (new Date().getMonth() + 1).toString() // Default to current month
  // );

  // Function to handle month selection change
  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonthQuery(event.target.value as string);
  };

  // Function to handle year selection change
  const handleYearChange = (event: SelectChangeEvent<string>) => {
    setYearQuery(event.target.value as string);
  };

  const filteredDonations = donations.filter((donation) => {
    const [year, month] = donation.entryDate
      .toString()
      .split('T')[0]
      .split('-');

    // Check if monthQuery and yearQuery are defined and not empty
    const matchesMonth =
      monthQuery === '0' || parseInt(month) === parseInt(monthQuery);

    const matchesYear =
      yearQuery === '0' || parseInt(year) === parseInt(yearQuery);

    return matchesMonth && matchesYear;
  });

  const rows = filteredDonations
    .map((donation, index) => ({
      id: index + 1,
      donor: `${donation.donor.firstName} ${donation.donor.lastName}`,
      quantity: donation.items.length,
      user_name: donation.user.email,
      date: donation.entryDate,
      edit: donation._id,
      receipt: donation.receipt,
    }))
    .filter((row) =>
      Object.entries(row)
        .filter(([key]) => key !== 'edit') // Exclude 'edit' (donation._id) value from search
        .some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  const columns: GridColDef[] = [
    { field: 'donor', headerName: 'Donor Name', width: 250, flex: 0.5 },
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
    { field: 'receipt', headerName: 'Receipt Number', width: 200, flex: 0.5 },
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
        <Grid
          container
          spacing={2}
          sx={{ alignContent: 'center', width: '100%', p: 2, pl: 0, pr: 0 }}
        >
          <Grid item xs={6}>
            <Typography variant="h4">Donation List</Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2}>
            <Select
              fullWidth
              value={selectedYear}
              onChange={handleYearChange}
              variant="outlined"
              displayEmpty
              inputProps={{ 'aria-label': 'Select year' }}
            >
              <MenuItem value="0">All Years</MenuItem>
              {/* Generate year options */}
              {[...Array(new Date().getFullYear() - startYear + 2).keys()].map(
                (yearIndex) => (
                  <MenuItem key={yearIndex} value={startYear + yearIndex}>
                    {startYear + yearIndex}
                  </MenuItem>
                )
              )}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select
              fullWidth
              value={selectedMonth}
              onChange={handleMonthChange}
              variant="outlined"
              displayEmpty
              inputProps={{ 'aria-label': 'Select month' }}
            >
              <MenuItem value="0">All Months</MenuItem>
              {/* Generate month options */}
              {[...Array(12).keys()].map((month) => (
                <MenuItem key={month} value={month + 1}>
                  {new Date(2000, month).toLocaleString('default', {
                    month: 'long',
                  })}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
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
              quickFilterProps: {
                debounceMs: 100,
                value: searchString,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(event.target.value);
                },
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}
