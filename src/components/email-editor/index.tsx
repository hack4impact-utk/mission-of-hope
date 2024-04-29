'use client';
import { Box, Card, Tab, Tabs, TextField } from '@mui/material';
import { CustomTabPanel, ap } from '@/components/tab-panel';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmailParserCard from '@/components/email-card';
import QuillToolBar, { modules, formats } from '@/components/tool-bar';
import '@/components/tool-bar/style.css';
import React from 'react';
import { DonationResponse, DonationItemResponse } from '@/types/donation';

interface mailMergeProps {
  exampleDonation: DonationResponse;
  exampleDonationItems: DonationItemResponse[];
}

export default function EmailEditor({
  exampleDonation,
  exampleDonationItems,
}: mailMergeProps) {
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');
  const [value, setValue] = React.useState(0);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const indicatorProps = {
    '& .MuiTabs-indicatorSpan': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7',
    },
  };

  return (
    <>
      <Box sx={{ width: '100%', m: 1 }}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{ children: <span {...indicatorProps} /> }}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              label="Write"
              {...ap(0)}
              sx={{
                mr: 1,
                border: 1,
                borderBottom: 0,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            />
            <Tab
              label="Preview"
              {...ap(1)}
              sx={{
                mr: 1,
                border: 1,
                borderBottom: 0,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Card sx={{ p: 2 }}>
            {/* Text field for subject */}
            <TextField
              label="Subject Line"
              value={subject}
              onChange={handleSubjectChange}
              fullWidth
            />
            <Card sx={{ mt: 1 }}>
              <div className="text-editor">
                <QuillToolBar />
                <ReactQuill
                  theme="snow"
                  value={body}
                  onChange={handleBodyChange}
                  style={{ height: '18rem' }} // Increase the height here
                  modules={modules}
                  formats={formats}
                />
              </div>
            </Card>
          </Card>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <EmailParserCard
            subjectLine={subject}
            body={body}
            donation={exampleDonation}
            donationItems={exampleDonationItems}
          ></EmailParserCard>
        </CustomTabPanel>
      </Box>
    </>
  );
}
