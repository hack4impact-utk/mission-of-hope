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
import { DonationResponse, DonationItemResponse } from '@/types/donation';
import mohColors from '@/utils/moh-theme';
import useSnackbar from '@/hooks/useSnackbar';
import { CustomTabPanel, ap } from '@/components/tab-panel';
import QuillToolBar, { modules, formats } from '@/components/tool-bar';
import EmailParserCard from '@/components/email-card';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import React, { useEffect, useState } from 'react';

interface mailMergeProps {
  exampleDonation: DonationResponse;
  exampleDonationItems: DonationItemResponse[];
  template: { type: string; subject: string; body: string };
}

export default function EmailEditor({
  exampleDonation,
  exampleDonationItems,
  template,
}: mailMergeProps) {
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');
  const [value, setValue] = useState(0);
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

  const handleSaveButton = () => {
    try {
      fetch('/api/mailMerge', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: template?.type, subject, body }),
      });
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
