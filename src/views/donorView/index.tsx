'use client';
import useSearch from '@/hooks/useSearch';
import { DonorResponse } from '@/types/donors';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Container, Grid, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';

interface DonorViewProps {
  donors: DonorResponse[];
}

export default function DonorView({ donors }: DonorViewProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();

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
  const rows = donors
    .map((donor, index) => {
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
    })
    .filter((row) =>
      Object.entries(row)
        .filter(([key]) => key !== 'edit') // Exclude 'edit' (donor._id) value from search
        .some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

  return (
    <Container>
      <Box sx={{ maxWidth: '73vw', height: '78vh' }}>
        <Grid
          container
          spacing={2}
          alignItems={'center'}
          sx={{ width: '100%', p: 2, pl: 0, pr: 0 }}
        >
          <Grid item xs={6}>
            <Typography variant="h4" sx={{ mr: 2 }}>
              Donor List
            </Typography>
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
