'use client';

import * as React from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { ItemResponse } from '@/types/items';
import useSearch from '@/hooks/useSearch';

interface ItemViewProps {
  items: ItemResponse[];
}

export default function ItemView({ items }: ItemViewProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'id',
    'name',
    'category',
    'high',
    'low',
    'edit',
  ]);

  const allColumns: GridColDef[] = [
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
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => (window.location.href = `/item/${params.value}`)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  const columns = allColumns.filter((column) =>
    visibleColumns.includes(column.field)
  );

  const rows = items
    .map((item, index) => ({
      id: index + 1,
      name: item.name,
      category: item.category,
      high: item.high,
      low: item.low,
      edit: item._id,
    }))
    .filter((row) =>
      Object.entries(row)
        .filter(([key]) => key !== 'edit') // Exclude 'edit' (item._id) value from search
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

    const headers = columns
      .filter((col) => col.field !== 'edit')
      .map((col) => col.headerName)
      .join(',');

    const csvRows = rows.map((row) =>
      visibleColumns
        .filter((col) => col !== 'edit')
        .map((col) => escapeCSVValue(row[col as keyof typeof row]))
        .join(',')
    );

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${csvRows.join(
      '\n'
    )}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'items.csv');
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
          slots={{ toolbar: CustomToolbar }}
        />
      </Box>
    </Container>
  );
}
