
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Middleware para proteger a rota
const { getRecentActivities } = require('../controllers/activityController'); // Importa a função do controller

/**
 * @route   GET /api/activity/recent
 * @desc    Busca as atividades recentes para o usuário logado
 * @access  Private (requer autenticação)
 */
router.get('/recent', authMiddleware, getRecentActivities);

module.exports = router;