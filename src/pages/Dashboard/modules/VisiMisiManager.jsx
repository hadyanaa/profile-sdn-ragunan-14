import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Snackbar, Alert, Card, CardContent, Typography, TextField, Grid, CircularProgress } from '@mui/material';

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
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/public/visi-misi`);
      const data = response.data?.data || response.data || {};
      
      setFormData({
        visi: data.visi?.text || data.visi || '',
        misi: typeof data.misi === 'string' ? data.misi : (Array.isArray(data.misi) ? data.misi.map(m => m.text || m).join('\n') : ''),
        tujuan: typeof data.tujuan === 'string' ? data.tujuan : (Array.isArray(data.tujuan) ? data.tujuan.map(t => t.text || t).join('\n') : ''),
        visi_ekskul: data.visiEkskul || data.visi_ekskul || '',
        misi_ekskul: typeof data.misiEkskul === 'string' ? data.misiEkskul : (typeof data.misi_ekskul === 'string' ? data.misi_ekskul : (Array.isArray(data.misiEkskul) ? data.misiEkskul.map(m => m.text || m).join('\n') : '')),
        tujuan_ekskul: typeof data.tujuanEkskul === 'string' ? data.tujuanEkskul : (typeof data.tujuan_ekskul === 'string' ? data.tujuan_ekskul : (Array.isArray(data.tujuanEkskul) ? data.tujuanEkskul.map(t => t.text || t).join('\n') : '')),
        fungsi_ekskul: data.fungsiEkskul || data.fungsi_ekskul || ''
      });
    } catch (error) {
      console.error("Error fetching visi-misi:", error);
      setSnackbar({ open: true, message: 'Gagal mengambil data Visi & Misi', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('dashboard_token');
      const payload = {
        visi: formData.visi,
        misi: formData.misi,
        tujuan: formData.tujuan,
        visiEkskul: formData.visi_ekskul,
        misiEkskul: formData.misi_ekskul,
        tujuanEkskul: formData.tujuan_ekskul,
        fungsiEkskul: formData.fungsi_ekskul,
        // Fallback property format
        visi_ekskul: formData.visi_ekskul,
        misi_ekskul: formData.misi_ekskul,
        tujuan_ekskul: formData.tujuan_ekskul,
        fungsi_ekskul: formData.fungsi_ekskul
      };

      const response = await axios.put(`${API_URL}/admin/visi-misi`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setSnackbar({ 
        open: true, 
        message: response.data?.message || 'Berhasil menyimpan data Visi, Misi & Tujuan', 
        severity: 'success' 
      });
    } catch (error) {
      console.error("Error saving visi-misi:", error);
      const msg = error.response?.data?.message || 'Gagal menyimpan data Visi & Misi';
      setSnackbar({ open: true, message: msg, severity: 'error' });
    } finally {
      setSaving(false);
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
              <Button 
                variant="contained" 
                onClick={handleSave} 
                disabled={saving}
                sx={{ backgroundColor: '#0a4ea0' }}
              >
                {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
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
