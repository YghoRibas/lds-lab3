import { IProfessor, Professor } from '../models';

export class ProfessorRepository {
  public async getAllProfessores(): Promise<IProfessor[]> {
    return await Professor.find();
  }

  public async getProfessorById(id: string): Promise<IProfessor | null> {
    return await Professor.findById(id);
  }

  public async createProfessor(data: IProfessor): Promise<IProfessor> {
    const newData = new Professor(data);
    await newData.save();
    return newData;
  }

  public async updateProfessor(id: string, data: IProfessor): Promise<IProfessor | null> {
    const updatedData = await Professor.findByIdAndUpdate(id, data, { new: true });
    return updatedData;
  }

  public async deleteProfessor(id: string): Promise<void> {
    await Professor.findByIdAndDelete(id);
  }
}
