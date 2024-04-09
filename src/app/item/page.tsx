import { getAllItems } from '@/server/actions/items';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';

export default async function Home() {
  const rows = await getAllItems();

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Item</TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              High
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              Low
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                {row.high && (
                  <TableCell align="center">
                    {currency.format(row.high)}
                  </TableCell>
                )}
                {row.low && (
                  <TableCell align="center">
                    {currency.format(row.low)}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
