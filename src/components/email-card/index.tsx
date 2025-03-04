import { Box, Card, Divider, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { DonationResponse } from '@/types/donation';
import { DonationItemResponse } from '@/types/donation';
import { populateEmailTemplate } from '@/utils/string';

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
  const body_parse = populateEmailTemplate(
    body,
    donation.donor,
    donation.entryDate
  );

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
