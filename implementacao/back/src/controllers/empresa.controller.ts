import { Request, Response } from 'express';
import { EmpresaService } from '../services';
import { IEmpresa } from '../models';

export class EmpresaController {
    private empresaService: EmpresaService;

    constructor() {
        this.empresaService = new EmpresaService();
    }

    public async getAllEmpresas(req: Request, res: Response): Promise<void> {
        const empresa: IEmpresa[] = await this.empresaService.getAllEmpresas();
        res.send(empresa);
      }
    
    public async getEmpresaById(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id;
        const data: IEmpresa | null = await this.empresaService.getEmpresaById(id);
        res.send(data);
      }
    
      public async createEmpresa(req: Request, res: Response): Promise<void> {
        const data: IEmpresa = req.body;
        const newData: IEmpresa = await this.empresaService.createEmpresa(data);
        res.send(newData);
      }
    
      public async updateEmpresa(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id;
        const data: IEmpresa = req.body;
        const updatedData: IEmpresa | null = await this.empresaService.updateEmpresa(id, data);
        res.send(updatedData);
      }
    
      public async deleteEmpresa(req: Request, res: Response): Promise<void> {
        const id: string = req.params.id;
        await this.empresaService.deleteEmpresa(id);
        res.send();
      }
}