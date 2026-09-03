'use client';

import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Snackbar, Alert } from '@mui/material';

type Props = {
  dialogOpen: boolean
  setDialogOpen: Dispatch<SetStateAction<boolean>>
  snackbarOpen: boolean
  setSnackbarOpen: Dispatch<SetStateAction<boolean>>
  handleCancel: () => void
  changeEmail: () => Promise<void>
};

export default function Toast({ dialogOpen, setDialogOpen, snackbarOpen, setSnackbarOpen, handleCancel, changeEmail }: Props) {
  return (
    <>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Change your email</DialogTitle>
        <DialogContent>Are you sure to change?
          <br /><strong>This operation cannot be reverted.</strong>
          <br />After this operation, you will be logged out automatically.
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={() => handleCancel()}>Cancel</Button>
          <Button color='success' onClick={() => changeEmail()}>Change</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity='success' variant='filled'>Successfully changed your email</Alert>
      </Snackbar>
    </>
  );
}
