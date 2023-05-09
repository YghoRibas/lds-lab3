import { ITransacao, Transacao } from '../models';

export class TransacaoRepository {
  public async getTransacaoByRemetenteIdOrDestinatario(id: string): Promise<ITransacao[]> {
    return await Transacao.find({ $or: [{ remetenteId: id }, { destinatarioId: id }] });
  }
}
