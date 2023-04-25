const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },

  senha: {
    type: String,
    required: true,
    trim: true,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;