import { getAllDonationItems } from '@/server/actions/donationItem';
import { DonationItemResponse } from '@/types/donation';
import DonationItemView from '@/views/donationItemView';

export default async function DonationItemPage() {
  const donationItems: DonationItemResponse[] = JSON.parse(
    JSON.stringify(await getAllDonationItems())
  );

  return <DonationItemView donationItems={donationItems} />;
}
