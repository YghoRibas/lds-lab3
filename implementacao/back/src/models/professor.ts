import mongoose from 'mongoose';
import { IUsuario, Usuario } from './usuario';

export interface IProfessor extends IUsuario {
  moedas: number;
  cpf: string;
}

const professorSchema = new mongoose.Schema({
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
});

export const Professor = Usuario.discriminator<IProfessor>('professor', professorSchema);
