import { Router } from 'express';
import { ProfessorController } from '../controllers';

const professorRouter = Router();
const professorController = new ProfessorController();

professorRouter.get('/professor', professorController.getAllProfessores.bind(professorController));
professorRouter.get('/professor/:id', professorController.getProfessorById.bind(professorController));
professorRouter.post('/professor', professorController.createProfessor.bind(professorController));
professorRouter.put('/professor/:id', professorController.updateProfessor.bind(professorController));
professorRouter.delete('/professor/:id', professorController.deleteProfessor.bind(professorController));
professorRouter.get('/professor/saldo/:id', professorController.getSaldoProfessor.bind(professorController));
professorRouter.post('/professor/transferirMoedas', professorController.transferirMoedas.bind(professorController));

export default professorRouter;
