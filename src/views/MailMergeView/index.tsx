'use client';
import { Card, TextField } from '@mui/material';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function MailMergeView() {
  const [body, setBody] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  const handleBodyChange = (value: string) => {
    setBody(value);
  };

  return (
    <Card sx={{ p: 2 }}>
      {/* Text field for subject */}
      <TextField
        label="Subject Line"
        value={subject}
        onChange={handleSubjectChange}
        fullWidth
      />
      <ReactQuill
        theme="snow"
        value={body}
        onChange={handleBodyChange}
        style={{ height: '18rem' }} // Increase the height here
      />
    </Card>
  );
}
