import { getAllDonations } from '@/server/actions/donations';
import { DonationResponse } from '@/types/donation';
import DonationItemView from '@/views/donationItemView';

export default async function DonationItemPage() {
  const donations: DonationResponse[] = JSON.parse(
    JSON.stringify(await getAllDonations())
  );

  return <DonationItemView donations={donations} />;
}
