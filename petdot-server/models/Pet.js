
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, enum: ['dog', 'cat'], required: true },
  // ADICIONADO: Campo sexo para permitir a separação no catálogo
  sexo: { type: String, enum: ['Macho', 'Fêmea'], required: true }, 
  idade: { type: String, required: true },
  imagem: { type: String, required: true },
  descricao: { type: String, required: true },
  ongId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   // NOVOS CAMPOS:
  hobbies: { type: [String], default: [] }, 
  historia: { type: String, default: "" },
  disponivel: { type: Boolean, default: true },
  dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pet', PetSchema);