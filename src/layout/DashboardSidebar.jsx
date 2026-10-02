import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';

const drawerWidth = 260;

const menuItems = [
  { path: '/dashboard/overview', label: 'Overview', icon: '📊' },
  { path: '/dashboard/visi-misi', label: 'Visi & Misi', icon: '🎯' },
  { path: '/dashboard/sdm', label: 'SDM Sekolah', icon: '👥' },
  { path: '/dashboard/prestasi', label: 'Prestasi', icon: '🏆' },
  { path: '/dashboard/ekskul', label: 'Ekstrakurikuler', icon: '⚽' },
  { path: '/dashboard/agenda', label: 'Agenda', icon: '📅' },
  { path: '/dashboard/pengumuman', label: 'Pengumuman', icon: '📢' },
  { path: '/dashboard/kalender', label: 'Kalender Akademik', icon: '🗓️' },
  { path: '/dashboard/bel-sekolah', label: 'Bel Sekolah', icon: '🔔' },
];

export default function DashboardSidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0a4ea0' }}>
          SDN Ragunan 14 Pagi
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dashboard Admin
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={isMobile ? onClose : undefined}
              sx={{
                borderRadius: '8px',
                '&.active': {
                  backgroundColor: 'rgba(10, 78, 160, 0.08)',
                  color: '#0a4ea0',
                  '& .MuiListItemIcon-root': {
                    color: '#0a4ea0',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, fontSize: '1.25rem' }}>
                <span>{item.icon}</span>
              </ListItemIcon>
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ px: 2, py: 2 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="/"
            sx={{ borderRadius: '8px' }}
          >
            <ListItemIcon sx={{ minWidth: 40, fontSize: '1.25rem' }}>
              <span>←</span>
            </ListItemIcon>
            <ListItemText 
              primary="Kembali ke Website" 
              primaryTypographyProps={{ fontWeight: 600, fontSize: '0.9rem' }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}
