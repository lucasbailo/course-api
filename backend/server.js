import express from "express";
import cors from "cors";

const app = express();
const PORTA = 3000;

// Permite que o front-end (rodando em outra porta) chame esta API
app.use(cors());

// Permite que o Express entenda corpo de requisição em JSON
// (necessário para ler o que vem em req.body no POST e no PUT)
app.use(express.json());

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

// Busca o próximo id livre (maior id atual + 1)
function gerarProximoId() {
  const maiorId = produtos.reduce((max, produto) => Math.max(max, produto.id), 0);
  return maiorId + 1;
}

// Cria um novo produto
app.post("/produtos", (req, res) => {
  const { nome, preco, quantidade } = req.body;

  const novoProduto = {
    id: gerarProximoId(),
    nome,
    preco: Number(preco),
    quantidade: Number(quantidade),
  };

  produtos.push(novoProduto);

  res.status(201).json(novoProduto);
});

// Atualiza um produto existente
app.put("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const produto = produtos.find((produto) => produto.id === id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  const { nome, preco, quantidade } = req.body;
  produto.nome = nome;
  produto.preco = Number(preco);
  produto.quantidade = Number(quantidade);

  res.json(produto);
});

// Remove um produto
app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  const [produtoRemovido] = produtos.splice(indice, 1);

  res.json(produtoRemovido);
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
