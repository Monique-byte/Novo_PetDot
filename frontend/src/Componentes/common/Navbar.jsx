import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHeart, FaBars } from 'react-icons/fa'; 
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
    setIsMenuOpen(false); // Fecha o menu ao clicar
  };

  // Função específica para o botão doar
  const handleDoarClick = () => {
    if (!user) {
      navigate('/login'); // Se não estiver logado, vai para login
    } else {
      handleScroll('doar'); // Se estiver logado, rola para a seção ou vai para página de doação
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="nav-bar">
        {/* Lado Esquerdo: Links com separador | */}
        <div className="nav-links-left">
          <button onClick={() => handleScroll('adocao')}>Quero adotar</button>
          <span className="separator">|</span>
          <button onClick={handleDoarClick}>Quero doar</button>
          <span className="separator">|</span>
          <button onClick={() => handleScroll('pilares')}>Pilares</button>
          <span className="separator">|</span>
        </div>

        {/* Lado Direito: Ícones e Botões */}
        <div className="nav-actions-right">
          <FaHeart className="icon-heart" />
          
          {!user ? (
            <div className="auth-buttons-desktop">
              <button className="btn-outline" onClick={() => navigate('/cadastro')}>
                Seja nosso parceiro
              </button>
              <button className="btn-outline" onClick={() => navigate('/login')}>
                Entrar
              </button>
            </div>
          ) : (
            <div className="user-info">
              <span className="user-name" onClick={() => navigate('/settings')}>
                Olá, {user.nome?.split(' ')[0]}
              </span>
              <button className="btn-exit" onClick={logout}>Sair</button>
            </div>
          )}

          {/* O menu de barras agora funciona como um menu global ou mobile */}
          <div className="hamburger-container">
            <FaBars className="icon-nav hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)} />
            
            {/* Dropdown do Menu hambúrguer */}
            {isMenuOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleScroll('adocao')}>Quero adotar</button>
                <button onClick={handleDoarClick}>Quero doar</button>
                <button onClick={() => handleScroll('pilares')}>Pilares</button>
                <hr />
                {!user ? (
                  <>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/cadastro')}>Cadastre-se</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate('/settings')}>Minha Conta</button>
                    <button onClick={logout} className="logout-text">Sair</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;