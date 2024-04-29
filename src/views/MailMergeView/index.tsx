'use client';
import { Card, TextField } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmailParserCard from '@/components/email-card';
import QuillToolBar, { modules, formats } from '@/components/tool-bar';
import '@/components/tool-bar/style.css';

export default function MailMergeView() {
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  const donorName = 'John Deer';

  return (
    <>
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
      <EmailParserCard
        subjectLine={subject}
        body={body}
        donorName={donorName}
      ></EmailParserCard>
    </>
  );
}
