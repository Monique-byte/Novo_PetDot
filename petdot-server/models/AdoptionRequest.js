const mongoose = require('mongoose');

const AdoptionRequestSchema = new mongoose.Schema({
  // Referência ao Usuário que quer adotar
  adotante: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Referência ao Pet que ele escolheu
  pet: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  // Respostas do formulário (para a ONG avaliar o perfil)
  respostas: {
    moradia: String, // Casa, Apto...
    outrosPets: String,
    tempoLivre: String,
    mensagem: String
  },
  status: { 
    type: String, 
    enum: ['pendente', 'em_analise', 'aprovado', 'reprovado'], 
    default: 'pendente' 
  },
  dataPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdoptionRequest', AdoptionRequestSchema);