import { Router } from 'express';
import { UsuarioController } from '../controllers';

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post('/login', usuarioController.login.bind(usuarioController));

export default usuarioRouter;
