import { useCallback, useContext } from 'react';
import SnackbarContext, { MuiSeverity } from './SnackbarContext';

export default function useSnackbar() {
  const ctx = useContext(SnackbarContext);

  // Ensure we are inside a SnackbarProvider (so we can access the context)
  if (!ctx) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }

  const { snackbar, setSnackbar } = ctx;

  const showSnackbar = useCallback(
    (msg: string, color: MuiSeverity = 'info') => {
      setSnackbar({ open: true, msg, color });
    },
    [setSnackbar]
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, [setSnackbar]);

  return {
    snackbar,
    showSnackbar,
    hideSnackbar,
  };
}

export { SnackbarProvider } from './SnackbarContext';
