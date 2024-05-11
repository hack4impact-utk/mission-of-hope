import { getAllDonations } from '@/server/actions/donations';
import { getAllDonors } from '@/server/actions/donors';
import { DonationResponse } from '@/types/donation';
import { DonorResponse } from '@/types/persons';
import DonorView from '@/views/donorView';

export default async function DonorPage() {
  const donors: DonorResponse[] = JSON.parse(
    JSON.stringify(await getAllDonors())
  );
  const donations: DonationResponse[] = JSON.parse(
    JSON.stringify(await getAllDonations())
  );
  return (
    <>
      <DonorView donors={donors} donations={donations} />
    </>
  );
}
