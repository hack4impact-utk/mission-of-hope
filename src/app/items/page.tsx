'use client';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

// define the style and structure of the data columns
const columns: GridColDef[] = [
  { field: 'name', headerName: 'Item Name', flex: 1.5 },
  { field: 'category', headerName: 'Category', flex: 1 },
  { field: 'high', headerName: 'High Value', type: 'number', flex: 1 },
  { field: 'low', headerName: 'Low Value', type: 'number', flex: 1 },
];

// current contains sample data from testing data
// will be replaced with api call to the database
const rows = [
  {
    id: '65ce84429aca7f652bd1fd31',
    name: 'ProductA',
    category: 'Electronics',
    high: 499.99,
    low: 399.99,
  },
  {
    id: '65ce84429aca7f652bd1fd32',
    name: 'ProductB',
    category: 'Clothing',
    high: 59.99,
    low: 29.99,
  },
  {
    id: '65ce84429aca7f652bd1fd34',
    name: 'ProductD',
    category: 'Electronics',
    high: 599.99,
    low: 399.99,
  },
  {
    id: '65ce84429aca7f652bd1fd33',
    name: 'ProductC',
    category: 'Home Decor',
    high: 79.99,
    low: 49.99,
  },
];

export default function itemPage() {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}
