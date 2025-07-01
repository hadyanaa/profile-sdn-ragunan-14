  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Artikel from './pages/Artikel';
import Layout from './layout/Layout';
import VisiMisi from './pages/Profile/VisiMisi';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import ListGuru from './pages/Profile/ListGuru';
import ListTendik from './pages/Profile/ListTendik';
import ListAgenda from './pages/Informasi/ListAgenda';
import ListPengumuman from './pages/Informasi/ListPengumuman';

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

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/artikel" element={<Artikel />} />
            <Route path="/profile/visi-misi" element={<VisiMisi />} />
            <Route path="/profile/staf-guru" element={<ListGuru />} />
            <Route path="/profile/staf-tendik" element={<ListTendik />} />
            <Route path="/informasi/agenda" element={<ListAgenda />} />
            <Route path="/informasi/pengumuman" element={<ListPengumuman />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;