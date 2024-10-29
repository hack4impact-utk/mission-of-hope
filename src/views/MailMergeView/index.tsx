'use client';
import EmailEditor from '@/components/email-editor';
import { CustomTabPanel, ap } from '@/components/tab-panel';
import { DonationItemResponse, DonationResponse } from '@/types/donation';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

interface mailMergeProps {
  exampleDonation: DonationResponse;
  exampleDonationItems: DonationItemResponse[];
}

export default function MailMergeView({
  exampleDonation,
  exampleDonationItems,
}: mailMergeProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //const displayEmailTemplate = () => {
  // This function will display the email template
  //}

  return (
    <Box sx={{ m: 1 }}>
      <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
        <Tabs
          centered={true}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab label="Receipt" {...ap(0)} />
          <Tab label="Monthly Email" {...ap(1)} />
          <Tab label="Yearly Email" {...ap(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <EmailEditor
          exampleDonation={exampleDonation}
          exampleDonationItems={exampleDonationItems}
        ></EmailEditor>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EmailEditor
          exampleDonation={exampleDonation}
          exampleDonationItems={exampleDonationItems}
        ></EmailEditor>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EmailEditor
          exampleDonation={exampleDonation}
          exampleDonationItems={exampleDonationItems}
        ></EmailEditor>
      </CustomTabPanel>
    </Box>
  );
}
