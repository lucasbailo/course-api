import express from "express";
import cors from "cors";

const app = express();
const PORTA = 3000;

// Permite que o front-end (rodando em outra porta) chame esta API
app.use(cors());

// "Banco de dados": um array na memória do servidor.
// Os dados somem quando o servidor é reiniciado - é uma troca proposital
// para manter o curso simples, sem precisar instalar nenhum banco de verdade.
let produtos = [
  { id: 1, nome: "Caderno", preco: 12.5, quantidade: 30 },
  { id: 2, nome: "Caneta", preco: 2.0, quantidade: 100 },
  { id: 3, nome: "Mochila", preco: 89.9, quantidade: 8 },
  { id: 4, nome: "Estojo", preco: 15.0, quantidade: 20 },
];

// Rota de teste, só para confirmar que o servidor está de pé
app.get("/", (req, res) => {
  res.send("API da Loja Simples está no ar!");
});

// Lista todos os produtos
app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
