import { getAllDonors } from '@/server/actions/donors';
import { DonorResponse } from '@/types/donors';
import DonorView from '@/views/donorView';

export default async function DonorPage() {
  const donors: DonorResponse[] = JSON.parse(
    JSON.stringify(await getAllDonors())
  );
  return (
    <>
      <DonorView donors={donors} />
    </>
  );
}
