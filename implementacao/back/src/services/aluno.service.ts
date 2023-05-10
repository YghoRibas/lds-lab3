import { IAluno } from '../models/aluno';
import { AlunoRepository, TransacaoRepository, UsuarioRepository } from '../repositories';
import { ISaldoAluno } from '../types';
import { CustomError } from '../utils/errorHandler';

export class AlunoService {
  private alunoRepository: AlunoRepository;
  private usuarioRepository: UsuarioRepository;
  private trasacaoRepository: TransacaoRepository;

  constructor() {
    this.alunoRepository = new AlunoRepository();
    this.usuarioRepository = new UsuarioRepository();
    this.trasacaoRepository = new TransacaoRepository();
  }

  public async getAllAlunos(): Promise<IAluno[]> {
    return await this.alunoRepository.getAllAlunos();
  }

  public async getAlunoById(id: string): Promise<IAluno | null> {
    const aluno = await this.alunoRepository.getAlunoById(id);

    if (aluno) {
      return aluno;
    } else {
      throw new CustomError('Aluno não encontrado', 404);
    }
  }

  public async createAluno(data: IAluno): Promise<IAluno> {
    return await this.alunoRepository.createAluno(data);
  }

  public async updateAluno(id: string, data: IAluno): Promise<IAluno | null> {
    return await this.alunoRepository.updateAluno(id, data);
  }

  public async deleteAluno(id: string): Promise<void> {
    return await this.alunoRepository.deleteAluno(id);
  }

  public async getSaldoAluno(id: string): Promise<ISaldoAluno> {
    const aluno = await this.alunoRepository.getAlunoById(id);

    if (aluno) {
      const transacoes = await this.trasacaoRepository.getTransacaoByRemetenteIdOrDestinatario(id);

      transacoes.forEach(async (transacao) => {
        const usuario = await this.usuarioRepository.getUsuarioById(transacao.remetenteId);
        if (transacao.remetenteId !== id) {
          transacao.remetenteId = usuario?.nome || '';
        } else {
          transacao.destinatarioId = usuario?.nome || '';
        }
      });

      return { moedas: aluno.moedas, transacoes };
    } else {
      throw new CustomError('Aluno não encontrado', 404);
    }
  }
}
