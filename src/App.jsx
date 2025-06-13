  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Artikel from './pages/Artikel';
import Layout from './layout/Layout';
import VisiMisi from './pages/Profile/VisiMisi';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

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
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;