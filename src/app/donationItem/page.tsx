import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material/';
import { getAllDonationItems } from '@/server/actions/donationItem';

export default async function Home() {
  const rows = await getAllDonationItems();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Product</TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              Quantity
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              Evaluation
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              Barcode (if food)
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              Price
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.item.name}
                </TableCell>
                <TableCell>{row.item.category}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.value.evaluation}</TableCell>
                <TableCell align="center">
                  {row.barcode && (
                    <Chip
                      label={row.barcode}
                      sx={{
                        bgcolor: '#37954173',
                        border: 'solid',
                        borderColor: '#ABABAB',
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="center">${row.value.price}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
