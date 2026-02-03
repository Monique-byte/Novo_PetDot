import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login/Login.css'; // Usando as classes de centralização

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="form" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '80px', color: '#0f406d', margin: '0' }}>404</h1>
        <h2 style={{ color: '#ff7a00' }}>Au au! Essa página fugiu!</h2>
        <p className="subtitulo">Não encontramos o que você procurava. Talvez o link tenha expirado ou foi removido.</p>
        
        <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="button-submit-ong" onClick={() => navigate('/')}>
            Ir para a Home
          </button>
          <span className="span-link" onClick={() => navigate(-1)}>Voltar à página anterior</span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;