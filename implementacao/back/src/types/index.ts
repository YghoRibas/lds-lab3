import { ITransacao } from '../models';

export interface ISaldoAluno {
  moedas: number;
  transacoes: ITransacao[];
}