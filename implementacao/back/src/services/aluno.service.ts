import { IAluno } from '../models/aluno';
import { AlunoRepository } from '../repositories';
import { ISaldoAluno } from '../types';

export class AlunoService {
  private alunoRepository: AlunoRepository;

  constructor() {
    this.alunoRepository = new AlunoRepository();
  }

  public async getAllAlunos(): Promise<IAluno[]> {
    return await this.alunoRepository.getAllAlunos();
  }

  public async getAlunoById(id: string): Promise<IAluno | null> {
    return await this.alunoRepository.getAlunoById(id);
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
    return await this.alunoRepository.getSaldoAluno(id);
  }
}