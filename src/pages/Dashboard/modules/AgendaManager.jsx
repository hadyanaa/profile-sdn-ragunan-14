import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Snackbar, Alert, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FormDialog from '../../../components/dashboard/FormDialog';
import DeleteConfirmDialog from '../../../components/dashboard/DeleteConfirmDialog';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.sdnragunan14pagi.sch.id';

export default function AgendaManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/public/agenda`);
      const responseData = response.data?.data || response.data || [];
      const mappedData = responseData.map((item, index) => ({
        ...item,
        id: item.id || item._id || index + 1,
        no: index + 1,
        tanggal: item.tanggal ? String(item.tanggal).substring(0, 10) : '',
        url_image: item.linkFoto || item.url_image || '',
        linkFoto: item.linkFoto || item.url_image || ''
      }));
      setData(mappedData);
    } catch (error) {
      console.error("Error fetching agenda", error);
      showSnackbar('Gagal mengambil data agenda', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

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
        url_image: formData.linkFoto
      };

      if (selectedItem?.id) {
        const response = await axios.put(`${API_URL}/admin/agenda/${selectedItem.id}`, payload, { headers });
        showSnackbar(response.data?.message || 'Data berhasil diperbarui', 'success');
      } else {
        const response = await axios.post(`${API_URL}/admin/agenda`, payload, { headers });
        showSnackbar(response.data?.message || 'Data berhasil ditambahkan', 'success');
      }
      setFormOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving agenda:", error);
      const msg = error.response?.data?.message || 'Gagal menyimpan data agenda';
      showSnackbar(msg, 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem('dashboard_token');
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.delete(`${API_URL}/admin/agenda/${selectedItem.id}`, { headers });
      showSnackbar(response.data?.message || 'Data berhasil dihapus', 'success');
      setDeleteOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting agenda:", error);
      const msg = error.response?.data?.message || 'Gagal menghapus data agenda';
      showSnackbar(msg, 'error');
    }
  };

  const columns = [
    { field: 'no', headerName: 'No', width: 70 },
    { field: 'judul', headerName: 'Judul', flex: 1, minWidth: 160 },
    { field: 'deskripsi', headerName: 'Deskripsi', flex: 1.5, minWidth: 200, renderCell: (params) => params.value ? params.value.substring(0, 50) + '...' : '' },
    { field: 'tanggal', headerName: 'Tanggal', width: 130 },
    { field: 'lokasi', headerName: 'Lokasi', width: 140 },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 120,
      renderCell: (params) => (
        <div className="flex gap-2 h-full items-center">
          <Tooltip title="Edit">
            <button onClick={() => handleEdit(params.row)} className="text-xl bg-transparent border-none cursor-pointer">✏️</button>
          </Tooltip>
          <Tooltip title="Hapus">
            <button onClick={() => handleDelete(params.row)} className="text-xl bg-transparent border-none cursor-pointer">🗑️</button>
          </Tooltip>
        </div>
      )
    }
  ];

  const formFields = [
    { name: 'judul', label: 'Judul', type: 'text', required: true },
    { name: 'deskripsi', label: 'Deskripsi', type: 'textarea', required: true },
    { name: 'tanggal', label: 'Tanggal', type: 'date', required: true },
    { name: 'lokasi', label: 'Lokasi', type: 'text' },
    { name: 'linkFoto', label: 'URL Foto', type: 'text' }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-mainblue" style={{ color: '#0a4ea0' }}>Kelola Agenda Sekolah</h2>
        <Button variant="contained" onClick={handleAdd} sx={{ backgroundColor: '#0a4ea0' }}>+ Tambah Agenda</Button>
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
        title={selectedItem ? 'Edit Agenda' : 'Tambah Agenda'}
        fields={formFields}
        initialData={selectedItem}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Agenda"
        content="Apakah Anda yakin ingin menghapus agenda ini? Tindakan ini tidak dapat dibatalkan."
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
