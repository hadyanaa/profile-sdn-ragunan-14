import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Snackbar, Alert, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FormDialog from '../../../components/dashboard/FormDialog';
import DeleteConfirmDialog from '../../../components/dashboard/DeleteConfirmDialog';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.sdnragunan14pagi.sch.id';

export default function PrestasiManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/public/prestasi`);
      const items = response.data?.data || response.data || [];
      setData(items.map((item, index) => ({
        ...item,
        id: item.id || item._id || index + 1,
        no: index + 1,
        tanggal: item.tanggal ? String(item.tanggal).substring(0, 10) : '',
        linkFoto: item.linkFoto || item.foto || ''
      })));
    } catch (error) {
      console.error("Error fetching Prestasi:", error);
      setSnackbar({ open: true, message: 'Gagal mengambil data Prestasi', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setSelectedItem(null);
    setFormOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      const token = localStorage.getItem('dashboard_token');
      const headers = { Authorization: `Bearer ${token}` };
      const payload = {
        ...formData,
        foto: formData.linkFoto
      };

      if (selectedItem?.id) {
        const response = await axios.put(`${API_URL}/admin/prestasi/${selectedItem.id}`, payload, { headers });
        setSnackbar({ open: true, message: response.data?.message || 'Berhasil mengubah data Prestasi', severity: 'success' });
      } else {
        const response = await axios.post(`${API_URL}/admin/prestasi`, payload, { headers });
        setSnackbar({ open: true, message: response.data?.message || 'Berhasil menambah data Prestasi', severity: 'success' });
      }
      setFormOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving Prestasi:", error);
      const msg = error.response?.data?.message || 'Gagal menyimpan data Prestasi';
      setSnackbar({ open: true, message: msg, severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('dashboard_token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(`${API_URL}/admin/prestasi/${selectedItem.id}`, { headers });
      setSnackbar({ open: true, message: response.data?.message || 'Berhasil menghapus data Prestasi', severity: 'success' });
      setDeleteOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting Prestasi:", error);
      const msg = error.response?.data?.message || 'Gagal menghapus data Prestasi';
      setSnackbar({ open: true, message: msg, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  const columns = [
    { field: 'no', headerName: 'No', width: 60 },
    { field: 'nama', headerName: 'Nama/Judul Prestasi', flex: 1, minWidth: 200 },
    { field: 'tingkat', headerName: 'Tingkat', width: 130 },
    { field: 'peraih', headerName: 'Peraih', width: 180 },
    { field: 'tanggal', headerName: 'Tanggal', width: 120 },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="flex space-x-2 h-full items-center">
          <button 
            onClick={() => handleEdit(params.row)}
            className="p-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors cursor-pointer border-none"
            title="Edit"
          >
            ✏️
          </button>
          <button 
            onClick={() => handleDelete(params.row)}
            className="p-1 rounded bg-red-100 hover:bg-red-200 text-red-600 transition-colors cursor-pointer border-none"
            title="Hapus"
          >
            🗑️
          </button>
        </div>
      )
    }
  ];

  const formFields = [
    { name: 'nama', label: 'Nama/Judul Prestasi', type: 'text', required: true },
    { 
      name: 'tingkat', 
      label: 'Tingkat', 
      type: 'select', 
      options: [
        {value: 'Kecamatan', label: 'Kecamatan'}, 
        {value: 'Kota', label: 'Kota'}, 
        {value: 'Provinsi', label: 'Provinsi'},
        {value: 'Nasional', label: 'Nasional'},
        {value: 'Internasional', label: 'Internasional'}
      ], 
      required: true 
    },
    { name: 'peraih', label: 'Peraih (Nama Siswa/Sekolah)', type: 'text', required: true },
    { name: 'deskripsi', label: 'Deskripsi Prestasi', type: 'textarea', required: false },
    { name: 'tanggal', label: 'Tanggal', type: 'date', required: true },
    { name: 'linkFoto', label: 'URL Foto', type: 'text', required: false },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" component="h2" fontWeight="bold" color="#0a4ea0">
          Kelola Prestasi Sekolah
        </Typography>
        <Button variant="contained" onClick={handleAdd} sx={{ backgroundColor: '#0a4ea0' }}>
          + Tambah Prestasi
        </Button>
      </div>

      <Paper sx={{ height: 500, width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
        <DataGrid
          rows={data}
          columns={columns}
          loading={loading}
          initialState={{ pagination: { paginationModel: { page: 0, pageSize: 10 } } }}
          pageSizeOptions={[10, 25, 50]}
          sx={{
            border: 0,
            '& .MuiDataGrid-columnHeaders': { backgroundColor: 'rgba(10, 78, 160, 0.06)', color: '#0a4ea0' },
            '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 800 },
          }}
        />
      </Paper>

      <FormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        title={selectedItem ? "Edit Data Prestasi" : "Tambah Data Prestasi"}
        fields={formFields}
        initialData={selectedItem}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Data Prestasi"
        content={`Apakah Anda yakin ingin menghapus data ${selectedItem?.nama}?`}
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
