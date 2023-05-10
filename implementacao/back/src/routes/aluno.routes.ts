import { Router } from 'express';
import { AlunoController } from '../controllers/aluno.controller';

const alunoRouter = Router();
const alunoController = new AlunoController();

alunoRouter.get('/aluno', alunoController.getAllAlunos.bind(alunoController));
alunoRouter.get('/aluno/:id', alunoController.getAlunoById.bind(alunoController));
alunoRouter.post('/aluno', alunoController.createAluno.bind(alunoController));
alunoRouter.put('/aluno/:id', alunoController.updateAluno.bind(alunoController));
alunoRouter.delete('/aluno/:id', alunoController.deleteAluno.bind(alunoController));

export default alunoRouter;
