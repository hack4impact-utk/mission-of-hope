import { DonorResponse } from '@/types/persons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material/';

interface DonorViewProps {
  donors: DonorResponse[];
}

export default function DonorView({ donors }: DonorViewProps) {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              City
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              State
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              Zipcode
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', m: 1 }} align="center">
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donors &&
            donors.map((donor) => (
              <TableRow key={donor._id}>
                <TableCell component="th" scope="row">
                  {donor.firstName} {donor.lastName}
                </TableCell>
                <TableCell>{donor.address}</TableCell>
                <TableCell align="center">{donor.city}</TableCell>
                <TableCell align="center">{donor.state}</TableCell>
                <TableCell align="center">{donor.zip}</TableCell>
                <TableCell align="center">{donor.email}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
