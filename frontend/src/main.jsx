// frontend/main.jsx
import { StrictMode } from 'react'; // ✅ Reativando StrictMode
import { createRoot } from 'react-dom/client';
import './index.css'; // Seu CSS global para reset e variáveis CSS
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* ✅ StrictMode ativado */}
    <App />
  </StrictMode>,
);