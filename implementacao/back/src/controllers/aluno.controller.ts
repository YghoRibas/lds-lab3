import { NextFunction, Request, Response } from 'express';
import { AlunoService } from '../services';
import { IAluno } from '../models';
import { ISaldo } from '../types';
import { CustomError } from '../utils/errorHandler';

export class AlunoController {
  private alunoService: AlunoService;

  constructor() {
    this.alunoService = new AlunoService();
  }

  public async getAllAlunos(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const aluno: IAluno[] = await this.alunoService.getAllAlunos();
      res.status(200).json(aluno);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async getAlunoById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IAluno | null = await this.alunoService.getAlunoById(id);
      data ? res.status(200).json(data) : res.status(404).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async createAluno(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: IAluno = req.body;
      const newData: IAluno = await this.alunoService.createAluno(data);
      res.status(201).json(newData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async updateAluno(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IAluno = req.body;
      const updatedData: IAluno | null = await this.alunoService.updateAluno(id, data);
      res.status(200).json(updatedData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async deleteAluno(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.alunoService.deleteAluno(id);
      res.status(200).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async getSaldoAluno(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const saldo: ISaldo = await this.alunoService.getSaldoAluno(id);
      res.status(200).json(saldo);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }
}
