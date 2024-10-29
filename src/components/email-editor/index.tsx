'use client';
import {
  Box,
  Button,
  Card,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { CustomTabPanel, ap } from '@/components/tab-panel';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import EmailParserCard from '@/components/email-card';
import QuillToolBar, { modules, formats } from '@/components/tool-bar';
import '@/components/tool-bar/style.css';
import React from 'react';
import { DonationResponse, DonationItemResponse } from '@/types/donation';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import mohColors from '@/utils/moh-theme';

interface mailMergeProps {
  exampleDonation: DonationResponse;
  exampleDonationItems: DonationItemResponse[];
}

export default function EmailEditor({
  exampleDonation,
  exampleDonationItems,
}: mailMergeProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
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

  return (
    <>
      <ThemeProvider theme={mohColors}>
        <Box sx={{ width: '100%', m: 1 }}>
          <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              // TabIndicatorProps={{ children: <span {...indicatorProps} /> }}
              TabIndicatorProps={{
                sx: { backgroundColor: mohColors.palette.moh.main },
              }}
              indicatorColor="primary"
              textColor="primary"
              sx={{
                '& button:hover': {
                  backgroundColor: mohColors.palette.moh.light,
                },
                '& button:active': {
                  backgroundColor: mohColors.palette.moh.dark,
                  color: mohColors.palette.moh.contrastText,
                },
                '& Button.Mui-selected': {
                  borderColor: mohColors.palette.moh.main,
                  color: mohColors.palette.moh.dark,
                },
              }}
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
        <Button
          variant="contained"
          sx={{ height: '40px' }}
          color="moh"
          fullWidth
        >
          Send Email
        </Button>
      </ThemeProvider>
    </>
  );
}
