import { Vantagem, IVantagem } from '../models/vantagem';

export class VantagemRepository {
  public async getAllVanatagens(id: string | null): Promise<IVantagem[]> {
    return id ? await Vantagem.find({ idEmpresa: id }) : await Vantagem.find();
  }

  public async getVanatagemById(id: string): Promise<IVantagem | null> {
    return await Vantagem.findById(id);
  }

  public async createVantagem(data: IVantagem): Promise<IVantagem> {
    const newData = new Vantagem(data);
    await newData.save();
    return newData;
  }

  public async updateVantagem(id: string, data: IVantagem): Promise<IVantagem | null> {
    const updatedData = await Vantagem.findByIdAndUpdate(id, data, { new: true });
    return updatedData;
  }

  public async deleteVantagem(id: string): Promise<void> {
    await Vantagem.findByIdAndDelete(id);
  }
}
