'use client'; //Needed for useState
// import { Autocomplete, Card, CardContent, TextField, Typography } from '@mui/material';
import { Card, CardContent, Typography } from '@mui/material';
import { DonationItemResponse } from '@/types/donation';
import { useState } from 'react';

interface Props {
  donationItems: DonationItemResponse[];
  donationItemData: DonationItemResponse;
}

export default function DonationItemAutofill(props: Props) {
  // const [donationItemOptions] = useState<DonationItemResponse[]>(
  //   props.donationItems
  // );
  const [donationItem /*, changeDonation*/] = useState<DonationItemResponse>(
    props.donationItemData
  );
  return (
    <>
      {/* <Autocomplete
      sx={{ mt: 2 }}
      freeSolo
      autoComplete
      value={donationItem.item.name || ''}
      options={donationItemOptions}
      getOptionLabel={(donIt) =>
        typeof donIt === 'string' ? donIt : donIt.item.name
      }
      renderOption={(props, option) => {
        return (
          <li {...props} key={option._id}>
            {option.item.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Email Address"
          onChange={(e) => {
            changeDonation({
              ...props.donationItemData,
              item: { ...props.donationItemData.item, name: e.target.value },
            });
          }}
        />
      )}
    /> */}
      <DonationItemTable donationItemData={donationItem}></DonationItemTable>
    </>
  );
}

interface TableData {
  donationItemData: DonationItemResponse;
}

function DonationItemTable(data: TableData) {
  // const [dItemData, dItemChange] = useState<DonationItemResponse | null>(null);
  // const listOfDItems: DonationItemResponse[] | null =
  //   await findDonationItems();
  // useEffect(() => dItemChange(listOfDItems[0]), [listOfDItems])

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }} variant="h6" pt={2}>
          {data.donationItemData.item.name}
        </Typography>
        <Typography>Quantity: {data.donationItemData.quantity}</Typography>
        <Typography>Price: {data.donationItemData.value.price}</Typography>
        <Typography>
          Evaluation: {data.donationItemData.value.evaluation}
        </Typography>
      </CardContent>
    </Card>
  );
}
