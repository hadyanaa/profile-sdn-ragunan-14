import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Snackbar, Alert, IconButton, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FormDialog from '../../../components/dashboard/FormDialog';
import DeleteConfirmDialog from '../../../components/dashboard/DeleteConfirmDialog';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.sdnragunan14pagi.sch.id';

export default function KalenderManager() {
  const [data, setData] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/public/kalender-akademik`);
      const responseData = response.data?.data || response.data || [];
      const mappedData = responseData.map((item, index) => ({
        ...item,
        id: item.id || index + 1,
        no: index + 1
      }));
      setData(mappedData);
    } catch (error) {
      console.error("Error fetching kalender akademik", error);
      showSnackbar('Gagal mengambil data', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
      if (selectedItem?.id) {
        // TODO: PUT request
        // await axios.put(`${API_URL}/admin/kalender-akademik/${selectedItem.id}`, formData);
        showSnackbar('Data berhasil diperbarui', 'success');
      } else {
        // TODO: POST request
        // await axios.post(`${API_URL}/admin/kalender-akademik`, formData);
        showSnackbar('Data berhasil ditambahkan', 'success');
      }
      setFormOpen(false);
      fetchData();
    } catch (error) {
      showSnackbar('Gagal menyimpan data', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      // TODO: DELETE request
      // await axios.delete(`${API_URL}/admin/kalender-akademik/${selectedItem.id}`);
      showSnackbar('Data berhasil dihapus', 'success');
      setDeleteOpen(false);
      fetchData();
    } catch (error) {
      showSnackbar('Gagal menghapus data', 'error');
    }
  };

  const columns = [
    { field: 'no', headerName: 'No', width: 70 },
    { field: 'title', headerName: 'Judul', flex: 1 },
    { field: 'start', headerName: 'Tanggal Mulai', width: 130 },
    { field: 'end', headerName: 'Tanggal Selesai', width: 130 },
    { field: 'kategori', headerName: 'Kategori', width: 130 },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 150,
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
    { name: 'title', label: 'Judul', type: 'text', required: true },
    { name: 'start', label: 'Tanggal Mulai', type: 'date', required: true },
    { name: 'end', label: 'Tanggal Selesai', type: 'date', required: true },
    { name: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
    { 
      name: 'kategori', 
      label: 'Kategori', 
      type: 'select', 
      options: [
        { value: 'Event', label: 'Event' },
        { value: 'Libur', label: 'Libur' },
        { value: 'Ujian', label: 'Ujian' },
        { value: 'Kegiatan', label: 'Kegiatan' }
      ],
      required: true 
    }
  ];

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-mainblue" style={{ color: '#0a4ea0' }}>Kelola Kalender Akademik</h2>
        <Button variant="contained" color="primary" onClick={handleAdd}>+ Tambah Kalender</Button>
      </div>

      <Paper sx={{ height: 500, width: '100%', overflow: 'hidden', borderRadius: '8px' }}>
        <DataGrid
          rows={data}
          columns={columns}
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
        title={selectedItem ? 'Edit Kalender' : 'Tambah Kalender'}
        fields={formFields}
        initialData={selectedItem}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Kalender"
        content="Apakah Anda yakin ingin menghapus kalender ini? Tindakan ini tidak dapat dibatalkan."
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
