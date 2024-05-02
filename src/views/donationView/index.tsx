'use client';
import { DonationResponse } from '@/types/donation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DonationViewProps {
  donations: DonationResponse[];
}

const columns: GridColDef[] = [
  { field: 'donor', headerName: 'Donor Name', width: 250 },
  { field: 'item', headerName: 'Item Name', width: 250 },
  { field: 'item_cat', headerName: 'Item Category', width: 150 },
  { field: 'quant', headerName: 'Quantity', width: 100 },
  { field: 'high_low', headerName: 'High Low Value', width: 200 },
  { field: 'user_name', headerName: 'User Name/ID', width: 150 },
  { field: 'date', headerName: 'Date', width: 250 },
];

export default function DonationView({ donations }: DonationViewProps) {
  const rows = donations.map((donation, index) => ({
    id: index + 1,
    donor: `${donation.donor.firstName} ${donation.donor.lastName}`,
    item: donation.items.item.name,
    item_cat: donation.items.item.category,
    quant: 100,
    high_low: donation.items.item.high,
    user_name: donation.user._id,
    date: donation.createdAt,
  }));

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
    </div>
  );
}
