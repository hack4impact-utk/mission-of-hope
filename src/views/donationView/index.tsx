'use client';
import { DonationResponse } from '@/types/donation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DonationViewProps {
  donations: DonationResponse[];
}

const columns: GridColDef[] = [
  { field: 'donor', headerName: 'Donor Name', width: 250 },
  { field: 'quantity', headerName: 'Donation Quantity', width: 200 },
  { field: 'user_name', headerName: 'User Name/ID', width: 300 },
  { field: 'date', headerName: 'Date', width: 250 },
];

export default function DonationView({ donations }: DonationViewProps) {
  const rows = donations.map((donation, index) => ({
    id: index + 1,
    donor: `${donation.donor.firstName} ${donation.donor.lastName}`,
    quantity: donation.items.length,
    user_name: donation.user.email,
    date: donation.entryDate,
  }));

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
    </div>
  );
}
