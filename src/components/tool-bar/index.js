import AddIcon from '@mui/icons-material/Add';
import { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export const quillRef = () => {
  return useRef();
};

function insertDonor(value) {
  console.log(value);
  if (value) {
    console.log(this);
    const cursorPos = this.quill.getSelection().index;
    this.quill.insertText(cursorPos, value);
    this.quill.setSelection(cursorPos + value.length);
  }
}

export const modules = {
  toolbar: {
    container: '#toolbar',
    handlers: {
      insert: insertDonor,
    },
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'list',
  'bullet',
  'indent',
  'link',
  'color',
  'clean',
  'image',
];

export default function QuillToolBar() {
  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-header" defaultValue="4">
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-link" />
        <button className="ql-image" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <select className="ql-color" />
      </span>
      <span className="ql-formats">
        <button className="ql-clean" type="button" />
        <select className="ql-insert">
          <option value="[FDONOR]">Donor First Name</option>
          <option value="[LDONOR]">Donor Last Name</option>
          <option value="[DATE]">Date</option>
        </select>
      </span>
    </div>
  );
}
