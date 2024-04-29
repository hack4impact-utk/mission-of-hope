import { Card, Divider } from '@mui/material';
import parse from 'html-react-parser';

interface emailProps {
  subjectLine: string;
  body: string;
  donorName: string;
}

export default function EmailParserCard({
  subjectLine,
  body,
  donorName,
}: emailProps) {
  // const donor_regex = 'DONOR/i'

  const varible_parsed = body.replaceAll('[DONOR]', donorName);

  return (
    <Card sx={{ p: 2, pl: 9, m: 1 }}>
      <h3>{subjectLine}</h3>
      <Divider></Divider>
      {parse(varible_parsed)}
    </Card>
  );
}
