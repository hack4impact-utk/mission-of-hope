import { Box, Card, Divider, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { DonationResponse } from '@/types/donation';
import { DonationItemResponse } from '@/types/donation';

interface emailProps {
  subjectLine: string;
  body: string;
  donationItems: DonationItemResponse[];
  donation: DonationResponse;
}

export default function EmailParserCard({
  subjectLine,
  body,
  donation,
}: emailProps) {
  // const donor_regex = 'DONOR/i'
  type repObj = {
    FDONOR: string | undefined;
    LDONOR: string;
    DATE: string;
  };
  const entryDate = new Date(donation.entryDate);

  const replaceObj: repObj = {
    FDONOR: donation.donor.firstName,
    LDONOR: donation.donor.lastName,
    DATE: entryDate.toDateString(),
  };

  let key: keyof repObj;
  let body_parse = body;

  for (key in replaceObj) {
    const replace = replaceObj[key];
    if (replace === undefined) continue;
    body_parse = body_parse.replaceAll(`[${key}]`, replace);
  }

  return (
    <Card sx={{ p: 2, pl: 9 }}>
      <Typography variant="h5" minHeight={'1.5rem'}>
        {subjectLine}
      </Typography>
      <Divider></Divider>
      <Box minHeight={'18rem'}>{parse(body_parse)}</Box>
    </Card>
  );
}
