import { Router } from 'express';
import { VantagemController } from '../controllers/vantagem.controller';

const vantagemRouter = Router();
const vantagemController = new VantagemController();

vantagemRouter.post('/vantagem/all', vantagemController.getAllVantagens.bind(vantagemController));
vantagemRouter.get('/vantagem/:id', vantagemController.getVantagemById.bind(vantagemController));
vantagemRouter.post('/vantagem', vantagemController.createVantagem.bind(vantagemController));
vantagemRouter.put('/vantagem/:id', vantagemController.updateVantagem.bind(vantagemController));
vantagemRouter.delete('/vantagem/:id', vantagemController.deleteVantagem.bind(vantagemController));

export default vantagemRouter;
