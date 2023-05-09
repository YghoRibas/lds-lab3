import mongoose from 'mongoose';
import { IUsuario, Usuario } from './usuario';

export interface IAluno extends IUsuario {
  moedas: number;
  cpf: string;
  rg: string;
  endereco: string;
}

const alunoSchema = new mongoose.Schema({
  moedas: {
    type: Number,
    required: false,
    trim: true,
  },

  cpf: {
    type: String,
    required: true,
    trim: true,
  },

  rg: {
    type: String,
    required: true,
    trim: true,
  },
  
  endereco: {
    type: String,
    required: true,
    trim: true,
  }
});

export const Aluno = Usuario.discriminator<IAluno>('aluno', alunoSchema);