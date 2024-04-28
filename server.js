const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const FILE_PATH = "./corridas.json";

// Middleware para analisar solicitações JSON
app.use(bodyParser.json());

// Middleware para habilitar o CORS
app.use(cors());

// Rota GET para servir o arquivo corridas.json
app.get("/corridas.json", (req, res) => {
  const filePath = path.resolve(__dirname, "corridas.json");
  res.sendFile(filePath);
});

// Rota para lidar com solicitações POST para salvar corridas
app.post("/api/corridas", (req, res) => {
  const { corridas } = req.body;

  // Lê os dados atuais do arquivo JSON, se existirem
  let data = [];
  if (fs.existsSync(FILE_PATH)) {
    const jsonData = fs.readFileSync(FILE_PATH, "utf8");
    data = JSON.parse(jsonData);
  }

  // Adiciona novas corridas aos dados existentes
  data.push(...corridas);

  // Salva os dados atualizados no arquivo JSON
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

  res.json({ message: "Corridas salvas com sucesso!" });
});

// Função para imprimir as informações do arquivo corridas.json no terminal
const printCorridasInfo = () => {
  if (fs.existsSync(FILE_PATH)) {
    const jsonData = fs.readFileSync(FILE_PATH, "utf8");
    const corridas = JSON.parse(jsonData);
    console.log("Informações do arquivo corridas.json:");
    console.log(corridas);
  } else {
    console.log("O arquivo corridas.json não existe ou está vazio.");
  }
};

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  // Chama a função para imprimir as informações do arquivo corridas.json ao iniciar o servidor
  printCorridasInfo();
});
