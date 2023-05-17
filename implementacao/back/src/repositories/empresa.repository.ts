import { Empresa, IEmpresa } from '../models/empresa';

export class EmpresaRepository {
  public async getAllEmpresas(): Promise<IEmpresa[]> {
    return await Empresa.find();
  }

  public async getEmpresaById(id: string): Promise<IEmpresa | null> {
    return await Empresa.findById(id);
  }

  public async createEmpresa(data: IEmpresa): Promise<IEmpresa> {
    const newData = new Empresa(data);
    await newData.save();
    return newData;
  }

  public async updateEmpresa(id: string, data: IEmpresa): Promise<IEmpresa | null> {
    const updatedData = await Empresa.findByIdAndUpdate(id, data, { new: true });
    return updatedData;
  }

  public async deleteEmpresa(id: string): Promise<void> {
    await Empresa.findByIdAndDelete(id);
  }
}
