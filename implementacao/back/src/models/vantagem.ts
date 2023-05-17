import { Document, Schema, model } from 'mongoose';

export interface IVantagem extends Document {
  nome: string;
  descricao: string;
  valor: number;
  fotoName: string;
  foto: string;
  idEmpresa: string;
}

const vantagemSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  fotoName: {
    type: String,
    required: true,
  },
  foto: {
    type: String,
    required: true,
  },
  idEmpresa: {
    type: String,
    required: true,
  },
});

export const Vantagem = model<IVantagem>('vantagen', vantagemSchema);
