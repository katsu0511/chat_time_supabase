'use client';

import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';

type Props = {
  type: string
  dialogOpen: boolean
  snackbarOpen: boolean
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  handleCancel: () => void
  changeAuthInfo: () => Promise<void>
};

export default function Toast({ type, dialogOpen, snackbarOpen, setSnackbarOpen, handleCancel, changeAuthInfo }: Props) {
  return (
    <>
      <Dialog open={dialogOpen} onClose={() => handleCancel()}>
        <DialogTitle>Change your {type}</DialogTitle>
        <DialogContent>Are you sure to change your {type}?
          <br />After this operation, you will be logged out automatically.
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => handleCancel()}>Cancel</Button>
          <Button color='success' onClick={() => changeAuthInfo()}>Change</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity='success' variant='filled'>Successfully changed your {type}</Alert>
      </Snackbar>
    </>
  );
}
