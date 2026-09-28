import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';

export default function FormDialog({ open, onClose, onSubmit, title, fields, initialData }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (open) {
      if (initialData) {
        setFormData(initialData);
      } else {
        const defaultData = {};
        fields.forEach(field => {
          defaultData[field.name] = '';
        });
        setFormData(defaultData);
      }
    }
  }, [open, initialData, fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {fields.map((field) => (
              <Grid item xs={12} key={field.name}>
                {field.type === 'select' ? (
                  <FormControl fullWidth required={field.required}>
                    <InputLabel id={`label-${field.name}`}>{field.label}</InputLabel>
                    <Select
                      labelId={`label-${field.name}`}
                      name={field.name}
                      value={formData[field.name] || ''}
                      label={field.label}
                      onChange={handleChange}
                    >
                      {field.options?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    fullWidth
                    name={field.name}
                    label={field.label}
                    type={field.type || 'text'}
                    required={field.required}
                    multiline={field.multiline || field.type === 'textarea'}
                    rows={field.type === 'textarea' ? 4 : 1}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={onClose} color="inherit">Batal</Button>
          <Button type="submit" variant="contained" sx={{ bgcolor: '#0a4ea0', '&:hover': { bgcolor: '#083c7a' } }}>
            Simpan
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
