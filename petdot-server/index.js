const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importação das Rotas
const petRoutes = require('./routes/petroutes');
const adoptionRoutes = require('./routes/adoptionroutes');
const authRoutes = require('./routes/authRoutes'); // O seu arquivo que você postou agora

const app = express();
app.use(cors());
app.use(express.json());

// --- CONEXÃO MONGODB ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/petdot')
  .then(() => console.log('✅ MongoDB Conectado (PetDot)'))
  .catch(err => console.error('❌ Erro Mongo:', err));

// --- REGISTRO DE ROTAS ---
// Note que o prefixo '/api/auth' vai se somar ao que está no seu authRoutes.js
app.use('/api/auth', authRoutes); 
app.use('/api/pets', petRoutes);
app.use('/api/adoption', adoptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor PetDot rodando na porta ${PORT}`));