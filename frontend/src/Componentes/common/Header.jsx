import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importar o hook
import './Header.css';

const Header = () => {
  const navigate = useNavigate(); // 2. Inicializar a função de navegação

  return (
    <header 
      className="header-container" 
      onClick={() => navigate('/')} 
      style={{ cursor: 'pointer' }}
    >
      <div className="HeaderContent2">
        {/* Ajuste o caminho da imagem se necessário */}
        <img src="../LogoPet.png" alt="Logo" className="LogoHeader1" />
        <h1 className="HeaderTitle">PetDot</h1>
      </div>
    </header>
  );
};

export default Header;