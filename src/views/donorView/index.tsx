'use client';
import { DonorResponse } from '@/types/persons';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DonorViewProps {
  donors: DonorResponse[];
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'address', headerName: 'Address', width: 300 },
  { field: 'city', headerName: 'City', width: 300 },
  { field: 'state', headerName: 'State', width: 100 },
  { field: 'zip', headerName: 'Zipcode', width: 150 },
  { field: 'email', headerName: 'Email', width: 250 },
];

export default function DonorView({ donors }: DonorViewProps) {
  const rows = donors.map((donor, index) => ({
    id: index + 1,
    name: `${donor.firstName} ${donor.lastName}`,
    address: donor.address,
    city: donor.city,
    state: donor.state,
    zip: donor.zip,
    email: donor.email,
  }));

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} checkboxSelection />
    </div>
  );
}
