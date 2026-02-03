// App.jsx
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importações de Páginas
import HomePage from './pages/HomePage/PetDot.jsx'; 
import ContLogin from './pages/Login/ContLogin.jsx';
import ContCadastro from './pages/Cadastro/ContCadastro.jsx';
import ForgotPasswordPage from './pages/Login/ForgotPasswordPage.jsx';
import VerifyEmailPage from './Verify/VerifyEmailPage';
import NotFoundPage from './pages/NotFoundPage.jsx';
import PetProfilePage from './pages/PetProfile/PetProfilePage.jsx';

// 1. ADICIONE ESTA IMPORTAÇÃO (Verifique o caminho da sua pasta)
import PetCatalog from './pages/Catalogo/PetCatalog.jsx'; 

// --- COMPONENTES DE CONTROLE DE ROTA (PrivateRoute, PublicOnlyRoute...) ---
// (Mantenha as definições de PrivateRoute e PublicOnlyRoute aqui em cima como você já tem)

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Carregando...</div>;
  if (user) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={5000} theme="colored" />
        
        <Routes>
          {/* Rota Inicial (Landing Page) */}
          <Route path="/" element={<HomePage />} />

          {/* 2. ROTA DO CATÁLOGO (Adicionada aqui) */}
          {/* Essa rota permite entrar em /adocao/dog ou /adocao/cat */}
          <Route path="/adocao/:especie" element={<PetCatalog />} />

          {/* ROTA DE PERFIL INDIVIDUAL */}
          <Route path="/perfil/:id" element={<PetProfilePage />} />

          {/* Rotas de Autenticação */}
          <Route path="/login" element={<PublicOnlyRoute><ContLogin /></PublicOnlyRoute>} />
          <Route path="/cadastro" element={<PublicOnlyRoute><ContCadastro /></PublicOnlyRoute>} />
          <Route path="/forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />
          
          <Route path="/verify-email/:token" element={<VerifyEmailPage />} />

          {/* Área Logada */}
          <Route path="/dashboard" element={
            <PrivateRoute>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h1>Painel do Usuário / ONG</h1>
                <p>Aqui você gerenciará seus pets e adoções.</p>
                <button onClick={() => window.location.href = '/'}>Voltar para Home</button>
              </div>
            </PrivateRoute>
          } />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;