const mongoose = require('mongoose');
const Usuario = require('./usuario');

const alunoSchema = new mongoose.Schema({
  moeda: {
    type: Number,
    required: true,
    trim: true,
    lowercase: true,
  },

  cpf: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  rg: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  
  endereco: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  }
});

const Aluno = Usuario.discriminator('Aluno', alunoSchema);

module.exports = Aluno;
