import { getAllDonors } from '@/server/actions/donors';
import { getAllItems } from '@/server/actions/items';
import AddDonationView from '@/views/AddDonationView';

export default async function DonationsForm() {
  const donors = JSON.parse(JSON.stringify(await getAllDonors()));
  const items = JSON.parse(JSON.stringify(await getAllItems()));

  return (
    <>
      <AddDonationView donorOptions={donors} itemOptions={items} />
    </>
  );
}
