# Aula 5 — Completando o CRUD na API

**CRUD** é uma sigla para as quatro operações básicas de qualquer
sistema que guarda dados: **C**reate (criar), **R**ead (ler),
**U**pdate (atualizar) e **D**elete (remover). Na aula 4 fizemos só o
"R" (`GET /produtos`). Hoje completamos o "C", o "U" e o "D".

## Conceitos novos desta aula

- **`req.body`**: o conteúdo que o cliente envia junto do pedido (usado
  em POST e PUT), depois de convertido de JSON para objeto JavaScript.
- **`req.params`**: os pedaços variáveis de uma rota, como o `:id` em
  `/produtos/:id`.
- **Status codes**: números que a resposta HTTP usa para dizer o que
  aconteceu. Os principais que vamos usar:
  - `200 OK` — deu certo (usado em GET, PUT, DELETE).
  - `201 Created` — um novo recurso foi criado (usado em POST).
  - `404 Not Found` — não existe nada com aquele id.

## 1. Lendo o corpo da requisição

Para o Express conseguir ler o JSON enviado pelo cliente, precisamos
ligar um middleware (já adicionado em `backend/server.js`):

```js
app.use(express.json());
```

Sem essa linha, `req.body` viria `undefined`.

## 2. Criar um produto — `POST /produtos`

```js
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
```

`gerarProximoId()` é uma função auxiliar que pega o maior `id` que já
existe no array e soma 1 — assim nunca repetimos um id, mesmo depois de
remover produtos no meio da lista.

## 3. Atualizar um produto — `PUT /produtos/:id`

```js
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
```

`req.params.id` vem da própria URL (ex: `/produtos/3` → `req.params.id`
é `"3"`, por isso convertemos com `Number(...)`).

## 4. Remover um produto — `DELETE /produtos/:id`

```js
app.delete("/produtos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = produtos.findIndex((produto) => produto.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  const [produtoRemovido] = produtos.splice(indice, 1);

  res.json(produtoRemovido);
});
```

## 5. Testando sem Postman

Pela barra de endereço do navegador só dá pra testar `GET`. Para testar
`POST`, `PUT` e `DELETE` sem instalar nenhum programa extra, vamos usar
o próprio `fetch` do navegador — a mesma função que o React vai usar na
aula 6.

Com o back-end rodando (`cd backend && npm run dev`), abra
`http://localhost:3000` no navegador, abra o **DevTools** (F12), vá na
aba **Console** e cole:

```js
// Criar um produto novo
fetch("http://localhost:3000/produtos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nome: "Borracha", preco: 3.5, quantidade: 50 }),
})
  .then((res) => res.json())
  .then((dados) => console.log(dados));
```

```js
// Atualizar o produto de id 1 (troque o id se precisar)
fetch("http://localhost:3000/produtos/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nome: "Caderno Grande", preco: 18, quantidade: 25 }),
})
  .then((res) => res.json())
  .then((dados) => console.log(dados));
```

```js
// Remover o produto de id 2 (troque o id se precisar)
fetch("http://localhost:3000/produtos/2", { method: "DELETE" })
  .then((res) => res.json())
  .then((dados) => console.log(dados));
```

Depois de cada teste, recarregue `http://localhost:3000/produtos` para
conferir que a lista realmente mudou.

## Exercício da aula

1. Rode o back-end e teste as três rotas novas com os snippets acima.
2. Tente atualizar (`PUT`) ou remover (`DELETE`) um id que não existe
   (ex: `999`) e confirme que a API responde `404` com uma mensagem de
   erro.
3. Adicione uma validação simples no `POST`: se `nome` não for enviado
   (ou vier vazio), responda `400` com `{ erro: "Nome é obrigatório" }`
   em vez de criar o produto.

## O que vem na próxima aula

Nossa API já faz o CRUD inteiro, mas o React (em `frontend/`) ainda usa
dados mockados e um "CRUD fake" só em memória do navegador. Na aula 6
vamos conectar as duas pontas: o React vai passar a buscar, criar,
atualizar e remover produtos **de verdade**, chamando essa API.
