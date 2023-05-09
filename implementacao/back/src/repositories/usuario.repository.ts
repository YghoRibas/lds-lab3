import { ITransacao, Transacao, Usuario } from '../models';
import { Aluno, IAluno } from '../models/aluno';
import { ISaldoAluno } from '../types';

export class UsuarioRepository {
  public async login(email: string, senha: string): Promise<string> {
    const usuario = await Usuario.findOne({ email, senha });

    return usuario?._id || '';
  }
}