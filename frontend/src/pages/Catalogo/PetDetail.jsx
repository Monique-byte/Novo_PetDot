
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPetById } from '../../service/api';
import { useApi } from '../../hooks/useApi';
import './PetDetail.css';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pet, loading, request } = useApi(getPetById);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    request(id);
    window.scrollTo(0, 0);
  }, [id, request]);

  // Galeria simulada (já que o banco costuma ter 1 foto, criamos um array)
  const galeria = pet ? [
    pet.imagem,
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800"
  ] : [];

  const nextImage = () => setCurrentImgIndex((prev) => (prev + 1) % galeria.length);
  const prevImage = () => setCurrentImgIndex((prev) => (prev - 1 + galeria.length) % galeria.length);

  if (loading) return (
    <div className="loading-screen-detail">
      <div className="loader-paw">🐾</div>
      <p>Carregando história de {pet?.nome || 'seu amigo'}...</p>
    </div>
  );

  if (!pet) return (
    <div className="error-not-found">
       <h2>Animal não encontrado</h2>
       <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );

  return (
    <div className="detail-master-wrapper">
      <button onClick={() => navigate(-1)} className="float-back-btn">← Voltar para o catálogo</button>

      <div className="detail-glass-card">
        
        {/* COLUNA 1: VISUAL & SLIDER */}
        <div className="visual-column">
          <div className="slider-container-detail">
            <img 
              key={currentImgIndex} 
              src={galeria[currentImgIndex]} 
              alt={pet.nome} 
              className="main-detail-img" 
            />
            <div className="slider-arrows">
              <button onClick={prevImage}>❮</button>
              <button onClick={nextImage}>❯</button>
            </div>
          </div>
          <div className="thumb-nav">
            {galeria.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumb-circle ${idx === currentImgIndex ? 'active' : ''}`}
                onClick={() => setCurrentImgIndex(idx)}
              >
                <img src={img} alt="thumb" />
              </div>
            ))}
          </div>
        </div>

        {/* COLUNA 2: INFO & CONTO */}
        <div className="info-column">
          <header className="info-header-detail">
            <span className="type-tag">{pet.tipo === 'dog' ? '🐶 Cachorro' : '🐱 Gato'}</span>
            <h1 className="pet-title-name">{pet.nome}</h1>
            <div className="pet-meta-row">
              <span className="meta-badge">📅 {pet.idade}</span>
              <span className="meta-badge">⚧ {pet.sexo}</span>
            </div>
          </header>

          {/* O QUE GOSTA DE FAZER */}
          <section className="info-section-block reveal-anim-1">
            <h3>O que eu amo fazer:</h3>
            <div className="hobbies-tags">
              {(pet.hobbies && pet.hobbies.length > 0 ? pet.hobbies : ["Brincar", "Dormir", "Explorar"]).map((h, i) => (
                <span key={i} className="hobby-pill">✨ {h}</span>
              ))}
            </div>
          </section>

          {/* HISTÓRIA / CONTO */}
          <section className="info-section-block reveal-anim-2">
            <h3>Minha Pequena História:</h3>
            <div className="story-container">
              <p>
                {pet.historia || "Fui encontrado em um dia de sol e desde então venho espalhando alegria por onde passo. Adoro fazer novas amizades e estou em busca de um coração que precise de um pouco mais de carinho e lealdade todos os dias!"}
              </p>
            </div>
          </section>

          <footer className="detail-footer-actions reveal-anim-3">
             <div className="unavailable-alert">
                ⚠️ Este animal faz parte de um <strong>projeto fictício</strong>. Adoção não disponível.
             </div>
             <button className="btn-adopt-locked" disabled>Adoção Indisponível</button>
          </footer>
        </div>

      </div>

      <div className="disclaimer-bottom-page">
         Todas as imagens foram tiradas da web para fins de estudo e aplicação de conhecimentos.
      </div>
    </div>
  );
};

export default PetDetail;