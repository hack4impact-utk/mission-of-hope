'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
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
import {
  DonationResponse,
  DonationItemResponse,
  GroupedDonationItem,
} from '@/types/donation';
import EditIcon from '@mui/icons-material/Edit';
import useMonth from '@/hooks/useMonth';
import useSearch from '@/hooks/useSearch';

interface DonationItemProps {
  donations: DonationResponse[];
}

const allColumns: GridColDef[] = [
  { field: 'product', headerName: 'Product', maxWidth: 300, flex: 2 },
  { field: 'category', headerName: 'Category', maxWidth: 300, flex: 2 },
  { field: 'quantity', headerName: 'Quantity', maxWidth: 300, flex: 1 },
  { field: 'price', headerName: 'Value', flex: 1 },
  {
    field: 'edit',
    headerName: 'Edit',
    maxWidth: 80,
    flex: 1,
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

  // Grab all donation items from all donations and make a single flat array
  const flatItems = filteredDonations.flatMap((donation) => donation.items);

  // Then, group items by name and aggregate quantities and values
  const groupedItems = flatItems.reduce(
    (acc: Record<string, GroupedDonationItem>, item: DonationItemResponse) => {
      const key = item.item.name;

      // If an item name hasn't been added yet, create a new entry
      if (!acc[key]) {
        acc[key] = {
          item: item.item,
          quantity: 0,
          totalValue: 0,
          barcode: item.barcode,
          evaluation: item.value.evaluation,
          itemIds: [],
        };
      }

      // Add values
      acc[key].quantity += item.quantity;
      acc[key].totalValue += item.value.price * item.quantity;

      // Only add each item ID once
      if (!acc[key].itemIds.includes(item._id)) {
        acc[key].itemIds.push(item._id);
      }

      return acc;
    },
    {}
  );

  const formattedRows = Object.values(groupedItems)
    .map((groupedItem, index) => ({
      id: index + 1,
      product: groupedItem.item.name,
      category: groupedItem.item.category,
      quantity: groupedItem.quantity,
      evaluation: groupedItem.evaluation,
      barcode: groupedItem.barcode,
      price: `$${groupedItem.totalValue.toFixed(2)}`,
      edit: groupedItem.itemIds[0], // Use the first item ID for editing
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
