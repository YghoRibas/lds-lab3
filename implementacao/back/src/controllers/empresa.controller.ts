import { NextFunction, Request, Response } from 'express';
import { EmpresaService } from '../services';
import { IEmpresa } from '../models';
import { CustomError } from '../utils/errorHandler';

export class EmpresaController {
  private empresaService: EmpresaService;

  constructor() {
    this.empresaService = new EmpresaService();
  }

  public async getAllEmpresas(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const empresa: IEmpresa[] = await this.empresaService.getAllEmpresas();
      res.status(200).json(empresa);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async getEmpresaById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IEmpresa | null = await this.empresaService.getEmpresaById(id);
      data ? res.status(200).json(data) : res.status(404).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async createEmpresa(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: IEmpresa = req.body;
      data.vantagens = [];
      const newData: IEmpresa = await this.empresaService.createEmpresa(data);
      res.status(201).json(newData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async updateEmpresa(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IEmpresa = req.body;
      const updatedData: IEmpresa | null = await this.empresaService.updateEmpresa(id, data);
      res.status(200).json(updatedData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async deleteEmpresa(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.empresaService.deleteEmpresa(id);
      res.status(200).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }
}
