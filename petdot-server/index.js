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
  'http://localhost:3000',           // React local
  'http://localhost:5173'            // React local (Vite)
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite se o origin estiver na lista ou se não houver origin (como no Postman ou mobile)
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || origin.includes('loca.lt')) {
      callback(null, true);
    } else {
      console.log("CORS bloqueou o origin:", origin); // Ajuda a debugar se houver erro
      callback(new Error('Não permitido pelo CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'bypass-tunnel-reminder'],
  credentials: true
}));

app.use(express.json());

// --- ROTA RAIZ (Para não dar mais "Cannot GET /") ---
app.get('/', (req, res) => {
  res.send({
    status: "online",
    message: "🚀 Servidor PetDot funcionando com sucesso!",
    database: mongoose.connection.readyState === 1 ? "Conectado" : "Desconectado"
  });
});

// --- CONEXÃO MONGODB ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/petdot')
  .then(() => console.log('✅ MongoDB Conectado (PetDot)'))
  .catch(err => console.error('❌ Erro Mongo:', err));

// --- REGISTRO DE ROTAS ---
app.use('/api/auth', authRoutes); 
app.use('/api/pets', petRoutes);
app.use('/api/adoption', adoptionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor PetDot rodando na porta ${PORT}`);
  console.log(`Mantenha o terminal do Localtunnel aberto para acesso externo!`);
});