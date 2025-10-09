import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource/plus-jakarta-sans'; // otomatis load regular (400)
import ReactGA from "react-ga4";

// Ganti dengan ID kamu dari Google Analytics
ReactGA.initialize("G-1NB3PNYZPW");

// Kirim event "pageview" saat aplikasi pertama kali dimuat
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
