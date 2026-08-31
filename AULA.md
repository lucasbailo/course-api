# Aula 1 — Fundamentos da Web: HTML, CSS e JavaScript

Antes de usar React ou criar uma API, precisamos entender os três
ingredientes de toda página web:

- **HTML** — a estrutura/conteúdo da página (o "esqueleto").
- **CSS** — a aparência da página (cores, espaçamentos, layout).
- **JavaScript** — o comportamento da página (o que reage a cliques,
  o que muda dinamicamente).

Nesta aula vamos montar uma página simples de controle de produtos,
100% sem frameworks, para entender esses três pilares antes de usar
React nas próximas aulas.

Todos os arquivos desta aula estão em `fundamentos-web/`.

## 1. HTML — a estrutura

Abra `fundamentos-web/index.html`. Repare na estrutura:

- `<html>` envolve a página inteira.
- `<head>` guarda informações que não aparecem na tela (título da aba,
  link para o CSS).
- `<body>` é tudo que aparece na tela.
- Tags como `<header>`, `<main>`, `<section>` organizam o conteúdo em
  blocos.
- `<h1>` e `<h2>` são títulos (do maior/mais importante ao menor).
- `<form>` é um formulário — um conjunto de campos (`<input>`) que o
  usuário preenche.
- `<ul>` é uma lista, e cada `<li>` é um item dela.

**Experimente:** abra o arquivo `index.html` duas vezes no navegador
(clique duplo nele) — repare que ele já mostra o título, o formulário e
a lista de produtos, mesmo sem nenhum CSS ou JS ainda ligado ao
comportamento. Isso é o HTML puro.

## 2. CSS — a aparência

Abra `fundamentos-web/style.css`. O CSS funciona assim:

```css
seletor {
  propriedade: valor;
}
```

Exemplos no arquivo:

- `header { background-color: #2f6f4f; }` — seleciona a tag `<header>`
  e pinta o fundo dela de verde.
- `.cartao { ... }` — o ponto (`.`) seleciona todo elemento com
  `class="cartao"` (usado nas duas `<section>` do HTML).
- `#lista-produtos li { ... }` — o `#` seleciona pelo `id`.

**Experimente:** mude a cor do `header` para outra (ex:
`background-color: #1e3a8a;`), salve e recarregue a página no
navegador para ver o efeito.

## 3. JavaScript — o comportamento

Abra `fundamentos-web/script.js`. É aqui que a página ganha vida:

```js
const formProduto = document.querySelector("#form-produto");
```

`document.querySelector` busca um elemento no HTML usando o mesmo tipo
de seletor do CSS. A partir daí, o script:

1. Escuta o evento de **enviar o formulário** (`submit`).
2. Impede o comportamento padrão do navegador (recarregar a página).
3. Lê o que foi digitado em cada campo (`.value`).
4. Cria um novo `<li>` com `document.createElement`.
5. Adiciona esse `<li>` na lista com `.appendChild`.

**Teste na prática:** abra `index.html` no navegador, preencha o
formulário "Novo produto" e clique em "Adicionar produto". Um novo item
aparece na lista de produtos, sem a página recarregar.

**Recarregue a página (F5).** O item que você adicionou some. Isso
acontece porque ele só existia na memória da página — não foi salvo em
nenhum lugar. Esse é exatamente o problema que vamos resolver ao longo
do curso: primeiro guardando os dados de forma mais organizada (React,
aula 2 e 3), depois salvando de verdade num servidor (backend, aula 4
em diante).

## Desafio extra (opcional)

Se sobrar tempo, tente adicionar um botão "Remover" em cada `<li>` da
lista de exemplo, que apague aquele item ao ser clicado. Dicas:

- Você pode adicionar um `<button>Remover</button>` dentro de cada
  `<li>` diretamente no HTML.
- Para reagir ao clique, use `addEventListener("click", ...)` no botão.
- Para remover o elemento da tela, use `item.remove()`.

## O que vem na próxima aula

Manipular o HTML "na mão" (criar elementos, buscar por seletor, etc.)
funciona, mas fica difícil de manter conforme a aplicação cresce. Na
aula 2 vamos conhecer o **React**, uma biblioteca que organiza a
interface em componentes reutilizáveis e cuida de atualizar a tela pra
gente.
