# Aula 3 — Estado e Formulários no React

Até agora a lista de produtos era **fixa**: vinha sempre do mesmo
arquivo (`data/produtos.js`) e nunca mudava enquanto a página estava
aberta. Hoje vamos fazer o React guardar essa lista de um jeito que
**pode mudar** — e criar um formulário de verdade para adicionar e
remover produtos.

## Conceitos novos desta aula

- **`useState`**: a forma do React de guardar um valor que muda ao
  longo do tempo e fazer a tela se atualizar sozinha quando ele muda.
- **Componente controlado**: um `<input>` cujo valor é controlado pelo
  React (via estado), em vez de deixado por conta do navegador.
- **Levantar estado (lifting state up)**: guardar o estado no
  componente pai (`App`) e passar funções para os filhos alterarem
  esse estado.

## 1. `useState`: guardando a lista de produtos

Abra `src/App.jsx`:

```jsx
import { useState } from "react";

const [produtos, setProdutos] = useState(produtosIniciais);
```

- `produtos` é o valor atual da lista.
- `setProdutos` é a **função que usamos para mudar esse valor**. Nunca
  alteramos `produtos` diretamente — sempre passamos por `setProdutos`.
- `produtosIniciais` (importado de `data/produtos.js`) é usado só para
  preencher a lista na primeira vez que a página carrega.

Toda vez que `setProdutos` é chamado, o React re-renderiza a tela
automaticamente com o novo valor. Isso substitui o trabalho manual que
fazíamos com `appendChild` na aula 1.

## 2. Adicionando um produto

Ainda em `App.jsx`:

```jsx
function handleAdicionar(novoProduto) {
  setProdutos((produtosAtuais) => [
    ...produtosAtuais,
    { id: Date.now(), ...novoProduto },
  ]);
}
```

- `...produtosAtuais` copia todos os produtos que já existiam (o
  "espalha" ou *spread*) — em React **nunca modificamos o array
  diretamente**, sempre criamos um novo.
- `Date.now()` gera um número diferente a cada chamada, usado aqui
  como id "provisório" (na aula 5, quando tivermos um back-end de
  verdade, o id passa a ser gerado pelo servidor).

Essa função é passada como prop para o formulário:

```jsx
<FormularioProduto onAdicionar={handleAdicionar} />
```

## 3. Formulário controlado

Abra `src/components/FormularioProduto.jsx`. Cada `<input>` tem:

```jsx
value={valores.nome}
onChange={handleChange}
```

Isso é um **input controlado**: o valor mostrado no campo vem sempre
do estado (`valores.nome`), e qualquer letra digitada dispara
`handleChange`, que atualiza o estado — que por sua vez atualiza o
valor mostrado. O campo "obedece" ao React, em vez de guardar seu
próprio valor internamente.

Ao enviar o formulário, `handleSubmit` chama a prop `onAdicionar` (que
veio do `App`) com os dados digitados, e depois limpa o formulário
voltando `valores` para o estado inicial.

## 4. Removendo um produto

Em `src/components/ProdutoItem.jsx`, cada item agora tem um botão
"Remover" que chama `onRemover(produto.id)`. Essa função foi passada
por `ListaProdutos` e definida no `App.jsx`:

```jsx
function handleRemover(id) {
  setProdutos((produtosAtuais) =>
    produtosAtuais.filter((produto) => produto.id !== id),
  );
}
```

`.filter()` cria um novo array **sem** o produto cujo `id` bate com o
recebido — de novo, sem modificar o array original diretamente.

## 5. Lista vazia

Em `src/components/ListaProdutos.jsx`, se `produtos.length === 0`, é
mostrada a mensagem "Nenhum produto cadastrado." em vez da lista.
Remova todos os produtos na tela para conferir esse comportamento.

## Exercício da aula

1. Rode o projeto (`cd frontend && npm run dev`) e teste adicionar e
   remover produtos várias vezes.
2. Adicione um campo de confirmação: antes de remover um produto,
   mostre um `window.confirm("Remover este produto?")` dentro de
   `onRemover` — só remove se o usuário confirmar.
3. Recarregue a página (F5) depois de adicionar um produto. Ele some,
   assim como na aula 1 — o estado do React também só existe enquanto
   a página está aberta, na memória.

## O que vem na próxima aula

Nosso app ainda não guarda nada "de verdade": tudo é perdido ao
recarregar a página. Isso porque não existe nenhum servidor guardando
esses dados em algum lugar — só a memória do navegador. Na aula 4
vamos sair do front-end pela primeira vez e criar um **back-end**: um
servidor Node.js com uma API que vai, no futuro, guardar os produtos de
verdade.
