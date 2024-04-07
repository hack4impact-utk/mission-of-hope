import { DonationItemResponse } from '@/types/donation';
import DonationItemAutofill from '@/components/donationItem';
import { getAllDonationItems } from '@/server/actions/donationItem';

export default async function Home() {
  const listOfDItems: DonationItemResponse[] = JSON.parse(
    JSON.stringify(await getAllDonationItems())
  );

  return (
    <DonationItemAutofill
      donationItems={listOfDItems}
      donationItemData={listOfDItems[0]}
    />
  );
}
