import { ITransacao, Transacao, Usuario } from '../models';
import { Aluno, IAluno } from '../models/aluno';
import { ISaldoAluno } from '../types';

export class AlunoRepository {
  public async getAllAlunos(): Promise<IAluno[]> {
    return await Aluno.find();
  }

  public async getAlunoById(id: string): Promise<IAluno | null> {
    return await Aluno.findById(id);
  }

  public async createAluno(data: IAluno): Promise<IAluno> {
    const newData = new Aluno(data);
    await newData.save();
    return newData;
  }

  public async updateAluno(id: string, data: IAluno): Promise<IAluno | null> {
    const updatedData = await Aluno.findByIdAndUpdate(id, data, { new: true });
    return updatedData;
  }

  public async deleteAluno(id: string): Promise<void> {
    await Aluno.findByIdAndDelete(id);
  }

  public async getSaldoAluno(id: string): Promise<ISaldoAluno> {
    const aluno = await Aluno.findById(id);
    
    if (aluno) {
      const transacoes = await Transacao.find({ $or: [{ remetenteId: id }, { destinatarioId: id }] })

      transacoes.forEach(async transacao => {
        if(transacao.remetenteId !== id) {
          const usuario = await Usuario.findById(transacao.remetenteId);
          transacao.remetenteId = usuario?.nome || '';
        } else {
          const usuario = await Usuario.findById(transacao.destinatarioId);
          transacao.destinatarioId = usuario?.nome || '';
        }
      });


      return { moedas: aluno.moedas, transacoes };
    }

    return { moedas: 0, transacoes: [] };
  }
}