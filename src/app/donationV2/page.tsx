import { getAllDonations } from '@/server/actions/donations';
import { DonationResponse } from '@/types/donation';
import DonationView from '@/views/donationView';

export default async function donationPage() {
  const donations: DonationResponse[] = JSON.parse(
    JSON.stringify(await getAllDonations())
  );
  console.log(donations); // get the commit checker to stop complaining
  return <DonationView donations={donations} />; //uncomment this line
}
