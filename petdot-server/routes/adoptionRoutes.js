const express = require('express');
const router = express.Router();
const AdoptionRequest = require('../models/AdoptionRequest');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware que você já deve ter

// Rota para o Adotante enviar o interesse
router.post('/solicitar', authMiddleware, async (req, res) => {
  try {
    const { petId, respostas } = req.body;
    
    const novoPedido = new AdoptionRequest({
      adotante: req.user.id, // Pego do token JWT
      pet: petId,
      respostas
    });

    await novoPedido.save();
    res.status(201).json({ message: "Solicitação enviada! A ONG será notificada." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao processar solicitação." });
  }
});

// Rota para a ONG ver quem quer adotar os pets dela
router.get('/pedidos-para-minha-ong', authMiddleware, async (req, res) => {
    try {
        // Busca pedidos onde o pet pertence à ONG logada
        // (Isso assume que seu modelo Pet tem um campo 'ong')
        const pedidos = await AdoptionRequest.find()
            .populate('adotante', 'nome email')
            .populate({
                path: 'pet',
                match: { ong: req.user.id } // Filtra apenas pets da ONG logada
            });
            
        // Filtra nulos caso o populate não encontre match da ONG
        const meusPedidos = pedidos.filter(p => p.pet !== null);
        res.json(meusPedidos);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar pedidos." });
    }
});

module.exports = router;