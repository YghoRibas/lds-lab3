import { IUsuario } from '../models';
import { UsuarioRepository } from '../repositories';

export class UsuarioService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  public async getUsuarioById(id: string): Promise<IUsuario | null> {
    return await this.usuarioRepository.getUsuarioById(id);
  }

  public async login(email: string, senha: string): Promise<string | null> {
    return await this.usuarioRepository.login(email, senha);
  }
}
