'use client';
import React, { useEffect, useState } from 'react';
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
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  Button,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { DonationResponse } from '@/types/donation';
import EditIcon from '@mui/icons-material/Edit';
import useMonth from '@/hooks/useMonth';
import useSearch from '@/hooks/useSearch';

interface DonationItemProps {
  donations: DonationResponse[];
}

const allColumns: GridColDef[] = [
  { field: 'product', headerName: 'Product', maxWidth: 300, flex: 0.4 },
  { field: 'category', headerName: 'Category', maxWidth: 300, flex: 0.4 },
  { field: 'quantity', headerName: 'Quantity', maxWidth: 80, flex: 0.5 },
  { field: 'evaluation', headerName: 'Evaluation', maxWidth: 80, flex: 0.5 },
  {
    field: 'barcode',
    headerName: 'Barcode (if food)',
    maxWidth: 200,
    flex: 0.5,
    renderCell: (params) =>
      params.value ? (
        <Chip
          label={params.value}
          sx={{
            bgcolor: '#37954173',
            border: 'solid',
            borderColor: '#ABABAB',
          }}
        />
      ) : null,
  },
  { field: 'price', headerName: 'Price', maxWidth: 100, flex: 0.5 },
  {
    field: 'edit',
    headerName: 'Edit',
    maxWidth: 80,
    flex: 0.5,
    sortable: false,
    filterable: false,
    renderCell: (params) => (
      <IconButton
        color="primary"
        size="small"
        onClick={() => (window.location.href = `/donation/${params.value}`)}
      >
        <EditIcon></EditIcon>
      </IconButton>
    ),
  },
];

export default function DonationItemView({ donations }: DonationItemProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();
  const { selectedMonth, monthQuery, setMonthQuery } = useMonth();
  const [columnSelectorOpen, setColumnSelectorOpen] = useState<boolean>(false);

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    allColumns.map((col) => col.field)
  );

  useEffect(() => {
    if (monthQuery === '') {
      setMonthQuery((new Date().getMonth() + 1).toString());
    }
  }, [monthQuery, setMonthQuery]);

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
    .map((row, index) => ({
      id: index + 1,
      product: row.item.name,
      category: row.item.category,
      quantity: row.quantity,
      evaluation: row.value.evaluation,
      barcode: row.barcode,
      price: `$${row.value.price}`,
      edit: row._id,
    }))
    .filter((row) =>
      Object.entries(row)
        .filter(([key]) => key !== 'edit') // Exclude 'edit' (row._id) value from search
        .some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  const handleColumnSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const selectedColumns = event.target.value as string[];
    setVisibleColumns(selectedColumns);
  };

  const exportToCSV = () => {
    const escapeCSVValue = (value: string | number | null | undefined) => {
      const stringValue = String(value ?? '').replace(/"/g, '""');
      return stringValue.includes(',') || stringValue.includes('"')
        ? `"${stringValue}"`
        : stringValue;
    };

    const headers = visibleColumns
      .filter((field) => field !== 'edit')
      .map(
        (field) =>
          allColumns.find((col) => col.field === field)?.headerName || ''
      )
      .join(',');

    const csvRows = formattedRows.map((row) =>
      visibleColumns
        .filter((field) => field !== 'edit')
        .map((field) => escapeCSVValue(row[field as keyof typeof row]))
        .join(',')
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

  const CustomToolbar = () => (
    <Box
      sx={{
        p: 0.5,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel></InputLabel>
          <Select
            multiple
            open={columnSelectorOpen}
            onOpen={() => setColumnSelectorOpen(true)}
            onClose={() => setColumnSelectorOpen(false)}
            value={visibleColumns}
            onChange={handleColumnSelectionChange}
            renderValue={(selected) =>
              selected.length === 0 ? 'Select Columns' : 'Columns'
            }
            sx={{ height: '30px', fontSize: '1rem' }}
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
          sx={{ height: '30px', fontSize: '0.9rem' }}
        >
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

  const columns = allColumns.filter((column) =>
    visibleColumns.includes(column.field)
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
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>
    </Container>
  );
}
