'use client';
import { DonationResponse } from '@/types/donation';
import { ItemResponse } from '@/types/items';
import DonationForm from '@/components/DonationForm';

interface donationProps {
  id: string;
  donation: DonationResponse;
  itemOptions: ItemResponse[];
}

export default function DonationIdView(props: donationProps) {
  return <DonationForm donationId={props.id} />;
}
