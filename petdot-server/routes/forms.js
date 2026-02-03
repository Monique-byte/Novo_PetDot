// backend/routes/formRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const FormController = require('../controllers/FormController');

// --- CRUD DE FORMULÁRIOS (Exige Login) ---
// Qualquer usuário logado pode gerenciar seus formulários
router.post('/', authMiddleware, FormController.createForm);
router.get('/', authMiddleware, FormController.getForms);
router.get('/:id', authMiddleware, FormController.getFormById);
router.put('/:id', authMiddleware, FormController.updateForm);
router.delete('/:id', authMiddleware, FormController.deleteForm);

// --- ROTAS PÚBLICAS (Acesso Livre) ---
// Usadas para visualização e preenchimento externo
router.get('/public/:publicId', FormController.getFormByPublicId);
router.post('/public/:publicId/submit', FormController.submitFormData);

// --- SUBMISSÕES (Exige Login) ---
// Rota para preenchimento quando o usuário está logado no sistema
router.post('/:id/submit-internal', authMiddleware, FormController.submitInternalFormData);

// Lista todas as respostas de um formulário específico
router.get('/:id/submissions', authMiddleware, FormController.getFormSubmissions);

// --- GERENCIAMENTO DE RESPOSTAS INDIVIDUAIS ---
// Organizado por contexto: /forms/:id/submissions/:submissionId
router.get('/:id/submissions/:submissionId', authMiddleware, FormController.getSubmissionById);
router.put('/:id/submissions/:submissionId', authMiddleware, FormController.updateSubmission);
router.delete('/:id/submissions/:submissionId', authMiddleware, FormController.deleteSubmission);

module.exports = router;