export interface ITransacao {
  _id: string;
  destinatarioId: string;
  remetenteId: string;
  valor: number;
  data: Date;
  descricao: string | null;
  vantagemId: string | null;
}

export interface ISaldo {
  moedas: number;
  transacoes: ITransacao[];
}
