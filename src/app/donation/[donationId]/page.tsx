import { getDonationById } from '@/server/actions/donations';
import { DonationResponse } from '@/types/donation';
import DonationIdView from '@/views/donationIdView';

export default async function DonorEditPage({
  params,
}: {
  params: { donationId: string };
}) {
  const donation: DonationResponse = JSON.parse(
    JSON.stringify(await getDonationById(params.donationId))
  );

  return (
    <DonationIdView id={params.donationId} donation={donation}></DonationIdView>
  );
}
