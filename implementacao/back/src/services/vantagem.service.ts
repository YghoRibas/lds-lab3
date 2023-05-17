import { IVantagem } from '../models/vantagem';
import { VantagemRepository } from '../repositories/vantagem.repository';
import { CustomError } from '../utils/errorHandler';

export class VantagemService {
  private vantagemRepository: VantagemRepository;

  constructor() {
    this.vantagemRepository = new VantagemRepository();
  }

  public async getAllVantagens(id: string | null): Promise<IVantagem[]> {
    return await this.vantagemRepository.getAllVanatagens(id);
  }

  public async getVantagemById(id: string): Promise<IVantagem | null> {
    const empresa = await this.vantagemRepository.getVanatagemById(id);

    if (empresa) {
      return empresa;
    } else {
      throw new CustomError('Empresa não encontrada', 404);
    }
  }

  public async createVantagem(data: IVantagem): Promise<IVantagem> {
    return await this.vantagemRepository.createVantagem(data);
  }

  public async updateVantagem(id: string, data: IVantagem): Promise<IVantagem | null> {
    return await this.vantagemRepository.updateVantagem(id, data);
  }

  public async deleteVantagem(id: string): Promise<void> {
    return await this.vantagemRepository.deleteVantagem(id);
  }
}
