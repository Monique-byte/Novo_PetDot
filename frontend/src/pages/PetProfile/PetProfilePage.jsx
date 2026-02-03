import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaWhatsapp, FaHeart, FaShareAlt, FaPaw } from 'react-icons/fa';
import Navbar from '../../Componentes/common/Navbar';
import Rodape from '../../Componentes/common/Rodape';
import { getPetById } from '../../service/api'; // IMPORTANTE: Importar a função da API
import './PetProfile.css';

const PetProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPet = async () => {
      try {
        setLoading(true);
        // Agora buscamos no Banco de Dados Real
        const response = await getPetById(id);
        setPet(response.data);
      } catch (error) {
        console.error("Erro ao carregar pet:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarPet();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <div className="loading">Carregando informações do pet...</div>;
  if (!pet) return <div className="loading">Pet não encontrado no banco de dados!</div>;

  return (
    <div className="PetProfile-Container">
      <Navbar />
      
      <main className="profile-main">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Voltar
        </button>

        <section className="profile-content">
          {/* Lado Esquerdo: Imagem (Usando pet.imagem do banco) */}
          <motion.div 
            className="profile-image-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img src={pet.imagem} alt={pet.nome} className="main-pet-img" />
            <div className="image-gallery">
               <div className="thumb active"><img src={pet.imagem} alt="thumb" /></div>
               <div className="thumb"><FaPaw /></div>
               <div className="thumb"><FaPaw /></div>
            </div>
          </motion.div>

          {/* Lado Direito: Informações (Usando campos do banco) */}
          <motion.div 
            className="profile-info-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="info-header">
              <h1>{pet.nome}</h1>
              <div className="actions">
                <FaHeart className="icon-btn heart" />
                <FaShareAlt className="icon-btn" />
              </div>
            </div>
            
            <p className="pet-location">Abrigado por: <strong>ONG PetDot</strong></p>

            <div className="pet-grid-info">
              <div className="grid-item"><span>Idade:</span> <strong>{pet.idade}</strong></div>
              <div className="grid-item"><span>Sexo:</span> <strong>{pet.sexo}</strong></div>
              <div className="grid-item"><span>Tipo:</span> <strong>{pet.tipo === 'dog' ? 'Cão' : 'Gato'}</strong></div>
              <div className="grid-item"><span>Porte:</span> <strong>Médio</strong></div>
            </div>

            {/* Renderizando os Hobbies como tags */}
            <div className="tags-container">
              {pet.hobbies && pet.hobbies.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>

            <div className="pet-story">
              <h3>Minha História</h3>
              {/* Usando o campo 'historia' (sem acento) que está no seu banco */}
              <p>{pet.historia || pet.descricao}</p>
            </div>

            <div className="contact-actions">
              <button className="btn-adopt">Quero Adotar o {pet.nome}</button>
              <button className="btn-whatsapp">
                <FaWhatsapp /> Falar com Abrigo
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      <Rodape />
    </div>
  );
};

export default PetProfilePage;