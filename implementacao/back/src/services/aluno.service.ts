import { IAluno } from '../models/aluno';
import { AlunoRepository, TransacaoRepository, UsuarioRepository } from '../repositories';
import { ISaldo, ITransacaoWithNames } from '../types';
import { CustomError } from '../utils/errorHandler';

export class AlunoService {
  private alunoRepository: AlunoRepository;
  private usuarioRepository: UsuarioRepository;
  private transacaoRepository: TransacaoRepository;

  constructor() {
    this.alunoRepository = new AlunoRepository();
    this.usuarioRepository = new UsuarioRepository();
    this.transacaoRepository = new TransacaoRepository();
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
}
