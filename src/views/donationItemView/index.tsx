'use client';
import { DonationItemResponse } from '@/types/donation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
//
interface DonationItemProps {
  donationItems: DonationItemResponse[];
}

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Product', width: 300 },
  { field: 'category', headerName: 'Category', width: 300 },
  { field: 'quantity', headerName: 'Quantity', width: 100 },
  { field: 'evaluation', headerName: 'Evaluation', width: 100 },
  { field: 'barcode', headerName: 'Barcode (if food)', width: 300 },
  { field: 'price', headerName: 'Price', width: 200 },
];

export default function DonationItemView({ donationItems }: DonationItemProps) {
  // Map over the donationItems to create rows for the DataGrid
  const rows = donationItems.map((item, index) => ({
    id: index + 1,
    name: item.item.name,
    category: item.item.category,
    quantity: item.quantity,
    evaluation: item.value.evaluation,
    barcode: item.barcode,
    price: item.value.price,
  }));

  return (
    <div style={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
    </div>
  );
}
