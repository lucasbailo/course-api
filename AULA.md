# Aula 6 — Integrando Front-end e Back-end

Chegou a hora de conectar as duas metades do projeto: o React (que
sabia mostrar, adicionar e remover produtos só na memória do
navegador) e a API (que já sabe fazer o CRUD de verdade, mas até agora
só foi testada sozinha). A partir de hoje, os dados realmente vêm e vão
para o servidor.

Nesta aula você precisa de **dois terminais abertos ao mesmo tempo**:

```bash
# terminal 1
cd backend
npm run dev
```

```bash
# terminal 2
cd frontend
npm run dev
```

## Conceitos novos desta aula

- **`fetch`**: função do navegador para fazer pedidos HTTP (já usamos
  na aula 5, direto no console — agora vamos usar dentro do React).
- **`async`/`await`**: forma de escrever código que espera uma
  resposta (como a de um `fetch`) sem travar o restante da página.
- **`useEffect`**: hook do React para rodar código quando o componente
  aparece na tela (ex: buscar dados assim que a página abre).
- **CORS na prática**: por que o `cors()` do back-end (aula 4) é
  necessário para o front-end (numa porta diferente) conseguir receber
  as respostas da API.

## 1. Um módulo só para falar com a API

Criamos `src/api/produtos.js`, reunindo num só lugar todo código que
conversa com o back-end:

```js
const API_URL = "http://localhost:3000/produtos";

export async function listarProdutos() {
  const resposta = await fetch(API_URL);
  return resposta.json();
}

export async function criarProduto(produto) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  return resposta.json();
}

export async function removerProduto(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
```

Repare que é exatamente o mesmo `fetch` usado na aula 5 pelo console do
navegador — só que agora empacotado em funções reutilizáveis.

> Se a porta do back-end no seu computador for diferente de `3000`,
> ajuste o valor de `API_URL`.

## 2. Buscando os produtos ao abrir a página

Em `src/App.jsx`, note os novos estados:

```jsx
const [produtos, setProdutos] = useState([]);
const [carregando, setCarregando] = useState(true);
const [erro, setErro] = useState(null);
```

E o `useEffect`:

```jsx
useEffect(() => {
  listarProdutos()
    .then(setProdutos)
    .catch(() => setErro("Não foi possível carregar os produtos. O back-end está rodando?"))
    .finally(() => setCarregando(false));
}, []);
```

- O array vazio `[]` no final diz ao React: "rode essa função **só
  uma vez**, quando o componente aparecer na tela pela primeira vez".
- Enquanto a resposta não chega, `produtos` continua `[]` e
  `carregando` é `true` — por isso a tela mostra "Carregando
  produtos...".
- Se o `fetch` falhar (ex: back-end desligado), `erro` recebe uma
  mensagem, mostrada no lugar da lista.

Repare que a lista de produtos mockada (`data/produtos.js`) não existe
mais — os dados agora vêm sempre do servidor.

## 3. Adicionar e remover de verdade

```jsx
async function handleAdicionar(novoProduto) {
  const produtoCriado = await criarProduto(novoProduto);
  setProdutos((produtosAtuais) => [...produtosAtuais, produtoCriado]);
}

async function handleRemover(id) {
  await removerProduto(id);
  setProdutos((produtosAtuais) => produtosAtuais.filter((produto) => produto.id !== id));
}
```

O fluxo mudou: antes, `setProdutos` era chamado direto com o dado
digitado. Agora, primeiro esperamos (`await`) a API confirmar que
salvou (ou removeu) o produto, e só then atualizamos a tela — assim a
tela sempre reflete o que está realmente salvo no servidor.

## 4. Por que o CORS importa aqui

Abra o DevTools (F12) e desative por um instante o `app.use(cors())`
no `backend/server.js` (comente a linha), salve, e tente adicionar um
produto pelo formulário. Você verá um erro de CORS no console do
navegador — o back-end até processou o pedido, mas o navegador bloqueou
a resposta por segurança, já que front-end e back-end estão em portas
(origens) diferentes. Reative a linha do `cors()` depois do teste.

## Exercício da aula

1. Suba os dois servidores e teste adicionar e remover produtos pela
   tela — depois recarregue a página (F5) e confirme que os dados
   **continuam lá** (porque agora vêm do back-end, não da memória do
   React).
2. Desligue o back-end (Ctrl+C no terminal 1) e recarregue o
   front-end — confirme que aparece a mensagem de erro.
3. Desafio: adicione um botão "Editar" em cada produto que chama
   `PUT /produtos/:id` (rota já existente na aula 5) para atualizar o
   nome, preço ou quantidade. Você vai precisar de um novo estado para
   guardar "qual produto está sendo editado" e reaproveitar (ou
   adaptar) o `FormularioProduto`.

## O que vem na próxima aula

O CRUD está completo e funcionando ponta a ponta. Na aula 7 (branch
`main`) vamos só dar os retoques finais: mensagens melhores, um pouco
mais de estilo, e consolidar o projeto como a versão completa do curso.
