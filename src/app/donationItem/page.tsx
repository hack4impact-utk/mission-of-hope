import { getAllDonationItems } from '@/server/actions/donationItem';
import { DonationItemResponse } from '@/types/donation';
import DonationItemView from '@/views/donationItemView';

export default async function DonationItemPage() {
  const rows: DonationItemResponse[] = JSON.parse(
    JSON.stringify(await getAllDonationItems())
  );

  return (
    <>
      <DonationItemView rows={rows} />
    </>
  );
}
