import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/errorHandler';
import { ProfessorService } from '../services/professor.service';
import { IProfessor } from '../models';

export class ProfessorController {
  private professorService: ProfessorService;

  constructor() {
    this.professorService = new ProfessorService();
  }

  public async getAllProfessores(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const aluno: IProfessor[] = await this.professorService.getAllProfessores();
      res.status(200).json(aluno);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async getProfessorById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IProfessor | null = await this.professorService.getProfessorById(id);
      data ? res.status(200).json(data) : res.status(404).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async createProfessor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: IProfessor = req.body;
      data.moedas = 1000;
      const newData: IProfessor = await this.professorService.createProfessor(data);
      res.status(201).json(newData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async updateProfessor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IProfessor = req.body;
      const updatedData: IProfessor | null = await this.professorService.updateProfessor(id, data);
      res.status(200).json(updatedData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async deleteProfessor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.professorService.deleteProfessor(id);
      res.status(200).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async transferirMoedas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const professorId: string = req.body.professorId;
      const alunoId: string = req.body.alunoId;
      const moedas: number = req.body.moedas;
      const descricao: string = req.body.descricao;
      await this.professorService.transferirMoedas(professorId, alunoId, moedas, descricao);
      res.status(200);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }
}
