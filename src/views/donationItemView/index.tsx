'use client';
import React, { useEffect } from 'react';
import {
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { DonationResponse } from '@/types/donation';
import EditIcon from '@mui/icons-material/Edit';
import useMonth from '@/hooks/useMonth';
import useSearch from '@/hooks/useSearch';

interface DonationItemProps {
  donations: DonationResponse[];
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

export default function DonationItemView({ donations }: DonationItemProps) {
  //map the donation items to the rows
  const { searchString, searchQuery, setSearchQuery } = useSearch();
  const { selectedMonth, monthQuery, setMonthQuery } = useMonth();
  useEffect(() => {
    if (monthQuery === '') {
      setMonthQuery((new Date().getMonth() + 1).toString());
    }
  }, []);
  // const [selectedMonth, setSelectedMonth] = useState<string>(
  //   (new Date().getMonth() + 1).toString() // Default to current month
  // );

  // Function to handle month selection change
  const handleMonthChange = (event: SelectChangeEvent<string>) => {
    setMonthQuery(event.target.value as string);
  };

  const filteredDonations =
    selectedMonth !== '13'
      ? donations.filter(
          (donation) =>
            parseInt(
              donation.entryDate.toString().split('T')[0].split('-')[1]
            ) === parseInt(selectedMonth)
        )
      : donations;

  const uniqueDonationItems = Array.from(
    new Set(filteredDonations.map((donation) => donation.items).flat(1))
  );

  const formattedRows = uniqueDonationItems
    .map((row) => ({
      id: row._id,
      product: row.item.name,
      category: row.item.category,
      quantity: row.quantity,
      evaluation: row.value.evaluation,
      barcode: row.barcode,
      price: `$${row.value.price}`,
      edit: row._id,
    }))
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  return (
    <Container>
      <Box sx={{ maxWidth: '73vw', height: '78vh' }}>
        <Grid
          container
          spacing={2}
          sx={{ alignContent: 'center', width: '100%', p: 2, pl: 0, pr: 0 }}
        >
          <Grid item xs={4}>
            <Typography variant="h4">Inventory</Typography>
          </Grid>
          <Grid item xs={4}></Grid>
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
          rows={formattedRows}
          columns={columns}
          disableColumnFilter
          disableDensitySelector
          slots={{ toolbar: GridToolbar }} // added the toolbar to the grid
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: {
                debounceMs: 100,
                value: searchString,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(event.target.value);
                },
              }, // each search query will be delayed by 500ms
            },
          }}
        />
      </Box>
    </Container>
  );
}
