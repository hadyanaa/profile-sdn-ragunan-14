  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Artikel from './pages/Artikel';
import Layout from './layout/Layout';
import VisiMisi from './pages/Profile/VisiMisi';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ListAgenda from './pages/Informasi/ListAgenda';
import ListPengumuman from './pages/Informasi/ListPengumuman';
import ListPrestasi from './pages/Profile/ListPrestasi';
import { ImInsertTemplate } from 'react-icons/im';
import TentangSekolah from './pages/Profile/TentangSekolah';
import ListSdm from './pages/Profile/ListSDM';

const theme = createTheme({
  typography: {
    fontFamily: `'Plus Jakarta Sans', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: {
      fontWeight: 700,
    },
    body1: {
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // ini penting!
        },
      },
    }
  }
});

export const routes = [
  { path: "/", element: <Home />, name: "Beranda" },
  { path: "/profile/tentang-sekolah", element: <TentangSekolah />, name: "Tentang Sekolah" },
  { path: "/profile/visi-misi-tujuan", element: <VisiMisi />, name: "Visi, Misi dan Tujuan" },
  { path: "/profile/sdm-sekolah", element: <ListSdm />, name: "SDM Sekolah" },
  { path: "/profile/statistik-siswa", element: <VisiMisi />, name: "Statistik Siswa" },
  { path: "/profile/prestasi-sekolah", element: <ListPrestasi />, name: "Prestasi Sekolah" },
  { path: "/profile/ekstrakurikuler", element: <ListPrestasi />, name: "Ekstrakurikuler" },
  { path: "/informasi/agenda", element: <ListAgenda />, name: "Agenda" },
  { path: "/informasi/pengumuman", element: <ListPengumuman />, name: "Pengumuman" },
];

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            {routes.map((r) =>(
              <Route key={r.path} path={r.path} element={r.element} />
            ))}
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;