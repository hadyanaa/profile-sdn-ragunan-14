import React, { useState } from 'react';
import { Dialog, DialogContent, Box } from '@mui/material';

export default function ImageViewer({ imageUrl }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Thumbnail */}
      <Box
        component="img"
        src={imageUrl}
        alt="Thumbnail"
        sx={{
          width: 150,
          height: 'auto',
          cursor: 'pointer',
          borderRadius: 2,
        }}
        onClick={handleOpen}
      />

      {/* Dialog Fullscreen */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogContent sx={{ p: 0, bgcolor: 'black' }}>
          <Box
            component="img"
            src={imageUrl}
            alt="Full Image"
            sx={{
              width: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              display: 'block',
              mx: 'auto',
            }}
            onClick={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
