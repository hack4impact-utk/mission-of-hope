import { getAllDonations } from '@/server/actions/donations';
import DonationView from '@/views/donationView';

export default async function DonationsForm() {
  const donations = await getAllDonations();
  return (
    <>
      <DonationView donations={donations} />
    </>
  );
}
