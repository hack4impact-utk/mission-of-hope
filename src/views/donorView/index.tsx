'use client';
import useSearch from '@/hooks/useSearch';
import { DonorResponse } from '@/types/donors';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { useState } from 'react';

interface DonorViewProps {
  donors: DonorResponse[];
}

export default function DonorView({ donors }: DonorViewProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();

  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'name',
    'address',
    'city',
    'state',
    'zip',
    'email',
    'edit',
  ]);

  const allColumns: GridColDef[] = [
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
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => (window.location.href = `/donors/${params.value}`)}
        >
          <EditIcon></EditIcon>
        </IconButton>
      ),
    },
  ];

  // Filter columns based on visibility selection
  const columns = allColumns.filter((column) =>
    visibleColumns.includes(column.field)
  );

  const rows = donors
    .map((donor, index) => ({
      id: index + 1,
      name: `${donor?.firstName} ${donor?.lastName}`,
      address: donor?.address,
      city: donor?.city,
      state: donor?.state,
      zip: donor?.zip,
      email: donor?.email,
      edit: donor?._id,
    }))
    .filter((row) =>
      Object.entries(row)
        .filter(([key]) => key !== 'edit') // Exclude 'edit' (donor._id) value from search
        .some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  const handleColumnSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const selectedColumns = event.target.value as string[];
    setVisibleColumns(selectedColumns);
  };

  const exportToCSV = () => {
    // Enclose fields containing commas or quotes in double quotes
    const escapeCSVValue = (value: string | number | null | undefined) => {
      const stringValue = String(value ?? '').replace(/"/g, '""'); // Escape double quotes
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
        .map((col) => escapeCSVValue(row[col as keyof typeof row])) // Explicitly tell TypeScript the key exists
        .join(',')
    );

    const csvContent = `data:text/csv;charset=utf-8,${headers}\n${csvRows.join(
      '\n'
    )}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'donors.csv');
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
        debounceMs={100}
        value={searchString}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(event.target.value)
        }
      />
    </Box>
  );

  return (
    <Container>
      <Box sx={{ maxWidth: '73vw', height: '78vh' }}>
        <Grid container spacing={2} sx={{ width: '100%', p: 2, pl: 0, pr: 0 }}>
          <Grid item xs={6}>
            <Typography variant="h4">Donor List</Typography>
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
