# Aula 4 — Back-end com Node.js e Express

Até aqui, tudo o que fizemos rodava **só no navegador**. Nesta aula
vamos criar, pela primeira vez, um **servidor**: um programa que fica
rodando esperando pedidos e respondendo com dados. É o começo do
**back-end** do projeto.

O front-end (React) e o back-end (Node/Express) são dois projetos
**separados**, cada um rodando com seu próprio comando, em portas
diferentes. Nesta aula vamos focar só no back-end — o front-end da
aula 3 continua existindo em `frontend/`, mas ainda não conversa com o
servidor novo.

## Conceitos novos desta aula

- **Cliente x Servidor**: o navegador (cliente) pede dados, o servidor
  responde. É o mesmo modelo usado por qualquer site da internet.
- **API**: um conjunto de endereços (rotas) que um servidor
  disponibiliza para outros programas conversarem com ele.
- **REST**: um jeito comum de organizar essas rotas usando o método
  HTTP (GET, POST, PUT, DELETE) + um caminho (ex: `/produtos`).
- **JSON**: o formato de texto usado para trocar dados entre cliente e
  servidor — muito parecido com um objeto JavaScript.
- **Porta**: um número que identifica "qual programa" deve receber a
  conexão numa mesma máquina (o navegador roda em uma porta, a API em
  outra).

## 1. Criando o projeto do back-end

O projeto já foi criado em `backend/`, do mesmo jeito que você faria do
zero:

```bash
mkdir backend
cd backend
npm init -y          # cria o package.json
npm install express cors
```

- **Express** é a biblioteca que facilita criar rotas HTTP em Node.js.
- **cors** é necessária porque o front-end (numa porta) e o back-end
  (em outra porta) são considerados "origens diferentes" pelo
  navegador — sem o `cors`, o navegador bloquearia as respostas por
  segurança. Vamos usar isso de verdade na aula 6.

## 2. Lendo o `server.js`

Abra `backend/server.js`:

```js
import express from "express";
import cors from "cors";

const app = express();
const PORTA = 3000;

app.use(cors());
```

- `express()` cria a aplicação do servidor.
- `app.use(cors())` liga o middleware de CORS pra toda a aplicação.

Logo abaixo, temos o "banco de dados" deste curso:

```js
let produtos = [
  { id: 1, nome: "Caderno", preco: 12.5, quantidade: 30 },
  // ...
];
```

É só um **array guardado na memória do processo Node**. Enquanto o
servidor está rodando, dá pra ler e (nas próximas aulas) alterar esse
array. Quando o servidor para, ele volta ao estado inicial — não existe
nenhum arquivo ou banco salvando isso no disco. É a forma mais simples
possível de simular um banco de dados.

Depois vem a primeira rota de verdade:

```js
app.get("/produtos", (req, res) => {
  res.json(produtos);
});
```

- `app.get(caminho, handler)` registra o que o servidor deve fazer
  quando alguém faz um pedido `GET` para aquele caminho.
- `res.json(produtos)` responde convertendo o array para JSON.

E por fim:

```js
app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
```

Isso deixa o servidor esperando pedidos na porta `3000`.

## 3. Rodando o servidor

```bash
cd backend
npm install     # só na primeira vez
npm run dev
```

O script `dev` roda `node --watch server.js`: o `--watch` faz o Node
reiniciar sozinho o servidor sempre que você salvar uma alteração no
código (parecido com o que o Vite faz no front-end).

## 4. Testando a API no navegador

Com o servidor rodando, abra no navegador:

- `http://localhost:3000/` → deve mostrar a mensagem de teste.
- `http://localhost:3000/produtos` → deve mostrar a lista de produtos
  em JSON.

Repare que é exatamente esse tipo de resposta que o React vai passar a
consumir a partir da aula 6, no lugar da lista fixa em
`data/produtos.js`.

## Exercício da aula

1. Suba o servidor e confirme as duas rotas no navegador.
2. Adicione um quinto produto direto no array `produtos` do
   `server.js`, salve e recarregue `http://localhost:3000/produtos` —
   repare que não precisou reiniciar o servidor manualmente (o
   `--watch` faz isso).
3. Crie uma nova rota `GET /produtos/:id` que retorna **um único**
   produto, buscando pelo `id` recebido em `req.params.id`. Dica: use
   `produtos.find(...)`.

## O que vem na próxima aula

Por enquanto nossa API só **lê** dados (`GET`). Na aula 5 vamos
completar o CRUD no back-end, adicionando rotas para **criar**,
**atualizar** e **remover** produtos.
