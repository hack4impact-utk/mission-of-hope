import { Alert, Snackbar } from '@mui/material';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  createContext,
  useState,
} from 'react';

export type MuiSeverity = 'info' | 'success' | 'warning' | 'error';

interface SnackbarState {
  open: boolean;
  msg: string;
  color?: MuiSeverity;
}

interface SnackbarContextType {
  snackbar: SnackbarState;
  setSnackbar: Dispatch<SetStateAction<SnackbarState>>;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

/**
 * This component is a simple wrapper around the SnackbarContext that provides a global snackbar
 * @param props The props for the SnackbarProvider
 * @returns JSX
 */
const SnackbarContext = createContext<SnackbarContextType | null>(null);

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    msg: '',
  });

  const handleClose = (e: SyntheticEvent | Event, reason?: string) => {
    // only close if there isn't a reason (close button clicked) or if the reason is a timeout
    if (!reason || reason === 'timeout') {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.color}
          sx={{ width: '100%' }}
          elevation={8}
        >
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export default SnackbarContext;
