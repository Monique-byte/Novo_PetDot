const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: { 
    type: String, 
    required: true 
  },
  // ADICIONADO: Nome da ONG (importante para o PetDot)
  nomeOng: { 
    type: String 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true 
  },
  senha: { 
    type: String, 
    required: true 
  },
  cnpj: { 
    type: String,
    unique: true,
    sparse: true // Permite que o campo seja único, mas aceite nulos (para adotantes)
  },
  tipo: { 
    type: String, 
    enum: ['adotante', 'ong'], 
    default: 'adotante' 
  },

  // --- CAMPOS PARA VERIFICAÇÃO DE E-MAIL ---
  isEmailVerified: { 
    type: Boolean, 
    default: false 
  },
  verificationToken: String,
  verificationTokenExpires: Date,

  // --- CAMPOS PARA RECUPERAÇÃO DE SENHA ---
  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // --- DATA DE CRIAÇÃO ---
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);