import { DonorResponse } from '@/types/persons';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface DonorViewProps {
  donors: DonorResponse[];
}

export default function DonorView({ donors }: DonorViewProps) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {donors.map((person) => (
        <Card key={person._id} style={{ margin: '10px', width: '300px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {person.firstName} {person.lastName}
            </Typography>
            <Typography color="textSecondary">Email: {person.email}</Typography>
            <Typography color="textSecondary">
              Address: {person.address}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
