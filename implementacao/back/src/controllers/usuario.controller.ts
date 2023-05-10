import { NextFunction, Request, Response } from 'express';
import { UsuarioService } from '../services';
import { CustomError } from '../utils/errorHandler';
import { ISaldo } from '../types';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const data = req.body;
      const id: string | null = await this.usuarioService.login(data.email, data.senha);
      id ? res.status(200).json(id) : res.status(403).send();
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }

  public async getSaldo(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id: string = req.params.id;
      const saldo: ISaldo = await this.usuarioService.getSaldo(id);
      res.status(200).json(saldo);
    } catch (err: any) {
      next(new CustomError(err.message, err.statusCode));
    }
  }
}
