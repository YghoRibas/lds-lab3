import { IUsuario, Usuario } from '../models';
import { CustomError } from '../utils/errorHandler';

export class UsuarioRepository {
  public async getUsuarioById(id: string): Promise<IUsuario | null> {
    return await Usuario.findById(id);
  }

  public async login(email: string, senha: string): Promise<any | null> {
    const usuario = await Usuario.findOne({ email, senha });

    if (usuario) {
      return {
        id: usuario._id,
        tipo: usuario.__t,
      };
    } else {
      throw new CustomError('Erro ao fazer login', 400);
    }
  }
}
