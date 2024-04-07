import { DonationItemResponse } from '@/types/donation';
import DonationItemAutofill from '@/components/donationItem';
import { getAllDonationItems } from '@/server/actions/donationItem';

// async function findDonationItems(): Promise<DonationItemResponse[] | null> {
//   try {
//     const data = await getAllDonationItems() ;
//     return data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const listOfDItems: DonationItemResponse[] = await getAllDonationItems();
  console.log(listOfDItems);

  return (
    <DonationItemAutofill
      donationItems={listOfDItems}
      donationItemData={listOfDItems[0]}
    ></DonationItemAutofill>
  );
}
// try {
//   if (listOfDItems !== null) {
//   return <Card>Null</Card>;
// } catch (error) {
//   console.log('help');
//   return <p>NULL</p>;
// }
// }
