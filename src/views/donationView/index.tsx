'use client';
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

interface DonationViewProps {
  donations: DonationResponse[];
}

export default function DonationView({ donations }: DonationViewProps) {
  const { searchString, searchQuery, setSearchQuery } = useSearch();
  const { selectedMonth, monthQuery, setMonthQuery } = useMonth();
  if (selectedMonth === '') {
    setMonthQuery((new Date().getMonth() + 1).toString()); // Default to current month
  }
  // const [selectedMonth, setSelectedMonth] = useState<string>(
  //   (new Date().getMonth() + 1).toString() // Default to current month
  // );

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
      receipt: donation.receipt,
    }))
    .filter((row) =>
      Object.values(row).some((value) =>
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
