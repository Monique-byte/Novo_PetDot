const Form = require('../models/Form');
const FormSubmission = require('../models/FormSubmission');
const { v4: uuidv4 } = require('uuid');

// Criar novo questionário de adoção
exports.createForm = async (req, res) => {
  try {
    const { title, description, formSchema, status = 'draft' } = req.body;
    
    const newForm = new Form({
      userId: req.user.id,
      cnpj: req.user.cnpj,
      title,
      description,
      formSchema,
      status,
    });

    if (status === 'published') {
      newForm.publicId = uuidv4().slice(0, 8); // ID curto para compartilhar link
    }

    await newForm.save();
    res.status(201).json({ message: 'Questionário criado!', form: newForm });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar formulário de adoção.' });
  }
};

// Buscar todos os questionários daquela ONG
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ forms });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar formulários.' });
  }
};

// Obter formulário público (Para o adotante preencher)
exports.getFormByPublicId = async (req, res) => {
  try {
    const { publicId } = req.params;
    const form = await Form.findOne({ publicId, status: 'published' });

    if (!form) return res.status(404).json({ error: 'Questionário não encontrado.' });
    res.status(200).json({ form });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar questionário.' });
  }
};

// Adotante envia as respostas do formulário
exports.submitFormData = async (req, res) => {
  try {
    const { publicId } = req.params;
    const form = await Form.findOne({ publicId, status: 'published' });

    if (!form) return res.status(404).json({ error: 'Formulário inativo.' });

    const newSubmission = new FormSubmission({
      formId: form._id,
      data: req.body, // Respostas do adotante
      ipAddress: req.ip
    });
    
    await newSubmission.save();
    res.status(201).json({ message: 'Sua intenção de adoção foi enviada com sucesso!' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao enviar respostas.' });
  }
};

// ONG vê quem respondeu os formulários
exports.getFormSubmissions = async (req, res) => {
  try {
    const formId = req.params.id;
    // Verifica se o formulário pertence a ONG logada
    const form = await Form.findOne({ _id: formId, userId: req.user.id });
    if (!form) return res.status(403).json({ error: 'Acesso negado.' });

    const submissions = await FormSubmission.find({ formId: form._id }).sort({ createdAt: -1 });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar respostas dos candidatos.' });
  }
};