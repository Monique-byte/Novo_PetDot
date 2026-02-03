import React from 'react';
import './Rodape.css'; // ✅ Corrigido para o CSS do Rodapé
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Rodape = () => {
  return (
    <footer className="FooterNovo">
      <div className="footer-content">
        <div className="footer-img">
          <img src="../LogoPet.png" alt="Logo PetDot" />
        </div>

        <div className="footer-right-content">
          <div className="footer-links">
            <h4>PetDot</h4>
            <a href="#">Sobre nós</a>
            <a href="#">Contato</a>
          </div>

          <div className="footer-links">
            <h4>Suporte</h4>
            <a href="#">FAQ</a>
            <a href="#">Ajuda</a>
          </div>

          <div className="footer-social">
            <h4>Nossas redes sociais</h4>
            <div className="icons">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;