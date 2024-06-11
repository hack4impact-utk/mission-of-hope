import { getDonationById } from '@/server/actions/donations';
import { getAllItems } from '@/server/actions/items';
import { DonationResponse } from '@/types/donation';
import { ItemResponse } from '@/types/items';
import DonationIdView from '@/views/donationIdView';

export default async function DonorEditPage({
  params,
}: {
  params: { donationId: string };
}) {
  const donation: DonationResponse = JSON.parse(
    JSON.stringify(await getDonationById(params.donationId))
  );
  const items: ItemResponse[] = JSON.parse(JSON.stringify(await getAllItems()));

  return (
    <DonationIdView
      id={params.donationId}
      donation={donation}
      itemOptions={items}
    ></DonationIdView>
  );
}
