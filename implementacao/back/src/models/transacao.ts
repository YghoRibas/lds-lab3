import mongoose, { Document, Schema, model } from 'mongoose';

export interface ITransacao extends Document {
  destinatarioId: string;
  remetenteId: string;
  valor: number;
  data: Date;
  descricao: string | null;
  vantagemId: string | null;
}

const transacaoSchema = new Schema({
  destinatarioId: {
    type: String,
    required: true,
    trim: true,
  },

  remetenteId: {
    type: String,
    required: true,
    trim: true,
  },

  valor: {
    type: Number,
    required: true,
    trim: true,
  },

  data: {
    type: Date,
    required: true,
    trim: true,
  },

  descricao: {
    type: String,
    required: false,
    trim: true,
  },

  vantagemId: {
    type: String,
    required: false,
    trim: true,
  }
});

export const Transacao = model<ITransacao>('transacao', transacaoSchema);
