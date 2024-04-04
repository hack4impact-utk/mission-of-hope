'use client'; //Needed for useState
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
// import { getAllDonationItems } from '@/server/actions/donationItem';
import { DonationItemResponse } from '@/types/donation';
import DonationItemAutofill from '@/components/donationItem';
import { useState } from 'react';

async function findDonationItems(): Promise<DonationItemResponse[] | null> {
  try {
    const data = await fetch('http://localhost:3000/api/donationItems');
    return data.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Home() {
  const [dItemData, dItemChange] = useState<DonationItemResponse | null>(null);
  try {
    const listOfDItems: DonationItemResponse[] | null =
      await findDonationItems();

    // useEffect(() => dItemChange(listOfDItems[0]), [listOfDItems])
    if (listOfDItems !== null) {
      if (dItemData !== null) {
        return (
          <>
            <DonationItemAutofill
              donationItems={listOfDItems}
              donationItemData={dItemData}
              onChange={dItemChange}
            ></DonationItemAutofill>
            <Card>
              <CardContent>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6" pt={2}>
                  {dItemData.item.name}
                </Typography>
                <Typography>Quantity: {dItemData.quantity}</Typography>
                <Typography>Price: {dItemData.value.price}</Typography>
                <Typography>
                  Evaluation: {dItemData.value.evaluation}
                </Typography>
              </CardContent>
            </Card>
          </>
        );
      }
    }
    return <Card>Null</Card>;
  } catch (error) {
    console.log('help');
    return null;
  }
}
