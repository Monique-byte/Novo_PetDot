import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../service/api'; // Ajustado o caminho
import './Login.css'; 

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      // No PetDot, enviamos apenas o email
      await forgotPassword(email);
      setMessage('Se o e-mail estiver cadastrado, as instruções de recuperação foram enviadas.');
      setEmail('');
    } catch (err) {
      setError('Erro ao processar solicitação. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <header className='cabecalho'>
        <div className='Logo'></div>
        <h2 className="titulo-portal">Recuperar Acesso</h2>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <p className="subtitulo">Insira o e-mail da sua ONG para receber o link de redefinição.</p>
        
        <div className="flex-column">
          <label className='txtLogin'>E-mail Institucional</label>
        </div>
        <div className="inputForm">
          <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
          </svg>
          <input
            type="email"
            className="input"
            placeholder="exemplo@ong.org"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && <p className="error-message-box">{error}</p>}
        {message && <p className="success-message" style={{ color: 'green', textAlign: 'center', fontSize: '14px' }}>{message}</p>}

        <button className="button-submit-ong" type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
        </button>

        <p className="p">
          Lembrou a senha? <span className="span-link" onClick={() => navigate('/login')}>Voltar ao Login</span>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;