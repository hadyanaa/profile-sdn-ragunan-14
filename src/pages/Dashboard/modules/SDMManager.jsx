import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Paper, Snackbar, Alert, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import FormDialog from '../../../components/dashboard/FormDialog';
import DeleteConfirmDialog from '../../../components/dashboard/DeleteConfirmDialog';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.sdnragunan14pagi.sch.id';

export default function SDMManager() {
  const [data, setData] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/public/sdm`);
      const items = response.data.data || [];
      setData(items.map((item, index) => ({
        ...item,
        id: item.id || index, // Use index as fallback id if not provided
        no: index + 1,
        jabatanTampil: item.deskripsiJabatan || item.jabatan
      })));
    } catch (error) {
      console.error("Error fetching SDM:", error);
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
      if (selectedItem) {
        // TODO: Implement actual PUT request to /admin/sdm/:id
        // await axios.put(`${API_URL}/admin/sdm/${selectedItem.id}`, formData);
        setSnackbar({ open: true, message: 'Berhasil mengubah data SDM (Simulasi)', severity: 'success' });
      } else {
        // TODO: Implement actual POST request to /admin/sdm
        // await axios.post(`${API_URL}/admin/sdm`, formData);
        setSnackbar({ open: true, message: 'Berhasil menambah data SDM (Simulasi)', severity: 'success' });
      }
      setFormOpen(false);
      fetchData();
    } catch (error) {
      setSnackbar({ open: true, message: 'Gagal menyimpan data', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      // TODO: Implement actual DELETE request to /admin/sdm/:id
      // await axios.delete(`${API_URL}/admin/sdm/${selectedItem.id}`);
      setSnackbar({ open: true, message: 'Berhasil menghapus data SDM (Simulasi)', severity: 'success' });
      setDeleteOpen(false);
      fetchData();
    } catch (error) {
      setSnackbar({ open: true, message: 'Gagal menghapus data', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar(prev => ({ ...prev, open: false }));

  const columns = [
    { field: 'no', headerName: 'No', width: 60 },
    { field: 'nama', headerName: 'Nama Lengkap', flex: 1, minWidth: 150 },
    { field: 'nipNikki', headerName: 'NIP/NIKKI', width: 130 },
    { field: 'gender', headerName: 'Gender', width: 100 },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'jabatanTampil', headerName: 'Jabatan', flex: 1, minWidth: 150 },
    { field: 'pendidikan', headerName: 'Pendidikan', width: 130 },
    { field: 'jurusan', headerName: 'Jurusan', width: 130 },
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
    { name: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
    { name: 'nipNikki', label: 'NIP/NIKKI', type: 'text', required: true },
    { name: 'gender', label: 'Gender', type: 'select', options: [{value: 'L', label: 'Laki-laki'}, {value: 'P', label: 'Perempuan'}], required: true },
    { name: 'status', label: 'Status (PNS/Non-PNS)', type: 'select', options: [{value: 'PNS', label: 'PNS'}, {value: 'CPNS', label: 'CPNS'}, {value: 'Non-PNS', label: 'Non-PNS'}], required: true },
    { name: 'jabatan', label: 'Jabatan', type: 'text', required: true },
    { name: 'pendidikan', label: 'Pendidikan', type: 'text', required: true },
    { name: 'jurusan', label: 'Jurusan', type: 'text', required: true },
    { name: 'fotoUrl', label: 'URL Foto', type: 'text', required: false },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h5" component="h2" fontWeight="bold" color="#0a4ea0">
          Kelola SDM Sekolah
        </Typography>
        <Button variant="contained" onClick={handleAdd} sx={{ backgroundColor: '#0a4ea0' }}>
          + Tambah SDM
        </Button>
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
        onSubmit={handleSubmit}
        title={selectedItem ? "Edit Data SDM" : "Tambah Data SDM"}
        fields={formFields}
        initialData={selectedItem}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Data SDM"
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
