
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPets } from '../../service/api';
import { useApi } from '../../hooks/useApi';

// Componentes que você já possui
import Header from '../../Componentes/common/Header';
import Rodape from '../../Componentes/common/Rodape';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './PetCatalog.css';

const PetCatalog = () => {
  const { especie } = useParams();
  const navigate = useNavigate();
  const { data: pets, loading, request } = useApi(getPets);

  useEffect(() => {
    const tipoBusca = (especie === 'gatos' || especie === 'cat') ? 'cat' : 'dog';
    request(tipoBusca);
    window.scrollTo(0, 0);
  }, [especie, request]);

  if (loading) return (
    <div className="loading-full">
      <div className="paw-loader">🐾</div>
      <p>Carregando catálogo interativo...</p>
    </div>
  );

  const machos = pets?.filter(p => p.sexo?.trim() === "Macho") || [];
  const femeas = pets?.filter(p => p.sexo?.trim() === "Fêmea") || [];

  const swiperOptions = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    coverflowEffect: {
      rotate: 40,
      stretch: 0,
      depth: 150,
      modifier: 1,
      slideShadows: true,
    },
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { clickable: true },
    navigation: true,
    modules: [EffectCoverflow, Pagination, Navigation, Autoplay],
    breakpoints: {
      320: { slidesPerView: 1.2, spaceBetween: 15 },
      768: { slidesPerView: 2.2, spaceBetween: 20 },
      1200: { slidesPerView: 'auto', spaceBetween: 30 }
    }
  };

  const RenderSlider = ({ title, list, themeClass }) => (
    <section className={`catalog-section ${themeClass}`}>
      <div className="container">
        <div className="section-title-box">
          <h2>{title} <span className="pet-count">{list.length}</span></h2>
          <div className="title-underline"></div>
        </div>
        
        <Swiper {...swiperOptions} className="pet-swiper-main">
          {list.map((pet, index) => {
            // LÓGICA: Metade disponível (índices pares), metade indisponível (índices ímpares)
            const isAvailable = index % 2 === 0;

            return (
              <SwiperSlide key={pet._id} className="pet-slide-item">
                <div className={`glass-pet-card ${!isAvailable ? 'unavailable-card' : 'active-card'}`}>
                  <div className="img-box">
                    <img src={pet.imagem} alt={pet.nome} loading="lazy" />
                    <span className="gender-label">{pet.sexo}</span>
                    
                    {!isAvailable && <div className="stamp-indisponivel">Indisponível</div>}
                  </div>

                  <div className="info-box">
                    <h3>{pet.nome}</h3>
                    <div className="meta">
                      <span className="age-tag">📅 {pet.idade}</span>
                      <span className={`status-tag ${isAvailable ? 'online' : 'offline'}`}>
                        {isAvailable ? '● Disponível' : '🚫 Indisponível'}
                      </span>
                    </div>

                    {isAvailable ? (
                     <button className="btn-details" onClick={() => navigate(`/perfil/${pet._id}`)}>
                        Conhecer ✨
                      </button>
                    ) : (
                      <button className="btn-details disabled" disabled>
                        Adoção Suspensa
                      </button>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );

  return (
    <div className="catalog-layout">
      <Header />

      <header className="hero-banner">
        <div className="container">
          <h1 className="hero-title">
            {especie === 'gatos' || especie === 'cat' ? 'Gatos' : 'Cães'} para Adoção
          </h1>
          <p className="hero-subtitle">Venham conhecimentos nossos amiguinhos peludos!</p>
        </div>
      </header>

      <main className="catalog-content-wrapper">
        {machos.length > 0 && <RenderSlider title="Os Meninos" list={machos} themeClass="males-area" />}
        {femeas.length > 0 && <RenderSlider title="As Meninas" list={femeas} themeClass="females-area" />}

        {/* AVISO DE PROJETO PESSOAL */}
        <div className="container">
          <div className="project-disclaimer">
            <div className="disclaimer-icon">⚠️</div>
            <div className="disclaimer-text">
              <h3>Aviso de Projeto Pessoal</h3>
              <p>
                Este site é um <strong>ambiente de estudos e portfólio</strong>. Todas as imagens foram coletadas da web.
              </p>
              <p>
                Alguns animais estão marcados como "Indisponíveis" para demonstrar estados diferentes de interface. 
                <strong> Nenhum animal está de fato para adoção real através deste sistema.</strong>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  );
};

export default PetCatalog;