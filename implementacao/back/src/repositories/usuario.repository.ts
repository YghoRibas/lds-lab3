import { IUsuario, Usuario } from '../models';

export class UsuarioRepository {
  public async getUsuarioById(id: string): Promise<IUsuario | null> {
    return await Usuario.findById(id);
  }

  public async login(email: string, senha: string): Promise<string | null> {
    const usuario = await Usuario.findOne({ email, senha });

    return usuario?._id || null;
  }
}
