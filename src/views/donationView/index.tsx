'use client';
import { useState } from 'react';
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
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import useSearch from '@/hooks/useSearch';
import useMonth from '@/hooks/useMonth';

interface DonationViewProps {
  donations: DonationResponse[];
}

export default function DonationView({ donations }: DonationViewProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();
  const { selectedMonth, monthQuery, setMonthQuery } = useMonth();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'donor',
    'quantity',
    'user_name',
    'date',
    'edit',
  ]);

  if (selectedMonth === '') {
    setMonthQuery((new Date().getMonth() + 1).toString()); // Default to current month
  }

  // Function to handle month selection change
  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonthQuery(event.target.value as string);
  };

  const filteredDonations =
    monthQuery !== '13'
      ? donations.filter(
          (donation) =>
            parseInt(
              donation.entryDate.toString().split('T')[0].split('-')[1]
            ) === parseInt(monthQuery)
        )
      : donations;

  const rows = filteredDonations
    .map((donation, index) => ({
      id: index + 1,
      donor: `${donation.donor.firstName} ${donation.donor.lastName}`,
      quantity: donation.items.length,
      user_name: donation.user.email,
      date: donation.entryDate,
      edit: donation._id,
    }))
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  const allColumns: GridColDef[] = [
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

  // Filter columns based on visibleColumns selection
  const columns = allColumns.filter((column) =>
    visibleColumns.includes(column.field)
  );

  const handleColumnSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const selectedColumns = event.target.value as string[];
    setVisibleColumns(selectedColumns);
  };

  const CustomToolbar = () => (
    <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel></InputLabel>
          <Select
            multiple
            value={visibleColumns}
            onChange={handleColumnSelectionChange}
            renderValue={(selected) =>
              selected.length === 0 ? 'Select Columns' : 'Columns'
            }
          >
            {allColumns.map((column) => (
              <MenuItem key={column.field} value={column.field}>
                <Checkbox checked={visibleColumns.includes(column.field)} />
                <ListItemText primary={column.headerName} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={exportToCSV}>
          Export to CSV
        </Button>
      </Box>
      <GridToolbarQuickFilter
        quickFilterProps={{
          debounceMs: 100,
          value: searchString,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(event.target.value);
          },
        }}
      />
    </Box>
  );

  const exportToCSV = () => {
    const headers = columns
      .filter((col) => col.field !== 'edit')
      .map((col) => col.headerName)
      .join(',');
    const csvRows = rows.map((row) =>
      [
        row.donor,
        row.quantity,
        row.user_name,
        new Date(row.date).toLocaleDateString(),
      ].join(',')
    );
    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${csvRows.join(
      '\n'
    )}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'donations.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <Grid item xs={4}>
            <Select
              fullWidth
              value={selectedMonth}
              onChange={handleMonthChange}
              variant="outlined"
              displayEmpty
              inputProps={{ 'aria-label': 'Select month' }}
            >
              <MenuItem value="13">All Months</MenuItem>
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
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>
    </Container>
  );
}
