import { Router } from 'express';
import { EmpresaController } from '../controllers/empresa.controller';

const empresaRouter = Router();
const empresaController = new EmpresaController();

empresaRouter.get('/empresa', empresaController.getAllEmpresas.bind(empresaController));
empresaRouter.get('/empresa/:id', empresaController.getEmpresaById.bind(empresaController));
empresaRouter.post('/empresa', empresaController.createEmpresa.bind(empresaController));
empresaRouter.put('/empresa/:id', empresaController.updateEmpresa.bind(empresaController));
empresaRouter.delete('/empresa/:id', empresaController.deleteEmpresa.bind(empresaController));

export default empresaRouter;
