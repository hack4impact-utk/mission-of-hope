import { DonorResponse } from '@/types/persons';
import { getAllDonors } from '@/server/actions/donors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

async function getDonors(): Promise<DonorResponse[]> {
  try {
    const response = await getAllDonors();
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function donor_page() {
  const data = await getDonors();

  console.log(data);
  /*
    return(
        <div>
            {data.map(person => (
                <Card>
                    <CardContent>
                    <p>Name: {person.firstName} {person.lastName} </p>
                    <p>Email: {person.email}</p>
                    <p>Address: {person.address}</p>
                </CardContent>
               </Card>
            ))}
        </div>
    );
    */
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {data.map((person) => (
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
