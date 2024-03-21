'use client'; //Needed for useState
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { getDonationItems } from '@/server/actions/donationItem';
import { DonationItemResponse } from '@/types/donation';

async function findDonationItems(): Promise<DonationItemResponse[] | null> {
  try {
    return await getDonationItems();
  } catch (error) {
    return null;
  }
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  try {
    const listOfDItems: DonationItemResponse[] | null =
      await findDonationItems();

    if (listOfDItems !== null) {
      const dItemData: DonationItemResponse = listOfDItems[0];
      return (
        <Card>
          <CardContent>
            <Typography sx={{ fontWeight: 'bold' }} variant="h6" pt={2}>
              dItemData.item.name
            </Typography>
            <Typography>Quantity: {dItemData.quantity}</Typography>
            <Typography>Price: {dItemData.value.price}</Typography>
            <Typography>Evaluation: {dItemData.value.evaluation}</Typography>
          </CardContent>
        </Card>
      );
    } else return <Card>Null</Card>;
  } catch (error) {
    console.log('help');
    return null;
  }
}
