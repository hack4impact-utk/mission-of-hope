'use client';
import EmailEditor from '@/components/email-editor';
import { CustomTabPanel, ap } from '@/components/tab-panel';
import { DonationItemResponse, DonationResponse } from '@/types/donation';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface mailMergeProps {
  exampleDonation: DonationResponse;
  exampleDonationItems: DonationItemResponse[];
}

export default function MailMergeView({
  exampleDonation,
  exampleDonationItems,
}: mailMergeProps) {
  const [value, setValue] = React.useState(0);
  const [templates, setTemplates] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/mailMerge', {
          method: 'GET',
        });
        const data = await response.json();
        setTemplates(data);
        // have to figure out how to set templates for each type
      } catch (error) {
        console.error(error);
      }
    };

    fetchTemplates();
  }, []);

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
          template={templates['receipt']}
          emailType="Receipt"
        ></EmailEditor>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <EmailEditor
          exampleDonation={exampleDonation}
          exampleDonationItems={exampleDonationItems}
          template={templates['monthly']}
          emailType="Monthly"
        ></EmailEditor>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <EmailEditor
          exampleDonation={exampleDonation}
          exampleDonationItems={exampleDonationItems}
          template={templates['yearly']}
          emailType="Yearly"
        ></EmailEditor>
      </CustomTabPanel>
    </Box>
  );
}
