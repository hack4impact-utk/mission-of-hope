'use client';
import EmailEditor from '@/components/email-editor';
import { CustomTabPanel, ap } from '@/components/tab-panel';
import { DonationItemResponse, DonationResponse } from '@/types/donation';
import { CreateMailMergeRequest } from '@/types/mailMerge';
import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';

interface mailMergeProps {
  exampleDonation: DonationResponse;
  exampleDonationItems: DonationItemResponse[];
  templates: templates;
}

interface templates {
  receipt: CreateMailMergeRequest;
  monthly: CreateMailMergeRequest;
  yearly: CreateMailMergeRequest;
}

export default function MailMergeView({
  exampleDonation,
  exampleDonationItems,
  templates,
}: mailMergeProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          template={templates.receipt}
        ></EmailEditor>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EmailEditor
          exampleDonation={exampleDonation}
          exampleDonationItems={exampleDonationItems}
          template={templates.monthly}
        ></EmailEditor>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EmailEditor
          exampleDonation={exampleDonation}
          exampleDonationItems={exampleDonationItems}
          template={templates.yearly}
        ></EmailEditor>
      </CustomTabPanel>
    </Box>
  );
}
