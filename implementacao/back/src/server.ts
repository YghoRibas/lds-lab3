import express from 'express';
import mongoose from 'mongoose';
import alunoRouter from './routes/aluno.routes';
import empresaRouter from './routes/empresa.routes';
import cors from 'cors';
import usuarioRouter from './routes/usuario.routes';
import { errorHandler } from './utils';
import professorRouter from './routes/professor.routes';
import vantagemController from './routes/vanatagem.routes';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://auth-lab3:000@lds-lab03-cluster.j4kwnni.mongodb.net/lds-lab3', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(alunoRouter);
app.use(empresaRouter);
app.use(usuarioRouter);
app.use(professorRouter);
app.use(vantagemController);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
