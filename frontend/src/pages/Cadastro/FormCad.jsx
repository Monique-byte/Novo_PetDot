import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importe Link para melhor acessibilidade
import './Cadastro.css';
import { useAuth } from '../../context/AuthContext';

const Cadastro = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Estados dos campos
  const [nome, setNome] = useState('');
  const [nomeOng, setNomeOng] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  
  // Estados de controle
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState('');

  // Validações
  const validateEmailFormat = (emailValue) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
  
  const formatCnpj = (value) => {
    const v = value.replace(/\D/g, '');
    return v
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = 'Nome é obrigatório.';
    if (!nomeOng.trim()) newErrors.nomeOng = 'Nome da ONG é obrigatório.';
    if (cnpj.replace(/\D/g, '').length !== 14) newErrors.cnpj = 'CNPJ inválido.';
    if (!validateEmailFormat(email)) newErrors.email = 'E-mail inválido.';
    if (senha.length < 8) newErrors.senha = 'Mínimo 8 caracteres.';
    if (senha !== confirmaSenha) newErrors.confirmaSenha = 'As senhas não coincidem.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await register({
        nome,
        nomeOng,
        cnpj: cnpj.replace(/\D/g, ''),
        email,
        senha
      });
      
      setRegistrationMessage('Conta criada com sucesso!');
      // Redireciona após 2 segundos para o usuário ver a mensagem
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setErrors({ general: error.response?.data?.message || 'Erro ao cadastrar.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    // ESTA DIV É A QUE GARANTE A CENTRALIZAÇÃO COM O CSS
    <div className="cadastro-page-container">
      <div className="login-wrapper">
        
        <div className="header-cadastro">
          <div className="logo2"></div>
          <h2 className="form__column-title">Cadastrar ONG</h2>
          <p className="subtitulo-cadastro">Preencha os dados da sua instituição</p>
        </div>

        <form className="form2" onSubmit={handleSubmit}>
          {/* Nome Responsável */}
          <div className="form__input-group">
            <label className="form__label">Nome do Responsável</label>
            <input
              type="text"
              className="form__input"
              placeholder="Ex: João Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {errors.nome && <span className="error-message">{errors.nome}</span>}
          </div>

          {/* Nome ONG */}
          <div className="form__input-group">
            <label className="form__label">Nome da ONG</label>
            <input
              type="text"
              className="form__input"
              placeholder="Razão Social"
              value={nomeOng}
              onChange={(e) => setNomeOng(e.target.value)}
            />
            {errors.nomeOng && <span className="error-message">{errors.nomeOng}</span>}
          </div>

          {/* CNPJ */}
          <div className="form__input-group">
            <label className="form__label">CNPJ</label>
            <input
              type="text"
              className="form__input"
              placeholder="00.000.000/0000-00"
              value={cnpj}
              onChange={(e) => setCnpj(formatCnpj(e.target.value))}
            />
            {errors.cnpj && <span className="error-message">{errors.cnpj}</span>}
          </div>

          {/* Email */}
          <div className="form__input-group">
            <label className="form__label">E-mail Institucional</label>
            <input
              type="email"
              className="form__input"
              placeholder="ong@exemplo.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Senhas */}
          <div className="form__input-group">
            <label className="form__label">Senha</label>
            <input
              type="password"
              className="form__input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            {errors.senha && <span className="error-message">{errors.senha}</span>}
          </div>

          <div className="form__input-group">
            <label className="form__label">Confirmar Senha</label>
            <input
              type="password"
              className="form__input"
              value={confirmaSenha}
              onChange={(e) => setConfirmaSenha(e.target.value)}
            />
            {errors.confirmaSenha && <span className="error-message">{errors.confirmaSenha}</span>}
          </div>

          {registrationMessage && <p className="success-txt">{registrationMessage}</p>}
          {errors.general && <p className="error-message">{errors.general}</p>}

          <button className="button--primary" type="submit" disabled={loading}>
            {loading ? 'Processando...' : 'Finalizar Cadastro'}
          </button>

          <p className="form__link-paragraph">
            Já tem uma conta?{' '}
            <Link to="/login" className="form__link-text">Fazer Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;