import { IProfessor } from '../models';
import { AlunoRepository, ProfessorRepository, TransacaoRepository, UsuarioRepository } from '../repositories';
import { ISaldo, ITransacaoWithNames } from '../types';
import { CustomError } from '../utils/errorHandler';

export class ProfessorService {
  private professorRepository: ProfessorRepository;
  private alunoRepository: AlunoRepository;
  private usuarioRepository: UsuarioRepository;
  private trasacaoRepository: TransacaoRepository;

  constructor() {
    this.professorRepository = new ProfessorRepository();
    this.alunoRepository = new AlunoRepository();
    this.usuarioRepository = new UsuarioRepository();
    this.trasacaoRepository = new TransacaoRepository();
  }

  public async getAllProfessores(): Promise<IProfessor[]> {
    return await this.professorRepository.getAllProfessores();
  }

  public async getProfessorById(id: string): Promise<IProfessor | null> {
    const professor = await this.professorRepository.getProfessorById(id);

    if (professor) {
      return professor;
    } else {
      throw new CustomError('Professor não encontrado', 404);
    }
  }

  public async createProfessor(data: IProfessor): Promise<IProfessor> {
    return await this.professorRepository.createProfessor(data);
  }

  public async updateProfessor(id: string, data: IProfessor): Promise<IProfessor | null> {
    return await this.professorRepository.updateProfessor(id, data);
  }

  public async deleteProfessor(id: string): Promise<void> {
    return await this.professorRepository.deleteProfessor(id);
  }

  public async getSaldoProfessor(id: string): Promise<ISaldo> {
    const professor = await this.professorRepository.getProfessorById(id);

    if (professor) {
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

      return { moedas: professor.moedas, transacoes: transacoesWithNames };
    } else {
      throw new CustomError('Professor não encontrado', 404);
    }
  }

  public async transferirMoedas(professorId: string, alunoId: string, moedas: number, descricao: string): Promise<void> {
    const professor = await this.professorRepository.getProfessorById(professorId);
    const aluno = await this.alunoRepository.getAlunoById(alunoId);

    if (professor && aluno) {
      if (professor.moedas < moedas) {
        throw new CustomError('Professor não possui saldo suficiente', 400);
      } else {
        professor.moedas -= moedas;
        aluno.moedas += moedas;

        await this.professorRepository.updateProfessor(professorId, professor);
        await this.alunoRepository.updateAluno(alunoId, aluno);
        await this.trasacaoRepository.createTransacao({
          remetenteId: professorId,
          destinatarioId: alunoId,
          valor: moedas,
          data: new Date(),
          descricao,
        });
      }
    } else {
      throw new CustomError('Professor ou aluno não encontrado', 404);
    }
  }
}
