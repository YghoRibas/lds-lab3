import { IEmpresa } from '../models/empresa';
import { EmpresaRepository } from '../repositories';
import { CustomError } from '../utils/errorHandler';

export class EmpresaService {
  private empresaRepository: EmpresaRepository;

  constructor() {
    this.empresaRepository = new EmpresaRepository();
  }

  public async getAllEmpresas(): Promise<IEmpresa[]> {
    return await this.empresaRepository.getAllEmpresas();
  }

  public async getEmpresaById(id: string): Promise<IEmpresa | null> {
    const empresa = await this.empresaRepository.getEmpresaById(id);

    if (empresa) {
      return empresa;
    } else {
      throw new CustomError('Empresa não encontrada', 404);
    }
  }

  public async createEmpresa(data: IEmpresa): Promise<IEmpresa> {
    return await this.empresaRepository.createEmpresa(data);
  }

  public async updateEmpresa(id: string, data: IEmpresa): Promise<IEmpresa | null> {
    return await this.empresaRepository.updateEmpresa(id, data);
  }

  public async deleteEmpresa(id: string): Promise<void> {
    return await this.empresaRepository.deleteEmpresa(id);
  }
}
