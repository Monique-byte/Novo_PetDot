import './Login.css';
import { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ContLogin = () => {
  const cnpjRef = useRef(null);
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  // Estados do Formulário
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [senha, setSenha] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Estados de Erro
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedCnpj = localStorage.getItem('rememberedCnpj');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe && savedEmail && savedCnpj) {
      setEmail(savedEmail);
      setCnpj(savedCnpj);
      setRememberMe(savedRememberMe);
    }
  }, []);

  const validateEmail = (emailValue) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue);
  };

  const formatCnpjInput = (value) => {
    let v = value.replace(/\D/g, '');
    if (v.length > 14) v = v.slice(0, 14);
    if (v.length >= 13) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, '$1.$2.$3/$4-$5');
    else if (v.length >= 9) v = v.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4}).*/, '$1.$2.$3/$4');
    else if (v.length >= 6) v = v.replace(/^(\d{2})(\d{3})(\d{0,3}).*/, '$1.$2.$3');
    else if (v.length >= 3) v = v.replace(/^(\d{2})(\d{0,3}).*/, '$1.$2');
    return v;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const newErrors = {};

    // Validações
    if (!email) newErrors.email = 'O e-mail institucional é obrigatório.';
    else if (!validateEmail(email)) newErrors.email = 'Formato de e-mail inválido.';

    if (!cnpj) newErrors.cnpj = 'O CNPJ da ONG é obrigatório.';
    else if (cnpj.replace(/\D/g, '').length !== 14) newErrors.cnpj = 'O CNPJ deve conter 14 dígitos.';

    if (!senha) newErrors.senha = 'A senha de acesso é obrigatória.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const credentials = {
        email,
        cnpj: cnpj.replace(/[^\d]/g, ''),
        senha,
      };

      await login(credentials);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
        localStorage.setItem('rememberedCnpj', cnpj);
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedCnpj');
        localStorage.removeItem('rememberMe');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Credenciais inválidas para esta ONG.');
    }
  };

  return (
    <div className="login-container">
      <header className='cabecalho'>
        <div className='Logo'></div>
      </header>

      <form className="form" onSubmit={handleLogin}>
        <div className="header-form">
          <h2 className="titulo-form">Login Institucional</h2>
          <p className="subtitulo">Acesse para gerenciar seus pets e solicitações</p>
        </div>

        {/* Campo Email */}
        <div className="input-group">
          <label className='txtLogin'>E-mail Institucional</label>
          <div className={`inputForm ${errors.email ? 'input-error' : ''}`}>
            <input
              type="email"
              className="input"
              placeholder="exemplo@ong.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Campo CNPJ */}
        <div className="input-group">
          <label className='txtLogin'>CNPJ da Organização</label>
          <div className={`inputForm ${errors.cnpj ? 'input-error' : ''}`}>
            <input
              type="text"
              className="input"
              placeholder="00.000.000/0000-00"
              ref={cnpjRef}
              value={cnpj}
              onChange={(e) => setCnpj(formatCnpjInput(e.target.value))}
            />
          </div>
          {errors.cnpj && <span className="error-text">{errors.cnpj}</span>}
        </div>

        {/* Campo Senha */}
        <div className="input-group">
          <label className='txtLogin'>Senha de Acesso</label>
          <div className={`inputForm ${errors.senha ? 'input-error' : ''}`}>
            <input
              type={mostrarSenha ? "text" : "password"}
              className="input"
              placeholder="Digite a senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span onClick={() => setMostrarSenha(!mostrarSenha)} className="toggle-password">
              {/* Ícone de olho simplificado ou SVG atual */}
              <svg viewBox="0 0 576 512" height="1.2em" fill={mostrarSenha ? "#ff7a00" : "#888"}>
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0z" />
              </svg>
            </span>
          </div>
          {errors.senha && <span className="error-text">{errors.senha}</span>}
        </div>

        {errorMessage && <div className="error-message-box">{errorMessage}</div>}

        <div className="flex-row">
          <div className="remember-container">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Lembrar acesso</label>
          </div>
          <span className="span-link" onClick={() => navigate('/forgot-password')}>Esqueceu a senha?</span>
        </div>

        <button className="button-submit-ong" type="submit" disabled={loading}>
          {loading ? 'Validando...' : 'Entrar no Painel'}
        </button>

        <div className="footer-links">
          <p className="p"> Sua ONG ainda não é parceira?
            <span className="span-link" onClick={() => navigate('/Cadastro')}> Cadastrar ONG </span>
          </p>
          <Link to="/" className="back-link">Voltar ao Início</Link>
        </div>
      </form>
    </div>
  );
}

export default ContLogin;