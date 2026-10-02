import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import Layout from './layout/Layout';
import VisiMisi from './pages/Profile/VisiMisi';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ListPengumuman from './pages/Informasi/ListPengumuman';
import { ImInsertTemplate } from 'react-icons/im';
import ListSdm from './pages/Profile/ListSDM';
import ListSiswa from './pages/Profile/ListSiswa';
import ListPrestasi from './pages/Profile/ListPrestasi';
import Ekstrakurikuler from './pages/Profile/Ekstrakurikuler';
import TentangSekolah from './pages/Profile/TentangSekolah';
import ListAgenda from './pages/Informasi/ListAgenda';
import DetailAgenda from './pages/Informasi/ListAgenda/DetailAgenda';
import DetailPengumuman from './pages/Informasi/ListPengumuman/DetailPengumuman';
import Kontak from './pages/Kontak';

const DashboardLayout = lazy(() => import('./layout/DashboardLayout'));
const LoginPage = lazy(() => import('./pages/Dashboard/LoginPage'));
const DashboardHome = lazy(() => import('./pages/Dashboard/DashboardHome'));
const DashboardIndex = lazy(() => import('./pages/Dashboard'));
const VisiMisiManager = lazy(() => import('./pages/Dashboard/modules/VisiMisiManager'));
const SDMManager = lazy(() => import('./pages/Dashboard/modules/SDMManager'));
const PrestasiManager = lazy(() => import('./pages/Dashboard/modules/PrestasiManager'));
const EkskulManager = lazy(() => import('./pages/Dashboard/modules/EkskulManager'));
const AgendaManager = lazy(() => import('./pages/Dashboard/modules/AgendaManager'));
const PengumumanManager = lazy(() => import('./pages/Dashboard/modules/PengumumanManager'));
const KalenderManager = lazy(() => import('./pages/Dashboard/modules/KalenderManager'));
const SchoolBellManager = lazy(() => import('./pages/Dashboard/modules/SchoolBellManager'));

const theme = createTheme({
  typography: {
    fontFamily: `'Plus Jakarta Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    }
  }
});

export const routes = [
  { path: "/", element: <Home />, name: "Beranda" },
  { path: "/profile/tentang-sekolah", element: <TentangSekolah />, name: "Tentang Sekolah" },
  { path: "/profile/visi-misi-tujuan", element: <VisiMisi />, name: "Visi, Misi dan Tujuan" },
  { path: "/profile/sdm-sekolah", element: <ListSdm />, name: "SDM Sekolah" },
  { path: "/profile/statistik-siswa", element: <ListSiswa />, name: "Statistik Siswa" },
  { path: "/profile/prestasi-sekolah", element: <ListPrestasi />, name: "Prestasi Sekolah" },
  { path: "/profile/ekstrakurikuler", element: <Ekstrakurikuler />, name: "Ekstrakurikuler" },
  { path: "/informasi/agenda", element: <ListAgenda />, name: "Agenda" },
  { path: "/informasi/agenda/:no", element: <DetailAgenda />, name: "Detail Agenda" },
  { path: "/informasi/pengumuman", element: <ListPengumuman />, name: "Pengumuman" },
  { path: "/informasi/pengumuman/:no", element: <DetailPengumuman />, name: "Detail Pengumuman" },
  { path: "/kontak", element: <Kontak />, name: "Kontak" },
];

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p>Memuat...</p></div>}>
          <Routes>
            {/* Dashboard routes - MUST be before public routes */}
            <Route path="/dashboard/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardIndex />} />
              <Route path="overview" element={<DashboardHome />} />
              <Route path="visi-misi" element={<VisiMisiManager />} />
              <Route path="sdm" element={<SDMManager />} />
              <Route path="prestasi" element={<PrestasiManager />} />
              <Route path="ekskul" element={<EkskulManager />} />
              <Route path="agenda" element={<AgendaManager />} />
              <Route path="pengumuman" element={<PengumumanManager />} />
              <Route path="kalender" element={<KalenderManager />} />
              <Route path="bel-sekolah" element={<SchoolBellManager />} />
            </Route>

            {/* Public website routes */}
            {routes.map((r) => (
              <Route key={r.path} path={r.path} element={<Layout>{r.element}</Layout>} />
            ))}
          </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default App;