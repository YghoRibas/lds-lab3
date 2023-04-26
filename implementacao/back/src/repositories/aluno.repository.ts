import { Aluno, IAluno } from '../models/aluno';

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
}