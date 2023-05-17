import { IProfessor } from '../models';
import { AlunoRepository, ProfessorRepository, TransacaoRepository, UsuarioRepository } from '../repositories';
import { ISaldo, ITransacaoWithNames } from '../types';
import { CustomError } from '../utils/errorHandler';
import { MailType, sendEmail } from '../utils/mailer';

export class ProfessorService {
  private professorRepository: ProfessorRepository;
  private alunoRepository: AlunoRepository;
  private usuarioRepository: UsuarioRepository;
  private transacaoRepository: TransacaoRepository;

  constructor() {
    this.professorRepository = new ProfessorRepository();
    this.alunoRepository = new AlunoRepository();
    this.usuarioRepository = new UsuarioRepository();
    this.transacaoRepository = new TransacaoRepository();
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
        await this.transacaoRepository.createTransacao({
          remetenteId: professorId,
          destinatarioId: alunoId,
          valor: moedas,
          data: new Date(),
          descricao,
        });
        await sendEmail(aluno.email, {
          subject: 'Moedas Recebidas',
          type: MailType.TEXT,
          body: `Voce recebeu ${moedas} moedas de ${professor.nome}`
        });
      }
    } else {
      throw new CustomError('Professor ou aluno não encontrado', 404);
    }
  }
}
