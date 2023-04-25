const express = require("express");
const mongoose = require("mongoose");
const alunoRouter = require("./routes/alunoRoutes.js");

const app = express();

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

app.listen(3000, () => {
  console.log("Server is running...");
});