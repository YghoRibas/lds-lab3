import { Request, Response } from 'express';
import { AlunoService } from '../services';
import { IAluno } from '../models';

export class AlunoController {
  private alunoService: AlunoService;

  constructor() {
    this.alunoService = new AlunoService();
  }

  public async getAllAlunos(req: Request, res: Response): Promise<void> {
    const aluno: IAluno[] = await this.alunoService.getAllAlunos();
    res.send(aluno);
  }

  public async getAlunoById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const data: IAluno | null = await this.alunoService.getAlunoById(id);
    res.send(data);
  }

  public async createAluno(req: Request, res: Response): Promise<void> {
    const data: IAluno = req.body;
    data.moedas = 1000;
    const newData: IAluno = await this.alunoService.createAluno(data);
    res.send(newData);
  }

  public async updateAluno(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const data: IAluno = req.body;
    const updatedData: IAluno | null = await this.alunoService.updateAluno(id, data);
    res.send(updatedData);
  }

  public async deleteAluno(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    await this.alunoService.deleteAluno(id);
    res.send();
  }
}