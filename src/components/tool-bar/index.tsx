import { useRef } from 'react';
import { Quill } from 'react-quill-new';

export const useQuillRef = () => {
  return useRef();
};

function insertDonor(this: Quill, value: string): void {
  const selection = this.getSelection();
  if (!!selection && !!value) {
    const cursorPos = selection.index;
    this.insertText(cursorPos, value);
    this.setSelection(cursorPos + value.length);
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
  'indent',
  'link',
  'color',
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
