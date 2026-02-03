const Pet = require('../models/Pet');
const mongoose = require('mongoose');

// Função 1
const getPets = async (req, res) => {
  try {
    const { tipo } = req.query;
    const filtro = tipo ? { tipo } : {};
    const pets = await Pet.find(filtro);
    res.json(pets);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar animais" });
  }
};

// Função 2
const getPetById = async (req, res) => {
  try {
    const { id } = req.params;

    // Proteção extra contra IDs inválidos para não travar o servidor
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID em formato inválido." });
    }

    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Animal não encontrado no banco" });
    }
    res.json(pet);
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor ao buscar pet" });
  }
};

// EXPORTAÇÃO EXPLÍCITA (Garante que as rotas vejam as funções)
module.exports = {
  getPets,
  getPetById
};