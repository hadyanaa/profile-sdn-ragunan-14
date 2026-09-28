import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Snackbar, Alert, Card, CardContent, Typography, TextField, Grid } from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.sdnragunan14pagi.sch.id';

export default function VisiMisiManager() {
  const [formData, setFormData] = useState({
    visi: '',
    misi: '',
    tujuan: '',
    visi_ekskul: '',
    misi_ekskul: '',
    tujuan_ekskul: '',
    fungsi_ekskul: ''
  });
  
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/public/visi-misi`);
        const data = response.data.data || {};
        
        setFormData({
          visi: data.visi?.text || '',
          misi: Array.isArray(data.misi) ? data.misi.map(m => m.text).join('\n') : '',
          tujuan: Array.isArray(data.tujuan) ? data.tujuan.map(t => t.text).join('\n') : '',
          visi_ekskul: '', // Set if available from API
          misi_ekskul: '',
          tujuan_ekskul: '',
          fungsi_ekskul: ''
        });
      } catch (error) {
        console.error("Error fetching visi-misi:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // TODO: Implement actual PUT request to /admin/visi-misi
      // await axios.put(`${API_URL}/admin/visi-misi`, formData, { headers: { Authorization: `Bearer ${token}` } });
      
      setSnackbar({ open: true, message: 'Berhasil menyimpan data Visi, Misi & Tujuan (Simulasi)', severity: 'success' });
    } catch (error) {
      console.error("Error saving visi-misi:", error);
      setSnackbar({ open: true, message: 'Gagal menyimpan data', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  return (
    <div className="p-4">
      <Card sx={{ mb: 4, borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" color="#0a4ea0">
            Kelola Visi, Misi & Tujuan
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Visi"
                name="visi"
                value={formData.visi}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Misi (Satu baris untuk satu poin)"
                name="misi"
                value={formData.misi}
                onChange={handleChange}
                multiline
                rows={6}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tujuan (Satu baris untuk satu poin)"
                name="tujuan"
                value={formData.tujuan}
                onChange={handleChange}
                multiline
                rows={6}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Visi Ekskul"
                name="visi_ekskul"
                value={formData.visi_ekskul}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Misi Ekskul (Satu baris untuk satu poin)"
                name="misi_ekskul"
                value={formData.misi_ekskul}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tujuan Ekskul (Satu baris untuk satu poin)"
                name="tujuan_ekskul"
                value={formData.tujuan_ekskul}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fungsi Ekskul (Satu baris untuk satu poin)"
                name="fungsi_ekskul"
                value={formData.fungsi_ekskul}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: '#0a4ea0' }}>
                Simpan Perubahan
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
