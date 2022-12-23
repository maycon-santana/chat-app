const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./src/routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`Conexão com Banco MongoDB realizado com sucesso!`);
}).catch((err) => {
    console.log(err.message + `Erro ao criar conexão com Banco MongoDB.`);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});