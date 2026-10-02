import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
  CircularProgress,
  LinearProgress,
  Card,
  CardContent,
  Grid,
  Divider,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  FaBell,
  FaPlay,
  FaStop,
  FaVolumeHigh,
  FaPlus,
  FaFolderOpen,
  FaUpload,
  FaTrashCan,
  FaPenToSquare,
  FaClock,
  FaCalendarDays,
  FaFileAudio,
  FaRotateRight
} from 'react-icons/fa6';
import DeleteConfirmDialog from '../../../components/dashboard/DeleteConfirmDialog';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.sdnragunan14pagi.sch.id';

const DAYS_CONFIG = [
  { id: '1', name: 'Senin', short: 'Sen' },
  { id: '2', name: 'Selasa', short: 'Sel' },
  { id: '3', name: 'Rabu', short: 'Rab' },
  { id: '4', name: 'Kamis', short: 'Kam' },
  { id: '5', name: 'Jumat', short: 'Jum' },
  { id: '6', name: 'Sabtu', short: 'Sab' },
  { id: '7', name: 'Minggu', short: 'Min' },
];

export default function SchoolBellManager() {
  // Real-time Clock
  const [currentTime, setCurrentTime] = useState(new Date());

  // Schedules state
  const [schedules, setSchedules] = useState([]);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formTime, setFormTime] = useState('07:00');
  const [formDays, setFormDays] = useState(['1', '2', '3', '4', '5']);
  const [formAudio, setFormAudio] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);
  const [savingSchedule, setSavingSchedule] = useState(false);

  // Audio Library State
  const [audioFiles, setAudioFiles] = useState([]);
  const [loadingAudio, setLoadingAudio] = useState(false);
  const [audioManagerOpen, setAudioManagerOpen] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Browser Audio Preview
  const [playingAudio, setPlayingAudio] = useState(null); // filename
  const audioPlayerRef = useRef(null);

  // Server audio playing indicator
  const [serverPlayingFile, setServerPlayingFile] = useState(null);

  // Feedback Notification
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('dashboard_token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const showToast = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // 1. Ticking Real-Time Clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Fetch Schedules & Audio on Mount
  const fetchSchedules = async () => {
    setLoadingSchedules(true);
    try {
      const res = await axios.get(`${API_URL}/api/schedules`, { headers: getAuthHeaders() });
      const rawData = res.data?.data || res.data || [];
      const list = Array.isArray(rawData) ? rawData : [];
      setSchedules(list.map((item, idx) => ({
        ...item,
        id: item.id || item._id || idx + 1,
        no: idx + 1
      })));
    } catch (err) {
      console.error('Error fetching schedules:', err);
      showToast('Gagal memuat daftar jadwal bel', 'error');
    } finally {
      setLoadingSchedules(false);
    }
  };

  const fetchAudioFiles = async () => {
    setLoadingAudio(true);
    try {
      const res = await axios.get(`${API_URL}/api/audio`, { headers: getAuthHeaders() });
      const files = res.data?.files || res.data?.data || [];
      setAudioFiles(Array.isArray(files) ? files : []);
    } catch (err) {
      console.error('Error fetching audio files:', err);
      // Fallback empty or non-blocking toast
    } finally {
      setLoadingAudio(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
    fetchAudioFiles();

    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
    };
  }, []);

  // 3. Audio Player Browser Preview Handler
  const togglePlayAudioInBrowser = (filename, customUrl) => {
    if (!filename) return;

    if (playingAudio === filename) {
      // Stop
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.currentTime = 0;
      }
      setPlayingAudio(null);
      return;
    }

    const streamUrl = customUrl || `${API_URL}/public/audio/${encodeURIComponent(filename)}`;
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
    }

    const audio = new Audio(streamUrl);
    audioPlayerRef.current = audio;
    audio.play()
      .then(() => {
        setPlayingAudio(filename);
      })
      .catch((err) => {
        console.error('Audio playback failed:', err);
        showToast('Tidak dapat memutar audio di browser. Periksa format file.', 'error');
        setPlayingAudio(null);
      });

    audio.onended = () => {
      setPlayingAudio(null);
    };

    audio.onerror = () => {
      setPlayingAudio(null);
      showToast('Gagal memuat file audio nada bel', 'error');
    };
  };

  // 4. Test Play Audio di Server Speaker
  const testPlayOnServer = async (filename) => {
    if (!filename) {
      showToast('File audio belum ditentukan', 'warning');
      return;
    }
    setServerPlayingFile(filename);
    try {
      const res = await axios.post(
        `${API_URL}/api/audio/play/${encodeURIComponent(filename)}`,
        {},
        { headers: getAuthHeaders() }
      );
      showToast(res.data?.message || `🔊 Berhasil memicu bunyi bel "${filename}" di speaker server!`, 'success');
    } catch (err) {
      console.error('Failed to trigger server audio:', err);
      const msg = err.response?.data?.message || 'Gagal memutar audio di speaker server';
      showToast(msg, 'error');
    } finally {
      setTimeout(() => setServerPlayingFile(null), 1500);
    }
  };

  // 5. Toggle Active Switch directly in Table
  const handleToggleActive = async (row) => {
    const updatedStatus = !row.is_active;
    // Optimistic UI update
    setSchedules(prev => prev.map(s => s.id === row.id ? { ...s, is_active: updatedStatus } : s));

    try {
      const payload = {
        name: row.name,
        days: typeof row.days === 'string' ? row.days : (row.days?.join ? row.days.join(',') : '1,2,3,4,5'),
        time: row.time,
        audio_file: row.audio_file,
        is_active: updatedStatus
      };
      await axios.put(`${API_URL}/api/schedules/${row.id}`, payload, { headers: getAuthHeaders() });
      showToast(`Jadwal "${row.name}" berhasil ${updatedStatus ? 'diaktifkan' : 'dinonaktifkan'}`);
    } catch (err) {
      console.error('Error toggling schedule:', err);
      // Revert optimistic update
      setSchedules(prev => prev.map(s => s.id === row.id ? { ...s, is_active: !updatedStatus } : s));
      showToast('Gagal mengubah status jadwal', 'error');
    }
  };

  // 6. Next Bell Calculation
  const nextBellInfo = useMemo(() => {
    if (!schedules || schedules.length === 0) return null;

    const dayNumber = currentTime.getDay(); // 0 is Sunday, 1 is Monday
    const todayDayId = String(dayNumber === 0 ? 7 : dayNumber);

    const activeToday = schedules.filter(s => {
      if (!s.is_active) return false;
      const daysArr = (typeof s.days === 'string' ? s.days.split(',') : (s.days || [])).map(d => String(d).trim());
      return daysArr.includes(todayDayId) || (todayDayId === '7' && daysArr.includes('0'));
    });

    if (activeToday.length === 0) return { status: 'none_today' };

    const currentHours = String(currentTime.getHours()).padStart(2, '0');
    const currentMinutes = String(currentTime.getMinutes()).padStart(2, '0');
    const currentHHMM = `${currentHours}:${currentMinutes}`;

    // Sort by time ascending
    const sorted = [...activeToday].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    const upcoming = sorted.find(s => (s.time || '') > currentHHMM);

    if (upcoming) {
      return { status: 'upcoming', schedule: upcoming };
    }
    return { status: 'all_passed', totalToday: activeToday.length };
  }, [schedules, currentTime]);

  // 7. Schedule Dialog: Add / Edit Handlers
  const handleOpenAdd = () => {
    setEditingSchedule(null);
    setFormName('');
    setFormTime('07:00');
    setFormDays(['1', '2', '3', '4', '5']);
    setFormAudio(audioFiles[0]?.filename || '');
    setFormIsActive(true);
    setScheduleDialogOpen(true);
  };

  const handleOpenEdit = (schedule) => {
    setEditingSchedule(schedule);
    setFormName(schedule.name || '');
    setFormTime(schedule.time || '07:00');
    const dList = typeof schedule.days === 'string'
      ? schedule.days.split(',').map(d => d.trim()).filter(Boolean)
      : (schedule.days || ['1', '2', '3', '4', '5']);
    setFormDays(dList);
    setFormAudio(schedule.audio_file || '');
    setFormIsActive(schedule.is_active !== false);
    setScheduleDialogOpen(true);
  };

  const handleToggleDay = (dayId) => {
    setFormDays(prev => {
      if (prev.includes(dayId)) {
        return prev.filter(d => d !== dayId);
      } else {
        return [...prev, dayId].sort();
      }
    });
  };

  const handleSetQuickDays = (type) => {
    if (type === 'weekdays') setFormDays(['1', '2', '3', '4', '5']);
    if (type === 'all') setFormDays(['1', '2', '3', '4', '5', '6', '7']);
    if (type === 'reset') setFormDays([]);
  };

  const handleSaveSchedule = async (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      showToast('Nama jadwal wajib diisi', 'warning');
      return;
    }
    if (!formTime) {
      showToast('Waktu bel wajib ditentukan', 'warning');
      return;
    }
    if (formDays.length === 0) {
      showToast('Pilih minimal satu hari pelaksanaan', 'warning');
      return;
    }
    if (!formAudio) {
      showToast('Pilih file audio nada bel', 'warning');
      return;
    }

    setSavingSchedule(true);
    const payload = {
      name: formName.trim(),
      days: formDays.join(','),
      time: formTime,
      audio_file: formAudio,
      is_active: formIsActive
    };

    try {
      if (editingSchedule?.id) {
        await axios.put(`${API_URL}/api/schedules/${editingSchedule.id}`, payload, { headers: getAuthHeaders() });
        showToast('Jadwal bel berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/api/schedules`, payload, { headers: getAuthHeaders() });
        showToast('Jadwal bel baru berhasil ditambahkan');
      }
      setScheduleDialogOpen(false);
      fetchSchedules();
    } catch (err) {
      console.error('Failed to save schedule:', err);
      const msg = err.response?.data?.message || 'Gagal menyimpan jadwal bel';
      showToast(msg, 'error');
    } finally {
      setSavingSchedule(false);
    }
  };

  // 8. Delete Schedule Handlers
  const handleOpenDelete = (schedule) => {
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!scheduleToDelete) return;
    try {
      await axios.delete(`${API_URL}/api/schedules/${scheduleToDelete.id}`, { headers: getAuthHeaders() });
      showToast(`Jadwal "${scheduleToDelete.name}" berhasil dihapus`);
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
      fetchSchedules();
    } catch (err) {
      console.error('Failed to delete schedule:', err);
      const msg = err.response?.data?.message || 'Gagal menghapus jadwal';
      showToast(msg, 'error');
    }
  };

  // 9. Upload MP3 Audio File Handler
  const handleAudioUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.mp3')) {
      showToast('Format file harus berupa audio .mp3', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('audio', file);

    setUploadingAudio(true);
    setUploadProgress(0);

    try {
      const res = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || file.size));
          setUploadProgress(percent);
        }
      });

      const uploadedName = res.data?.file?.filename || file.name;
      showToast(`File audio "${uploadedName}" berhasil diunggah!`);
      // Auto select in form if schedule dialog is currently open
      if (scheduleDialogOpen) {
        setFormAudio(uploadedName);
      }
      fetchAudioFiles();
    } catch (err) {
      console.error('Upload error:', err);
      const msg = err.response?.data?.message || 'Gagal mengunggah file audio MP3';
      showToast(msg, 'error');
    } finally {
      setUploadingAudio(false);
      setUploadProgress(0);
      e.target.value = ''; // reset input
    }
  };

  // 10. DataGrid Columns Definition
  const columns = [
    { field: 'no', headerName: 'No', width: 60 },
    {
      field: 'name',
      headerName: 'Nama Bel',
      flex: 1.2,
      minWidth: 160,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
          <Box sx={{ color: '#0a4ea0', fontSize: '1.1rem' }}>
            <FaBell />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }}>
              {params.value}
            </Typography>
          </Box>
        </Box>
      )
    },
    {
      field: 'time',
      headerName: 'Jam',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value || '--:--'}
          size="small"
          sx={{
            fontWeight: 800,
            fontSize: '0.85rem',
            backgroundColor: 'rgba(10, 78, 160, 0.1)',
            color: '#0a4ea0',
            borderRadius: '6px'
          }}
        />
      )
    },
    {
      field: 'days',
      headerName: 'Hari Aktif',
      flex: 1.5,
      minWidth: 220,
      sortable: false,
      renderCell: (params) => {
        const activeDays = (typeof params.value === 'string'
          ? params.value.split(',')
          : (params.value || [])).map(d => String(d).trim());

        return (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
            {DAYS_CONFIG.map(day => {
              const isMatch = activeDays.includes(day.id) || (day.id === '7' && activeDays.includes('0'));
              return (
                <Chip
                  key={day.id}
                  label={day.short}
                  size="small"
                  sx={{
                    fontSize: '0.72rem',
                    height: 22,
                    fontWeight: isMatch ? 700 : 500,
                    bgcolor: isMatch ? '#0a4ea0' : '#f1f5f9',
                    color: isMatch ? '#ffffff' : '#94a3b8',
                    border: isMatch ? 'none' : '1px solid #e2e8f0'
                  }}
                />
              );
            })}
          </Box>
        );
      }
    },
    {
      field: 'audio_file',
      headerName: 'Nada Bel (.mp3)',
      flex: 1.2,
      minWidth: 180,
      renderCell: (params) => {
        const isPlayingThis = playingAudio === params.value;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, height: '100%' }}>
            <Tooltip title={isPlayingThis ? 'Hentikan Preview' : 'Dengar Preview di Browser'}>
              <IconButton
                size="small"
                onClick={() => togglePlayAudioInBrowser(params.value)}
                sx={{
                  bgcolor: isPlayingThis ? '#ef4444' : 'rgba(10, 78, 160, 0.08)',
                  color: isPlayingThis ? '#ffffff' : '#0a4ea0',
                  '&:hover': { bgcolor: isPlayingThis ? '#dc2626' : 'rgba(10, 78, 160, 0.16)' }
                }}
              >
                {isPlayingThis ? <FaStop size={11} /> : <FaPlay size={11} />}
              </IconButton>
            </Tooltip>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#334155', fontWeight: 500 }} noWrap>
              {params.value || '-'}
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'is_active',
      headerName: 'Status Aktif',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <Switch
            checked={Boolean(params.value)}
            onChange={() => handleToggleActive(params.row)}
            color="primary"
            size="small"
          />
          <Typography variant="caption" sx={{ fontWeight: 600, color: params.value ? '#16a34a' : '#94a3b8' }}>
            {params.value ? 'Aktif' : 'Mati'}
          </Typography>
        </Box>
      )
    },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 150,
      sortable: false,
      renderCell: (params) => {
        const isServerPlaying = serverPlayingFile === params.row.audio_file;
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, height: '100%' }}>
            <Tooltip title="Test Bunyi di Speaker Server">
              <span>
                <IconButton
                  size="small"
                  disabled={isServerPlaying}
                  onClick={() => testPlayOnServer(params.row.audio_file)}
                  sx={{
                    color: '#d97706',
                    bgcolor: '#fef3c7',
                    '&:hover': { bgcolor: '#fde68a' }
                  }}
                >
                  {isServerPlaying ? <CircularProgress size={13} color="inherit" /> : <FaVolumeHigh size={13} />}
                </IconButton>
              </span>
            </Tooltip>

            <Tooltip title="Edit Jadwal">
              <IconButton
                size="small"
                onClick={() => handleOpenEdit(params.row)}
                sx={{
                  color: '#0284c7',
                  bgcolor: '#e0f2fe',
                  '&:hover': { bgcolor: '#bae6fd' }
                }}
              >
                <FaPenToSquare size={13} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Hapus Jadwal">
              <IconButton
                size="small"
                onClick={() => handleOpenDelete(params.row)}
                sx={{
                  color: '#e11d48',
                  bgcolor: '#ffe4e6',
                  '&:hover': { bgcolor: '#fecdd3' }
                }}
              >
                <FaTrashCan size={13} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      }
    }
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* 1. Header & Live Clock Bar */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', lg: 'center' }, gap: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ p: 1, bgcolor: 'rgba(10, 78, 160, 0.1)', color: '#0a4ea0', borderRadius: '10px' }}>
              <FaBell size={24} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0a4ea0' }}>
              Kelola Bel Sekolah Otomatis
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Atur jadwal bel harian sekolah dan kelola nada audio lonceng yang terhubung dengan sistem pengeras suara.
          </Typography>
        </Box>

        {/* Live Clock Widget */}
        <Paper
          elevation={0}
          sx={{
            p: 1.8,
            px: 2.5,
            borderRadius: '12px',
            bgcolor: '#ffffff',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}
        >
          <Box sx={{ color: '#0a4ea0', fontSize: '1.5rem' }}>
            <FaClock />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Waktu Server (WIB)
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', fontFamily: 'monospace', lineHeight: 1.1 }}>
              {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} WIB
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              {currentTime.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* 2. Status Card & Action Bar */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Typography variant="caption" sx={{ color: '#0a4ea0', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Status Bunyi Bel Hari Ini
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                {nextBellInfo?.status === 'upcoming' ? (
                  <>
                    <Chip
                      label={`Pukul ${nextBellInfo.schedule.time} WIB`}
                      sx={{ bgcolor: '#0a4ea0', color: '#fff', fontWeight: 800, fontSize: '0.85rem' }}
                    />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                        {nextBellInfo.schedule.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        File Audio: <strong>{nextBellInfo.schedule.audio_file}</strong>
                      </Typography>
                    </Box>
                  </>
                ) : nextBellInfo?.status === 'all_passed' ? (
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>
                    ✅ Seluruh {nextBellInfo.totalToday} jadwal bel hari ini telah selesai dibunyikan.
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
                    Tidak ada jadwal bel aktif untuk hari ini.
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5} sx={{ display: 'flex', gap: 1.5, alignItems: 'center', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={handleOpenAdd}
            sx={{
              bgcolor: '#0a4ea0',
              fontWeight: 700,
              px: 2.5,
              py: 1.2,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': { bgcolor: '#083d7c' }
            }}
          >
            Tambah Jadwal
          </Button>

          <Button
            variant="outlined"
            startIcon={<FaFolderOpen />}
            onClick={() => setAudioManagerOpen(true)}
            sx={{
              color: '#0a4ea0',
              borderColor: '#0a4ea0',
              fontWeight: 700,
              px: 2,
              py: 1.2,
              borderRadius: '8px',
              textTransform: 'none',
              '&:hover': { borderColor: '#083d7c', bgcolor: 'rgba(10, 78, 160, 0.04)' }
            }}
          >
            Kelola Audio ({audioFiles.length})
          </Button>

          <Tooltip title="Muat Ulang Data">
            <IconButton onClick={() => { fetchSchedules(); fetchAudioFiles(); }} sx={{ border: '1px solid #cbd5e1' }}>
              <FaRotateRight size={15} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>

      {/* 3. Schedules DataGrid Table */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1e293b' }}>
            Daftar Jadwal Bel Otomatis
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total {schedules.length} jadwal terdaftar
          </Typography>
        </Box>

        <Box sx={{ height: 480, width: '100%' }}>
          <DataGrid
            rows={schedules}
            columns={columns}
            loading={loadingSchedules}
            initialState={{
              pagination: { paginationModel: { page: 0, pageSize: 10 } }
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            sx={{
              border: 0,
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'rgba(10, 78, 160, 0.05)',
                color: '#0a4ea0'
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 800
              },
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center'
              }
            }}
          />
        </Box>
      </Paper>

      {/* 4. Modal Dialog: Tambah / Edit Jadwal Bel */}
      <Dialog
        open={scheduleDialogOpen}
        onClose={() => !savingSchedule && setScheduleDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <form onSubmit={handleSaveSchedule}>
          <DialogTitle sx={{ fontWeight: 800, color: '#0a4ea0' }}>
            {editingSchedule ? 'Edit Jadwal Bel' : 'Tambah Jadwal Bel Baru'}
          </DialogTitle>

          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: '10px !important' }}>
            {/* Nama Bel */}
            <TextField
              label="Nama Jadwal Bel"
              placeholder="Contoh: Bel Masuk Pagi, Bel Istirahat 1, Bel Pulang"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              fullWidth
            />

            {/* Jam Bel */}
            <TextField
              label="Waktu Bunyi Bel (HH:MM)"
              type="time"
              value={formTime}
              onChange={(e) => setFormTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{ step: 60 }}
              required
              fullWidth
            />

            {/* Pilihan Hari */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155' }}>
                  Hari Aktif
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" onClick={() => handleSetQuickDays('weekdays')} sx={{ textTransform: 'none', fontSize: '0.75rem' }}>
                    Senin - Jumat
                  </Button>
                  <Button size="small" onClick={() => handleSetQuickDays('all')} sx={{ textTransform: 'none', fontSize: '0.75rem' }}>
                    Semua
                  </Button>
                  <Button size="small" color="inherit" onClick={() => handleSetQuickDays('reset')} sx={{ textTransform: 'none', fontSize: '0.75rem' }}>
                    Reset
                  </Button>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
                {DAYS_CONFIG.map(day => {
                  const isSelected = formDays.includes(day.id);
                  return (
                    <Chip
                      key={day.id}
                      label={day.name}
                      onClick={() => handleToggleDay(day.id)}
                      color={isSelected ? 'primary' : 'default'}
                      variant={isSelected ? 'filled' : 'outlined'}
                      sx={{
                        fontWeight: isSelected ? 700 : 500,
                        bgcolor: isSelected ? '#0a4ea0' : 'transparent',
                        borderColor: isSelected ? '#0a4ea0' : '#cbd5e1'
                      }}
                    />
                  );
                })}
              </Box>
            </Box>

            {/* Pilihan File Audio */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155' }}>
                  File Nada Bel (.mp3)
                </Typography>
                <Button
                  size="small"
                  startIcon={<FaUpload />}
                  component="label"
                  sx={{ textTransform: 'none', fontSize: '0.75rem', color: '#0a4ea0' }}
                >
                  Upload Baru
                  <input type="file" accept=".mp3,audio/mpeg" hidden onChange={handleAudioUpload} />
                </Button>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <FormControl fullWidth required>
                  <InputLabel id="select-audio-label">Pilih File Nada</InputLabel>
                  <Select
                    labelId="select-audio-label"
                    value={formAudio}
                    label="Pilih File Nada"
                    onChange={(e) => setFormAudio(e.target.value)}
                  >
                    {audioFiles.map((file, idx) => {
                      const fname = typeof file === 'string' ? file : (file.filename || file.name);
                      return (
                        <MenuItem key={idx} value={fname}>
                          {fname} {file.size_formatted ? `(${file.size_formatted})` : ''}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>

                {formAudio && (
                  <Tooltip title={playingAudio === formAudio ? 'Hentikan Preview' : 'Preview Nada'}>
                    <IconButton
                      onClick={() => togglePlayAudioInBrowser(formAudio)}
                      sx={{
                        bgcolor: playingAudio === formAudio ? '#ef4444' : 'rgba(10, 78, 160, 0.1)',
                        color: playingAudio === formAudio ? '#fff' : '#0a4ea0'
                      }}
                    >
                      {playingAudio === formAudio ? <FaStop size={14} /> : <FaPlay size={14} />}
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>

            {/* Switch Aktif */}
            <FormControlLabel
              control={
                <Switch
                  checked={formIsActive}
                  onChange={(e) => setFormIsActive(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Aktifkan Jadwal Ini Sekarang
                </Typography>
              }
            />
          </DialogContent>

          <DialogActions sx={{ p: 2.5, pt: 0 }}>
            <Button onClick={() => setScheduleDialogOpen(false)} color="inherit" disabled={savingSchedule}>
              Batal
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={savingSchedule}
              sx={{ bgcolor: '#0a4ea0', '&:hover': { bgcolor: '#083d7c' }, fontWeight: 700 }}
            >
              {savingSchedule ? <CircularProgress size={20} color="inherit" /> : 'Simpan Jadwal'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* 5. Modal Dialog: Audio MP3 Manager */}
      <Dialog
        open={audioManagerOpen}
        onClose={() => setAudioManagerOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '12px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800, color: '#0a4ea0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>📁 Kelola File Audio Bel Sekolah</span>
          <Button
            variant="contained"
            component="label"
            startIcon={<FaUpload />}
            disabled={uploadingAudio}
            sx={{ bgcolor: '#0a4ea0', textTransform: 'none', fontWeight: 700 }}
          >
            Unggah File MP3
            <input type="file" accept=".mp3,audio/mpeg" hidden onChange={handleAudioUpload} />
          </Button>
        </DialogTitle>

        <DialogContent sx={{ pt: '10px !important' }}>
          {uploadingAudio && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#0a4ea0' }}>
                Mengunggah audio... {uploadProgress}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} sx={{ height: 6, borderRadius: 3, mt: 0.5 }} />
            </Box>
          )}

          {loadingAudio ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress size={30} />
            </Box>
          ) : audioFiles.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 5, border: '2px dashed #cbd5e1', borderRadius: '10px', bgcolor: '#f8fafc' }}>
              <FaFileAudio size={40} color="#94a3b8" />
              <Typography variant="body1" sx={{ mt: 1, fontWeight: 700, color: '#475569' }}>
                Belum ada file audio tersimpan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Klik tombol "Unggah File MP3" di atas untuk menambahkan file nada bel sekolah (.mp3).
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {audioFiles.map((item, idx) => {
                const filename = typeof item === 'string' ? item : (item.filename || item.name);
                const sizeText = item.size_formatted || (item.size ? `${(item.size / 1024).toFixed(1)} KB` : '');
                const isPlayingBrowser = playingAudio === filename;
                const isPlayingServer = serverPlayingFile === filename;

                return (
                  <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                      p: 1.5,
                      px: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      '&:hover': { bgcolor: '#f8fafc' }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                      <Box sx={{ color: '#0a4ea0', fontSize: '1.2rem' }}>
                        <FaFileAudio />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1e293b' }} noWrap>
                          {filename}
                        </Typography>
                        {sizeText && (
                          <Typography variant="caption" color="text.secondary">
                            Ukuran: {sizeText}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      {/* Play Browser Preview */}
                      <Button
                        size="small"
                        variant={isPlayingBrowser ? 'contained' : 'outlined'}
                        color={isPlayingBrowser ? 'error' : 'primary'}
                        startIcon={isPlayingBrowser ? <FaStop /> : <FaPlay />}
                        onClick={() => togglePlayAudioInBrowser(filename, item.url)}
                        sx={{ textTransform: 'none', fontSize: '0.8rem' }}
                      >
                        {isPlayingBrowser ? 'Stop' : 'Dengar'}
                      </Button>

                      {/* Test Server Physical Speaker */}
                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        disabled={isPlayingServer}
                        startIcon={isPlayingServer ? <CircularProgress size={12} color="inherit" /> : <FaVolumeHigh />}
                        onClick={() => testPlayOnServer(filename)}
                        sx={{ textTransform: 'none', fontSize: '0.8rem' }}
                      >
                        Test Speaker
                      </Button>
                    </Box>
                  </Paper>
                );
              })}
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAudioManagerOpen(false)} variant="contained" sx={{ bgcolor: '#0a4ea0' }}>
            Tutup
          </Button>
        </DialogActions>
      </Dialog>

      {/* 6. Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={scheduleToDelete ? `jadwal "${scheduleToDelete.name}"` : 'jadwal ini'}
      />

      {/* 7. Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%', fontWeight: 600 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
