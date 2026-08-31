# Aula 2 — Introdução ao React

Na aula 1 você viu que, para mudar a página com JavaScript puro,
precisamos ficar buscando elementos (`querySelector`) e criando/inserindo
outros na mão (`createElement`, `appendChild`). Isso funciona, mas fica
difícil de manter conforme a aplicação cresce.

O **React** resolve isso de outra forma: em vez de dizer passo a passo
*como* mudar a tela, você descreve *como a tela deveria estar* para um
determinado conjunto de dados, e o React cuida de atualizar o HTML de
verdade.

## Conceitos novos desta aula

- **Componente**: um pedaço reutilizável de interface, escrito como uma
  função JavaScript que retorna HTML "mesclado" com JS (isso se chama
  **JSX**).
- **Props**: como um componente recebe dados de fora, parecido com
  parâmetros de uma função.
- **SPA (Single Page Application)**: uma aplicação que roda inteira em
  uma única página HTML, trocando o conteúdo via JavaScript ao invés de
  recarregar a página.

## 1. Conhecendo o projeto (`frontend/`)

O projeto React já foi criado com uma ferramenta chamada **Vite**, que
prepara toda a estrutura necessária para rodar React no navegador. Para
rodar o projeto:

```bash
cd frontend
npm install
npm run dev
```

O terminal vai mostrar um endereço, algo como
`http://localhost:5173`. Abra esse endereço no navegador.

> `npm install` baixa as dependências do projeto (React, Vite, etc.) e só
> precisa ser rodado quando o projeto é aberto pela primeira vez, ou
> quando as dependências mudam. `npm run dev` inicia o servidor de
> desenvolvimento, que atualiza a página automaticamente a cada
> alteração salva no código.

## 2. Estrutura do projeto

Dentro de `frontend/src/`, os arquivos mais importantes são:

- `main.jsx` — ponto de entrada: pega a `<div id="root">` do
  `index.html` e manda o React renderizar o componente `App` dentro
  dela.
- `App.jsx` — o componente principal da aplicação.
- `components/` — os outros componentes, cada um em seu próprio
  arquivo.
- `data/produtos.js` — uma lista de produtos "fixa" (mock), simulando
  dados que mais pra frente vão vir de um servidor de verdade.

## 3. Componentes e JSX

Abra `src/components/Header.jsx`:

```jsx
function Header() {
  return (
    <header>
      <h1>Loja Simples</h1>
      <p>Controle de produtos</p>
    </header>
  );
}

export default Header;
```

Isso é um componente: uma função que retorna algo parecido com HTML
(isso é JSX — na prática, vira chamadas de JavaScript que o React
entende). Repare que ele é **usado** dentro de `App.jsx` como se fosse
uma tag: `<Header />`.

## 4. Passando dados com props

Abra `src/components/ListaProdutos.jsx` e `src/components/ProdutoItem.jsx`.

`ListaProdutos` recebe uma lista de produtos como **prop** e usa
`.map()` para transformar cada produto do array em um componente
`ProdutoItem`:

```jsx
function ListaProdutos({ produtos }) {
  return (
    <ul className="lista-produtos">
      {produtos.map((produto) => (
        <ProdutoItem key={produto.id} produto={produto} />
      ))}
    </ul>
  );
}
```

- `{ produtos }` é a forma de "pegar" a prop `produtos` que foi passada
  para o componente.
- `key={produto.id}` é obrigatório sempre que criamos uma lista de
  componentes em React — ajuda o React a saber qual item é qual.
- Cada `ProdutoItem` recebe o produto individual como prop e mostra o
  nome, preço e quantidade.

Em `App.jsx`, a lista mockada de `data/produtos.js` é passada para
`ListaProdutos`:

```jsx
<ListaProdutos produtos={produtosIniciais} />
```

## 5. Estilização

O CSS continua sendo CSS normal — nada muda aí. `src/App.css` é
importado dentro de `App.jsx` (`import "./App.css"`) e vale para a
aplicação inteira, exatamente como o `style.css` da aula 1.

## Exercício da aula

1. Rode o projeto (`npm install` + `npm run dev`) e confirme que a lista
   de produtos aparece na tela.
2. Adicione um quinto produto na lista em `src/data/produtos.js` e
   salve — a página deve atualizar sozinha.
3. Crie um novo componente `Rodape.jsx` (em `src/components/`) que
   mostra um texto simples, tipo "Loja Simples - Curso de Full-Stack",
   e use ele dentro de `App.jsx`, depois da `<main>`.

## O que vem na próxima aula

Por enquanto a lista de produtos é fixa (vem de um arquivo). Na aula 3
vamos aprender **`useState`**, o jeito do React de guardar dados que
podem mudar, e vamos criar um formulário de verdade para adicionar e
remover produtos na tela.
