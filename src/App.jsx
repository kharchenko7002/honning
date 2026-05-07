import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Honning from './pages/Honning.jsx';
import OmOss from './pages/OmOss.jsx';
import HvorFinnerDuOss from './pages/HvorFinnerDuOss.jsx';
import Kontakt from './pages/Kontakt.jsx';

// Top-level router config — five routes wrapped in the shared Layout.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/honning" element={<Honning />} />
        <Route path="/om-oss" element={<OmOss />} />
        <Route path="/hvor-finner-du-oss" element={<HvorFinnerDuOss />} />
        <Route path="/kontakt" element={<Kontakt />} />
        {/* Catch-all redirects to homepage */}
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
