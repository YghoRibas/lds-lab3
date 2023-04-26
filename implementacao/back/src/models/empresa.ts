import mongoose from 'mongoose';
import { IUsuario, Usuario } from './usuario';

export interface IEmpresa extends IUsuario {
  vantagens: string[];
}

const empresaSchema = new mongoose.Schema({
  vantagens: {
    type: [String],
    required: true,
    trim: true,
    lowercase: true,
  }
});

export const Empresa = Usuario.discriminator<IEmpresa>('empresa', empresaSchema);