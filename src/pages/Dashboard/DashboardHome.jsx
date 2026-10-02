import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Skeleton
} from '@mui/material';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.sdnragunan14pagi.sch.id';

export default function DashboardHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    sdm: 0,
    prestasi: 0,
    ekskul: 0,
    agenda: 0,
    pengumuman: 0,
    bel: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('dashboard_token');
        const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

        const [resSdm, resPrestasi, resEkskul, resAgenda, resPengumuman, resBel] = await Promise.allSettled([
          axios.get(`${API_URL}/public/sdm`),
          axios.get(`${API_URL}/public/prestasi`),
          axios.get(`${API_URL}/public/ekskul`),
          axios.get(`${API_URL}/public/agenda`),
          axios.get(`${API_URL}/public/pengumuman`),
          axios.get(`${API_URL}/api/schedules`, { headers: authHeaders })
        ]);

        const getCount = (res, filterVmt = false) => {
          if (res.status === 'fulfilled') {
            const data = res.value.data?.data || res.value.data || [];
            if (filterVmt && Array.isArray(data)) {
              return data.filter(i => i.nama !== 'vmt').length;
            }
            return Array.isArray(data) ? data.length : 0;
          }
          return 0;
        };

        setStats({
          sdm: getCount(resSdm),
          prestasi: getCount(resPrestasi),
          ekskul: getCount(resEkskul, true),
          agenda: getCount(resAgenda),
          pengumuman: getCount(resPengumuman),
          bel: getCount(resBel)
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'SDM Sekolah', count: stats.sdm, icon: '👥', color: '#3b82f6', path: '/dashboard/sdm' },
    { label: 'Prestasi', count: stats.prestasi, icon: '🏆', color: '#f59e0b', path: '/dashboard/prestasi' },
    { label: 'Ekstrakurikuler', count: stats.ekskul, icon: '⚽', color: '#10b981', path: '/dashboard/ekskul' },
    { label: 'Agenda', count: stats.agenda, icon: '📅', color: '#8b5cf6', path: '/dashboard/agenda' },
    { label: 'Pengumuman', count: stats.pengumuman, icon: '📢', color: '#ef4444', path: '/dashboard/pengumuman' },
    { label: 'Bel Sekolah', count: stats.bel, icon: '🔔', color: '#0a4ea0', path: '/dashboard/bel-sekolah' }
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#111827', mb: 1 }}>
          Selamat Datang di Dashboard Admin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Kelola konten website SDN Ragunan 14 Pagi dari sini.
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 5 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card sx={{ height: '100%', borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    bgcolor: `${stat.color}15`, // Light transparent background
                    color: stat.color,
                    mb: 2
                  }}
                >
                  {stat.icon}
                </Box>
                {loading ? (
                  <Skeleton variant="text" width={40} height={40} />
                ) : (
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    {stat.count}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
        Aksi Cepat
      </Typography>
      <Grid container spacing={2}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={`action-${index}`}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate(stat.path)}
              sx={{ 
                py: 1.5, 
                justifyContent: 'flex-start',
                borderColor: 'rgba(0,0,0,0.12)',
                color: '#111827',
                '&:hover': {
                  borderColor: stat.color,
                  bgcolor: `${stat.color}05`
                }
              }}
            >
              <span style={{ marginRight: '12px', fontSize: '1.2rem' }}>{stat.icon}</span>
              Kelola {stat.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
