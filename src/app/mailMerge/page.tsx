import { getDonationItemById } from '@/server/actions/donationItem';
import { getAllDonations } from '@/server/actions/donations';
import MailMergeView from '@/views/MailMergeView';

export default async function MailMergePage() {
  const donations = JSON.parse(JSON.stringify(await getAllDonations()));
  const donationItems = [
    JSON.parse(
      JSON.stringify(await getDonationItemById(donations[0].donationItems))
    ),
  ];

  return (
    <MailMergeView
      exampleDonation={donations[0]}
      exampleDonationItems={donationItems}
    />
  );
}
