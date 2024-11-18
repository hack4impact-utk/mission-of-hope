import { getDonationItemById } from '@/server/actions/donationItem';
import { getAllDonations } from '@/server/actions/donations';
import { getAllMailMerge } from '@/server/actions/mailMerge';
import { CreateMailMergeRequest, MailMergeResponse } from '@/types/mailMerge';
import MailMergeView from '@/views/MailMergeView';

function defaultTemplate(
  type: 'Receipt' | 'Monthly' | 'Yearly'
): CreateMailMergeRequest {
  return { type: type, subject: '', body: '' };
}

export default async function MailMergePage() {
  const donations = JSON.parse(JSON.stringify(await getAllDonations()));
  const donationItems = [
    JSON.parse(
      JSON.stringify(await getDonationItemById(donations[0].donationItems))
    ),
  ];

  const data: MailMergeResponse[] = JSON.parse(
    JSON.stringify(await getAllMailMerge())
  );
  const templates = {
    receipt:
      data.find((response) => response['type'] == 'Receipt') ??
      defaultTemplate('Receipt'),
    monthly:
      data.find((response) => response['type'] == 'Monthly') ??
      defaultTemplate('Monthly'),
    yearly:
      data.find((response) => response['type'] == 'Yearly') ??
      defaultTemplate('Yearly'),
  };

  return (
    <MailMergeView
      exampleDonation={donations[0]}
      exampleDonationItems={donationItems}
      templates={templates}
    />
  );
}
