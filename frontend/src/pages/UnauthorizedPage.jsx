import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-wrapper">
      <div className="form" style={{ textAlign: 'center', borderTop: '6px solid #e74c3c' }}>
        <div style={{ fontSize: '50px' }}>🚫</div>
        <h2 style={{ color: '#e74c3c' }}>Acesso Restrito</h2>
        <p className="subtitulo">Você não possui permissão administrativa para acessar esta área do portal.</p>
        
        <div style={{ marginTop: '30px' }}>
          <button className="button-submit-ong" onClick={() => navigate('/login')}>
            Fazer Login como ONG
          </button>
          <p className="p" style={{ marginTop: '15px' }}>
            Acha que isso é um erro? <span className="span-link" onClick={() => navigate('/')}>Fale conosco</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;