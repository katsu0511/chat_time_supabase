'use client';

import { Dispatch, SetStateAction } from 'react';
import { Snackbar, Alert } from '@mui/material';

type Props = {
  snackbarOpen: boolean
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  message: string
};

export default function SuccessSnackbar({ snackbarOpen, setSnackbarOpen, message }: Props) {
  return (
    <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
      <Alert severity='success' variant='filled'>{message}</Alert>
    </Snackbar>
  );
}
