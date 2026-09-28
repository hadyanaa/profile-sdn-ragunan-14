import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  CssBaseline
} from '@mui/material';
import DashboardSidebar from './DashboardSidebar';
import ProtectedRoute from '../components/dashboard/ProtectedRoute';
import useAuthStore from '../store/useAuthStore';

const drawerWidth = 260;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/dashboard/login');
  };

  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            bgcolor: 'white',
            color: 'text.primary',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <span style={{ fontSize: '1.5rem' }}>☰</span>
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Dashboard Admin
            </Typography>
            <Button onClick={handleLogout} color="error" variant="outlined" size="small">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        
        <DashboardSidebar open={mobileOpen} onClose={handleDrawerToggle} />
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
            mt: 8
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
