import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  children?: React.ReactNode;
  loadingSize?: number;
}

export default function LoadingButton({
  loading,
  loadingSize,
  children,
  ...buttonProps
}: LoadingButtonProps) {
  const disabled = loading || buttonProps?.disabled;
  const size = loadingSize || 24;
  return (
    <Button {...buttonProps} disabled={disabled}>
      {loading ? <CircularProgress size={`${size}px`} /> : children}
    </Button>
  );
}
