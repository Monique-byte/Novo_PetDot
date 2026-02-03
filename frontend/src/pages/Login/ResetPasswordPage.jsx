import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/api'; 
import './Login.css';

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (newPassword.length < 8) {
      setError('A nova senha deve ter pelo menos 8 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, newPassword);
      setMessage('Sua senha foi redefinida com sucesso!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <header className='cabecalho'>
        <div className='Logo'></div>
        <h2 className="titulo-portal">Nova Senha</h2>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <p className="subtitulo">Crie uma senha forte para proteger os dados da sua ONG.</p>

        <div className="flex-column">
          <label className='txtLogin'>Nova Senha</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Mínimo 8 caracteres"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="flex-column">
          <label className='txtLogin'>Confirmar Senha</label>
        </div>
        <div className="inputForm">
          <input
            type="password"
            className="input"
            placeholder="Repita a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && <p className="error-message-box">{error}</p>}
        {message && <p className="success-message" style={{ color: 'green', textAlign: 'center' }}>{message} Redirecionando...</p>}

        <button className="button-submit-ong" type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Nova Senha'}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;