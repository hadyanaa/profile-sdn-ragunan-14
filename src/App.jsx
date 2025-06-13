  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Artikel from './pages/Artikel';
import Layout from './layout/Layout';
import VisiMisi from './pages/Profile/VisiMisi';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/artikel" element={<Artikel />} />
          <Route path="/profile/visi-misi" element={<VisiMisi />} />
        </Routes>
      </Layout>

    </Router>
  );
}

export default App;