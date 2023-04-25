const express = require("express");
const alunoModel = require("../models/aluno");
const app = express();

app.get("/alunos", async (req, res) =>{
    const alunos = await alunoModel.find({});

    try {
        res.send(alunos);
      } catch (error) {
        res.status(500).send(error);
      }
});

app.post("/aluno/cadastro", async (req, res) =>{
  // const {nome, senha, email, cpf, rg, endereco, moeda} = req.body
  console.log(req.body);
  const aluno = new alunoModel({
    nome: req.body.nome,
    senha: req.body.senha,
    email: req.body.email,
    cpf: req.body.cpf,
    rg: req.body.rg,
    endereco: req.body.endereco,
    moeda: req.body.moeda,
  });
  // const aluno = new alunoModel({nome, senha, email, cpf, rg, endereco, moeda})

  try {
    await aluno.save();
    res.send(aluno);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;