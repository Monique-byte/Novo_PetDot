const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importação das Rotas
const petRoutes = require('./routes/petroutes');
const adoptionRoutes = require('./routes/adoptionroutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// --- CONFIGURAÇÃO DO CORS ---
const allowedOrigins = [
  'https://novo-pet-dot.vercel.app', // Seu link da Vercel
  'http://localhost:3000',           // React local (se usar create-react-app)
  'http://localhost:5173'            // React local (se usar Vite)
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem origin (como aplicativos mobile ou ferramentas de teste tipo Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// --- CONEXÃO MONGODB ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/petdot')
  .then(() => console.log('✅ MongoDB Conectado (PetDot)'))
  .catch(err => console.error('❌ Erro Mongo:', err));

// --- REGISTRO DE ROTAS ---
app.use('/api/auth', authRoutes); 
app.use('/api/pets', petRoutes);
app.use('/api/adoption', adoptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor PetDot rodando na porta ${PORT}`));