import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/errorHandler';
import { VantagemService } from '../services/vantagem.service';
import { IVantagem } from '../models/vantagem';

export class VantagemController {
  private vanatagemService: VantagemService;

  constructor() {
    this.vanatagemService = new VantagemService();
  }

  public async getAllVantagens(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.body.id;
      const empresa: IVantagem[] = await this.vanatagemService.getAllVantagens(id);
      res.status(200).json(empresa);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async getVantagemById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IVantagem | null = await this.vanatagemService.getVantagemById(id);
      data ? res.status(200).json(data) : res.status(404).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async createVantagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data: IVantagem = req.body;
      const newData: IVantagem | null = await this.vanatagemService.createVantagem(data);
      res.status(201).json(newData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async updateVantagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const data: IVantagem = req.body;
      const updatedData: IVantagem | null = await this.vanatagemService.updateVantagem(id, data);
      res.status(200).json(updatedData);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async deleteVantagem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      await this.vanatagemService.deleteVantagem(id);
      res.status(200).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }
}
