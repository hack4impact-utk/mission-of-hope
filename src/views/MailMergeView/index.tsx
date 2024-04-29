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

export default function MailMergeView() {
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

  const donorName = 'John Deer';

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Item One" value="1" {...ap(0)} />
            <Tab label="Item Two" value="2" {...ap(1)} />
          </Tabs>
        </Box>
      </Box>
      <CustomTabPanel value={value} index={1}>
        <Card sx={{ p: 2, m: 1 }}>
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
      <CustomTabPanel value={value} index={2}>
        <EmailParserCard
          subjectLine={subject}
          body={body}
          donorName={donorName}
        ></EmailParserCard>
      </CustomTabPanel>
    </>
  );
}
