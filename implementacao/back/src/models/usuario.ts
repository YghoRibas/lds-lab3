import { Document, Schema, model } from "mongoose";

export interface IUsuario extends Document {
  nome: string;
  email: string;
  senha: string;
}

const usuarioSchema = new Schema({
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

export const Usuario = model<IUsuario>("Usuario", usuarioSchema);