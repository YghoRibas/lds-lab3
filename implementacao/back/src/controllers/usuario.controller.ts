import { Request, Response } from 'express';
import { UsuarioService } from '../services';

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  public async login(req: Request, res: Response): Promise<void> {
    const data = req.body;
    const id: string = await this.usuarioService.login(data.email, data.senha);
    res.send(id);
  }
}