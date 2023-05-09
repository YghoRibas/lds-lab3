import { IAluno } from '../models/aluno';
import { UsuarioRepository } from '../repositories';
import { ISaldoAluno } from '../types';

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  public async login(email: string, senha: string): Promise<string> {
    return await this.usuarioRepository.login(email, senha);
  }
}