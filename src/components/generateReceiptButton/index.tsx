import { IconButton, Tooltip } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

interface receiptButtonProps {
  disabled?: boolean;
  onChange: (receipt: Response) => void;
}

export default function GenerateReceiptButton(props: receiptButtonProps) {
  async function handleButton() {
    const receiptNumber = await fetch('/api/receipts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    props.onChange(receiptNumber);
  }

  return (
    <Tooltip title="Generate Receipt" placement="top">
      <IconButton disabled={props.disabled} onClick={handleButton}>
        <CachedIcon></CachedIcon>
      </IconButton>
    </Tooltip>
  );
}
