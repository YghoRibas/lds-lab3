import { IUsuario } from '../models';
import { TransacaoRepository, UsuarioRepository } from '../repositories';
import { ISaldo, ITransacaoWithNames } from '../types';
import { CustomError } from '../utils/errorHandler';

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;
  private trasacaoRepository: TransacaoRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
    this.trasacaoRepository = new TransacaoRepository();
  }

  public async getUsuarioById(id: string): Promise<IUsuario | null> {
    return await this.usuarioRepository.getUsuarioById(id);
  }

  public async login(email: string, senha: string): Promise<string | null> {
    return await this.usuarioRepository.login(email, senha);
  }

  public async getSaldo(id: string): Promise<ISaldo> {
    const usuario = await this.usuarioRepository.getUsuarioById(id);

    if (usuario) {
      const transacoes = await this.trasacaoRepository.getTransacaoByRemetenteIdOrDestinatario(id);

      let transacoesWithNames: ITransacaoWithNames[] = [];

      for (const transacao of transacoes) {
        const remetente = await this.usuarioRepository.getUsuarioById(transacao.remetenteId);
        const destinatario = await this.usuarioRepository.getUsuarioById(transacao.destinatarioId);

        transacoesWithNames.push({
          remetenteId: transacao.remetenteId,
          remetenteNome: remetente?.nome || '',
          destinatarioId: transacao.destinatarioId,
          destinatarioNome: destinatario?.nome || '',
          valor: transacao.valor,
          data: transacao.data,
          descricao: transacao.descricao,
        });
      }

      return { moedas: usuario.moedas, transacoes: transacoesWithNames };
    } else {
      throw new CustomError('Usuário não encontrado', 404);
    }
  }
}
