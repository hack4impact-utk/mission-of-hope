import { getAllDonors } from '@/server/actions/donors';
import AddDonationView from '@/views/AddDonationView';
// import { Button } from '@mui/material';

export default async function DonationsForm() {
  const donors = JSON.parse(JSON.stringify(await getAllDonors()));

  return (
    <>
      <AddDonationView donorOptions={donors} />
    </>
  );
}
