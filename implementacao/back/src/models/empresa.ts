import mongoose from 'mongoose';
import { IUsuario, Usuario } from './usuario';

export interface IEmpresa extends IUsuario {
    nome: string;
    descricao: string;
    valor: number;
    foto: {
      data: Buffer;
      contentType: string;
    };
}

const empresaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    lowercase: true
  },

  descricao:{
    type: String,
    required: true,
    lowercase: true
  },

  valor:{
    type: Number,
    required: true,
  },

  foto:{
    data: Buffer,
    contentType: String,
  }
});

export const Empresa = Usuario.discriminator<IEmpresa>('Empresa', empresaSchema);