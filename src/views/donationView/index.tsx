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
  Typography,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import useSearch from '@/hooks/useSearch';
import useMonth from '@/hooks/useMonth';
import useYear from '@/hooks/useYear';

interface DonationViewProps {
  donations: DonationResponse[];
}

const START_YEAR = 2024;

export default function DonationView({ donations }: DonationViewProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();
  const { selectedYear, yearQuery, setYearQuery } = useYear();
  const { selectedMonth, monthQuery, setMonthQuery } = useMonth();

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'donor',
    'quantity',
    'user_name',
    'date',
    'edit',
  ]);

  // Function to handle year selection change
  const handleYearChange = (year: string) => {
    setYearQuery(year);
  };

  // Function to handle month selection change
  const handleMonthChange = (month: string) => {
    setMonthQuery(month);
  };

  const filteredDonations = donations.filter((donation) => {
    const year = donation.entryDate.getFullYear().toString();
    const month = (donation.entryDate.getMonth() + 1).toString();

    // Check if monthQuery and yearQuery are defined and not empty
    const matchesYear = !yearQuery || year === yearQuery;
    const matchesMonth = !monthQuery || month === monthQuery;

    return matchesYear && matchesMonth;
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

  const allColumns: GridColDef[] = [
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

  // Filter columns based on visibleColumns selection
  const columns = allColumns.filter((column) =>
    visibleColumns.includes(column.field)
  );

  const handleColumnSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const selectedColumns = event.target.value as string[];
    setVisibleColumns(selectedColumns);
  };

  const CustomToolbar = () => (
    <Box
      sx={{
        p: 0.5, // Reduce padding
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center', // Center items vertically to fit smaller height
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel></InputLabel>
          <Select
            multiple
            sx={{
              padding: '0px 6px',
              minWidth: 'auto',
              height: '30px',
              fontSize: '1rem',
              lineHeight: 1,
              borderWidth: '1px',
            }}
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
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={exportToCSV}
          sx={{
            padding: '0px 6px',
            minWidth: 'auto',
            height: '30px',
            fontSize: '0.9rem',
            lineHeight: 1,
            borderWidth: '1px',
          }}
        >
          Export to CSV
        </Button>
      </Box>
      <GridToolbarQuickFilter
        debounceMs={100}
        value={searchString}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(event.target.value);
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
      [row.donor, row.user_name, new Date(row.date).toLocaleDateString()].join(
        ','
      )
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
          <Grid item xs={2}>
            <Select
              fullWidth
              value={selectedYear || '0'}
              onChange={(e) => handleYearChange(e.target.value)}
              variant="outlined"
              displayEmpty
              inputProps={{ 'aria-label': 'Select year' }}
            >
              {/* Generate year options */}
              {[
                <MenuItem key="all-years" value="0">
                  All Years
                </MenuItem>,
                ...[
                  ...Array(new Date().getFullYear() - START_YEAR + 2).keys(),
                ].map((yearIndex) => (
                  <MenuItem key={yearIndex} value={START_YEAR + yearIndex}>
                    {START_YEAR + yearIndex}
                  </MenuItem>
                )),
              ]}
            </Select>
          </Grid>
          <Grid item xs={2}>
            <Select
              fullWidth
              value={selectedMonth || '0'}
              onChange={(e) => handleMonthChange(e.target.value)}
              variant="outlined"
              displayEmpty
              inputProps={{ 'aria-label': 'Select month' }}
            >
              {/* Generate month options */}
              {[
                <MenuItem key="all-months" value="0">
                  All Months
                </MenuItem>,
                ...[...Array(12).keys()].map((month) => (
                  <MenuItem key={month} value={month + 1}>
                    {new Date(2000, month).toLocaleString('default', {
                      month: 'long',
                    })}
                  </MenuItem>
                )),
              ]}
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
