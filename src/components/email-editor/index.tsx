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
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import EmailParserCard from '@/components/email-card';
import QuillToolBar, { modules, formats } from '@/components/tool-bar';
import '@/components/tool-bar/style.css';
import React from 'react';
import { DonationResponse, DonationItemResponse } from '@/types/donation';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import mohColors from '@/utils/moh-theme';
import useSnackbar from '@/hooks/useSnackbar';

interface mailMergeProps {
  exampleDonation: DonationResponse;
  exampleDonationItems: DonationItemResponse[];
  template?: { subject: string; body: string };
  emailType?: string;
}

export default function EmailEditor({
  exampleDonation,
  exampleDonationItems,
  template,
  emailType,
}: mailMergeProps) {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');
  const [value, setValue] = React.useState(0);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    // Set the body and subject to the template if it exists
    setBody(template?.body || '');
    setSubject(template?.subject || '');
  }, [template]);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSaveButton = async () => {
    // Validate input fields
    if (!subject.trim() || !body.trim()) {
      showSnackbar('Subject and body cannot be empty', 'error');
      return;
    }

    // Ensure emailType is provided and is valid
    const validEmailTypes = ['Receipt', 'Monthly', 'Yearly'];
    if (!emailType || !validEmailTypes.includes(emailType)) {
      showSnackbar('Invalid email type', 'error');
      console.log(emailType);
      return;
    }

    try {
      const response = await fetch('/api/mailMerge', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: emailType, // Use the correct type here
          subject,
          body,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error saving email template');
      }

      showSnackbar('Email template saved', 'success');
    } catch (error) {
      showSnackbar('Error saving email template', 'error');
      throw error;
    }
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
          onClick={handleSaveButton}
          fullWidth
        >
          Save Email
        </Button>
      </ThemeProvider>
    </>
  );
}
