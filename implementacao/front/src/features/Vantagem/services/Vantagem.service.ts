import { http } from '../../../utils';
import { IVantagem } from './interfaces';

const loggedInUserId = localStorage.getItem('id');

export class VantagemService {
  static async getAllVantagens(): Promise<IVantagem[]> {
    const response = await http.get('/vantagem', {
      params: {
        userId: loggedInUserId,
      },
    });
    return response.data;
  }

  static async getVantagemById(id: string): Promise<IVantagem> {
    const response = await http.get(`/vantagem/${id}`, {
      params: {
        userId: loggedInUserId,
      },
    });
    return response.data;
  }

  static async createVantagem(vantagem: IVantagem): Promise<void> {
    await http.post('/vantagem', vantagem);
  }

  static async updateVantagem(vantagem: IVantagem): Promise<void> {
    await http.put(`/vantagem/${vantagem._id}`, vantagem);
  }

  static async deleteVantagem(id: string): Promise<void> {
    await http.delete(`/vantagem/${id}`);
  }
}
