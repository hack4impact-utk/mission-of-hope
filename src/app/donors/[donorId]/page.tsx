import { getDonorById } from '@/server/actions/donors';
import { DonorResponse } from '@/types/persons';
import DonorIdView from '@/views/donorIdView';

export default async function DonorEditPage({
  params,
}: {
  params: { donorId: string };
}) {
  const donor: DonorResponse = JSON.parse(
    JSON.stringify(await getDonorById(params.donorId))
  );

  return <DonorIdView donor={donor}></DonorIdView>;
}
