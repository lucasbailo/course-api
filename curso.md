# Curso: CRUD Full-Stack Simples (React + Node)

Curso introdutório de desenvolvimento web full-stack para quem nunca
programou pra web. No final, cada aluno terá construído do zero um
sistema simples de cadastro de produtos (adicionar, listar, editar e
remover), com uma tela em **React** conversando com uma API em
**Node.js**.

## Para quem é este curso

Assume conhecimento **zero** de HTML, CSS, JavaScript, front-end,
back-end ou APIs. Cada aula introduz só os conceitos necessários para o
passo daquela aula — nada é usado antes de ser explicado.

## Pré-requisitos técnicos

- **Node.js** instalado (versão 18 ou mais recente — já inclui o `npm`).
  É a única instalação necessária no curso inteiro.
- Um editor de código (ex: VS Code).
- Um navegador (Chrome, Edge, Firefox — qualquer um serve).
- **Não é preciso instalar banco de dados, Postman, nem nada além disso.**
  O "banco de dados" do projeto é só um array na memória do programa —
  suficiente para aprender a lógica de um CRUD sem depender de instalar
  ou configurar nada nas máquinas do laboratório.

## Como o curso funciona (branches)

Cada aula fica em uma **branch do git**, e cada branch já contém o
código acumulado de todas as aulas anteriores. Na raiz do repositório,
o arquivo **`AULA.md`** é o roteiro passo a passo da aula daquela
branch — é ele que os alunos acompanham em sala. Este arquivo
(`curso.md`) é o mapa geral do curso e não muda de conteúdo entre as
aulas.

Para o professor, o fluxo em cada aula é:

```bash
git checkout <branch-da-aula>
```

E então abrir o `AULA.md` daquela branch com a turma.

A branch **`main`** é a última etapa: o projeto completo e funcionando,
já com o front-end e o back-end integrados.

## Roteiro das aulas

| # | Branch | Tema | O que sai funcionando ao final |
|---|--------|------|----------------------------------|
| 1 | `aula-01-fundamentos-web` | HTML, CSS e JavaScript do zero | Página estática com lista de produtos e um formulário que adiciona itens na tela (sem salvar nada) |
| 2 | `aula-02-react-setup` | Introdução ao React, componentes, JSX | Projeto React (Vite) mostrando a lista de produtos com dados fixos, em componentes |
| 3 | `aula-03-estado-e-formulario` | Estado (`useState`) e formulários controlados | Adicionar e remover produtos funcionando de verdade na tela (ainda sem back-end) |
| 4 | `aula-04-backend-node-express` | Servidor, API, REST, Node e Express | Primeira API rodando local, com uma rota `GET /produtos` |
| 5 | `aula-05-crud-api` | CRUD completo na API | Rotas de criar, atualizar e remover produtos na API |
| 6 | `aula-06-integracao-frontend-backend` | Conectando front-end e back-end (`fetch`) | React consumindo a API de verdade — CRUD completo ponta a ponta |
| 7 | `main` | Projeto final | Sistema completo, polido, pronto pra usar/apresentar |

## Stack e decisões técnicas

- **Front-end:** React, criado com [Vite](https://vitejs.dev/), estilizado
  com CSS puro (sem framework de UI) — poucos comandos pra rodar e o
  essencial de React fica bem visível.
- **Back-end:** Node.js + [Express](https://expressjs.com/), o
  framework mais simples e direto para criar uma API em Node.
- **"Banco de dados":** um array em memória dentro do próprio servidor.
  Os dados são perdidos quando o servidor reinicia — troca-se
  durabilidade por **zero configuração**, o que é o objetivo deste
  curso introdutório.
- **Sem instalações globais:** nada de `nodemon` global, banco de dados
  externo ou clientes de API instalados à parte. O recarregamento
  automático do back-end usa `node --watch`, recurso nativo do Node.

## Estrutura de pastas do projeto completo (branch `main`)

```
curso.md              # este arquivo
AULA.md                # roteiro da aula 7 (projeto final)
fundamentos-web/       # aula 1: HTML/CSS/JS puro (referência)
frontend/              # projeto React (Vite)
backend/                # projeto Node/Express (API)
```

## Modelo de dados

O curso inteiro gira em torno de um único recurso: **produto**.

```js
{ id: 1, nome: "Caderno", preco: 12.5, quantidade: 30 }
```

Esse mesmo formato é usado desde a aula 1 (dados fixos no HTML) até a
aula 7 (dados reais indo e voltando da API), pra manter a continuidade
entre as aulas.
