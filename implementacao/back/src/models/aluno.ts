import mongoose from 'mongoose';
import { IUsuario, Usuario } from './usuario';

export interface IAluno extends IUsuario {
  moeda: number;
  cpf: string;
  rg: string;
  endereco: string;
}

const alunoSchema = new mongoose.Schema({
  moeda: {
    type: Number,
    required: false,
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

export const Aluno = Usuario.discriminator<IAluno>('aluno', alunoSchema);
