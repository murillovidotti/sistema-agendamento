// Config inicial
require("dotenv").config();
const express = require("express");
const port = process.env.PORT || 3000;
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");

// Liberar acesso para fazer requisições
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// forma de ler JSON / middleweres
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Liberar acesso para fazer requisições
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

// rotas da API
const agendamentoRoutes = require("./routes/agendamentoRoute");

app.use("/agendamentos", agendamentoRoutes);

// rota inicial / endpoint
app.get("/", (req, res) => {
  // mostrar req

  res.json({
    message: "Bem vindo! API funcionando... ",
    requisicao: "Acesse /agendamentos"
  });
});

// Entregar porta

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);


// Conexão com MongoDB
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@sistemaagendamento.tatztmh.mongodb.net/?retryWrites=true&w=majority`


  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
    app.listen(port);
  })
  .catch((err) => console.log(err));
