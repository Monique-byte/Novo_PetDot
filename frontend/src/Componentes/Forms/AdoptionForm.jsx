import React, { useState } from 'react';
import api from '../../service/api';
import { toast } from 'react-toastify';

const AdoptionForm = ({ petId, onClose }) => {
  const [answers, setAnswers] = useState({
    hasOtherPets: '',
    houseType: '',
    routine: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/adoptions/apply', { petId, answers });
      toast.success("Pedido enviado! A ONG entrará em contato.");
      onClose(); // Fecha o formulário
    } catch (err) {
      toast.error("Erro ao enviar pedido. Verifique se você está logado.");
    }
  };

  return (
    <div className="adoption-form-overlay">
      <form className="adoption-form" onSubmit={handleSubmit}>
        <h2>Questionário de Adoção</h2>
        
        <label>Você possui outros animais?</label>
        <select onChange={(e) => setAnswers({...answers, hasOtherPets: e.target.value})} required>
          <option value="">Selecione...</option>
          <option value="sim">Sim</option>
          <option value="nao">Não</option>
        </select>

        <label>Mora em casa ou apartamento?</label>
        <input type="text" placeholder="Ex: Casa com quintal telado" 
          onChange={(e) => setAnswers({...answers, houseType: e.target.value})} required />

        <label>Conte um pouco sobre sua rotina com o pet:</label>
        <textarea onChange={(e) => setAnswers({...answers, routine: e.target.value})} required />

        <div className="form-buttons">
          <button type="submit" className="btn-confirm">Enviar Interesse</button>
          <button type="button" onClick={onClose} className="btn-cancel">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AdoptionForm;    