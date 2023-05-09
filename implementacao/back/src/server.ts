import express from "express";
import mongoose from "mongoose";
import alunoRouter from "./routes/aluno.routes";
import empresaRouter from "./routes/empresa.routes";
import cors from "cors";
import usuarioRouter from './routes/usuario.routes';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://auth-lab3:000@lds-lab03-cluster.j4kwnni.mongodb.net/lds-lab3",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

app.use(alunoRouter);
app.use(empresaRouter)
app.use(usuarioRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});