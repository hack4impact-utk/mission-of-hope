import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';

export default async function Home() {
  const exItem1 = {
    _id: {
      $oid: '660b500bf64341a36558faee',
    },
    name: 'ItemY',
    category: 'cheese',
    high: 2,
    low: 1,
  };

  const exItem2 = {
    _id: {
      $oid: '65fbb891b890681545364c2c',
    },
    name: 'ProductI',
    category: 'Furniture',
    high: 349.99,
    low: 249.99,
  };

  const exItem3 = {
    _id: {
      $oid: '65fbb891b890681545364c26',
    },
    name: 'ProductC',
    category: 'Home Decor',
    high: 79.99,
    low: 49.99,
  };

  const rows = [exItem1, exItem2, exItem3];

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
              <TableRow key={row._id.$oid}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell align="center">
                  {currency.format(row.high)}
                </TableCell>
                <TableCell align="center">{currency.format(row.low)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
