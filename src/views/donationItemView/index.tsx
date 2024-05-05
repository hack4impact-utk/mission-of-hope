'use client';
import { DonationItemResponse } from '@/types/donation';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
//
interface DonationItemProps {
  donationItems: DonationItemResponse[];
}

const columns: GridColDef[] = [
  //set the name and width of each column
  { field: 'name', headerName: 'Product', width: 350 },
  { field: 'category', headerName: 'Category', width: 350 },
  { field: 'quantity', headerName: 'Quantity', width: 200 },
  { field: 'evaluation', headerName: 'Evaluation', width: 150 },
  { field: 'barcode', headerName: 'Barcode (if food)', width: 200 },
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
  }));

  return (
    //return with no height to allow the table to expand
    <div style={{ width: '100%' }}>
      <DataGrid rows={rows} columns={columns} disableRowSelectionOnClick />
    </div>
  );
}