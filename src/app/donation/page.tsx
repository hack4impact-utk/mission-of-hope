import { getAllDonations } from '@/server/actions/donations';
import DonationView from '@/views/donationView';

export default async function DonationsForm() {
  const donations = JSON.parse(JSON.stringify(await getAllDonations()));

  return (
    <>
      <DonationView donations={donations} />
    </>
  );
}
