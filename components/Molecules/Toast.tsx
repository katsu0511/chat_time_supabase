'use client';

import { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Snackbar from '@/components/Atoms/SuccessSnackbar';

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
      <Snackbar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} message={`Successfully changed your ${type}`} />
    </>
  );
}
