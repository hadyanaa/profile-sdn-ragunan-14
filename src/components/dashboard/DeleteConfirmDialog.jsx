import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

export default function DeleteConfirmDialog({ open, onClose, onConfirm, itemName }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Konfirmasi Hapus</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apakah Anda yakin ingin menghapus {itemName}? Tindakan ini tidak dapat dibatalkan.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose} color="inherit">Batal</Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
}
