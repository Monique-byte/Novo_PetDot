import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ou seu próprio serviço de API, se tiver

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verificando seu email...');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setMessage('Token de verificação não encontrado na URL.');
        setIsSuccess(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/verify-email/${token}`);
        setMessage(response.data.message);
        setIsSuccess(true);
      } catch (error) {
        console.error('Erro ao verificar email:', error.response?.data?.message || error.message);
        setMessage(error.response?.data?.message || 'Erro ao verificar email. O link pode ser inválido ou ter expirado.');
        setIsSuccess(false);
      } finally {
        setLoading(false);
        // Opcional: Redirecionar automaticamente após alguns segundos
        setTimeout(() => {
          navigate('/'); // Redireciona para o login
        }, 5000);
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        {loading ? (
          <>
            <h2 style={{ color: '#007bff' }}>Aguarde...</h2>
            <p style={{ fontSize: '1.1em', color: '#333', marginTop: '15px' }}>{message}</p>
          </>
        ) : (
          <>
            <h2 style={{ color: isSuccess ? '#28a745' : '#dc3545' }}>
              {isSuccess ? 'Sucesso!' : 'Erro!'}
            </h2>
            <p style={{ fontSize: '1.1em', color: '#333', marginTop: '15px' }}>{message}</p>
            <p style={{ fontSize: '0.9em', color: '#666', marginTop: '20px' }}>
              Você será redirecionado para a página de login em breve...
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                marginTop: '25px',
                padding: '10px 20px',
                fontSize: '1em',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Ir para o Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;