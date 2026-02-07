import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { motion, AnimatePresence } from 'framer-motion';
import './PetDot.css';
import Navbar from '../../Componentes/common/Navbar';
import HeroSlider from '../../Componentes/common/HeroSlider';
import Header from '../../Componentes/common/Header'; 
import Rodape from '../../Componentes/common/Rodape';

const PetDot = () => {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <>
      <Header />
      <div className="PetDot-Container">
        <Navbar />

        <main>
          {/* 1. Hero / Poster */}
          <section id="home">
            <HeroSlider onCtaClick={toggleModal} />
          </section>

          {/* 2. Estatísticas */}
          <motion.section 
            className="Stats-Bar"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="stat-item">
              <span className="icon-pulse">🐾</span>
              <div className="stat-content">
                <h3>162 MIL</h3>
                <p>Animais amparados</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="icon-pulse">🍖</span>
              <div className="stat-content">
                <h3>7,4 MILHÕES</h3>
                <p>De refeições doadas</p>
              </div>
            </div>
            <div className="stat-item">
              <span className="icon-pulse">🏠</span>
              <div className="stat-content">
                <h3>185 ONGs</h3>
                <p>Apoiadas em todo Brasil</p>
              </div>
            </div>
          </motion.section>

          {/* 3. Campanha de Adoção - Navegação por Espécie */}
          <section className="Adoption-Campaign" id="adocao">
            <div className="campaign-header">
              <motion.h2 initial={{ x: -50 }} whileInView={{ x: 0 }}>
                Campanha de Adoção
              </motion.h2>
              <p>Uma seleção especial de peludinhos que buscam um lar para chamar de seu.</p>
              <hr className="animated-hr" />
            </div>
            
            <div className="pet-circles">
              {[ 
                { id: 1, type: 'dog', color: 'pink-bg', img: '/dog.png' },
                { id: 2, type: 'cat', color: 'blue-bg', img: '/gatinho.png' } 
              ].map((pet) => (
                <motion.div 
                  key={pet.id}
                  className={`pet-circle-item ${pet.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  // REDIRECIONAMENTO: Agora leva para o catálogo filtrado por espécie
                  onClick={() => navigate(`/adocao/${pet.type}`)} 
                >
                  <img 
                    src={pet.img} 
                    alt={pet.type} 
                    onError={(e) => {
                      e.target.src = pet.type === 'dog' ? "/Dog.png" : "/Gatinho.png";
                    }} 
                  />
                  <div className="pet-overlay">
                    {pet.type === 'dog' ? 'Ver Cães' : 'Ver Gatos'}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. Missão e Propósito */}
          <section className="Mission-Purpose" id="pilares">
            <motion.div className="mission-box" variants={fadeIn} initial="hidden" whileInView="visible">
              <div className="mission-title">
                 <span className="icon-small">🦴</span>
                 <h3>Propósito</h3>
              </div>
              <p>  Atuar em todo o ecossistema da proteção animal, desde a castração à adoção, conectando animais e famílias.</p>
            </motion.div>
            <div className="vertical-divider"></div>
            <motion.div className="mission-box" variants={fadeIn} initial="hidden" whileInView="visible">
              <div className="mission-title">
                 <span className="icon-small">🐾</span>
                 <h3>Missão</h3>
              </div>
              <p>Engajar a população com a causa animal de forma ampla, indo muito além da adoção.</p>
            </motion.div>
          </section>

          {/* 5. Faixa Laranja */}
          <section className="Partners-Banner" id="parceiros">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
              ONGS PARCEIRAS
            </motion.h2>
            <button className="btn-white-outline" onClick={toggleModal}>Ver Todas</button>
          </section>
        </main>

        <Rodape />

        {/* MODAL DE AVISO (Para botões não funcionais) */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="modal-overlay" onClick={toggleModal}>
              <motion.div 
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <span className="modal-icon">⚠️</span>
                <h2>Aviso Importante</h2>
                <p>
                  Este é um <strong>projeto pessoal</strong> desenvolvido exclusivamente para fins de estudo e portfólio.
                </p>
                <p>
                  O foco do <strong>PetDot</strong> é demonstrar habilidades de UI/UX e desenvolvimento.
                </p>
                <button className="btn-close-modal" onClick={toggleModal}>Entendi</button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default PetDot;