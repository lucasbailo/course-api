# Aula 7 — Projeto Final

Esta é a última aula do curso e a branch `main` é o projeto completo:
o mesmo CRUD de produtos das aulas anteriores, com front-end (React) e
back-end (Node/Express) já integrados, mais alguns retoques finais.

Não há conceito novo hoje — é uma aula de revisão e polimento, boa
para os alunos reverem o caminho percorrido desde a aula 1.

## O que foi adicionado nesta etapa final

Comparando com a aula 6, os retoques feitos foram:

1. **Confirmação antes de excluir** — em `src/App.jsx`, `handleRemover`
   agora chama `window.confirm("Remover este produto?")` antes de
   chamar a API. Se o usuário cancelar, nada acontece.
2. **Contador de produtos** — o título "Produtos cadastrados" agora
   mostra a quantidade entre parênteses, ex: "Produtos cadastrados (4)".
3. **Detalhe visual na lista** — um efeito simples ao passar o mouse
   sobre cada produto (`:hover` no CSS), só para a interface parecer
   um pouco mais viva.
4. **Documentação consolidada** — o `curso.md` na raiz agora tem uma
   seção "Como rodar o projeto completo", explicando como subir os
   dois servidores ao mesmo tempo.

## Revisão do caminho até aqui

| Aula | O que aprendemos |
|------|-------------------|
| 1 | HTML, CSS e JS puro — a base de tudo |
| 2 | React, componentes, JSX e props |
| 3 | Estado (`useState`) e formulários controlados |
| 4 | O que é um servidor, uma API, e a primeira rota Express |
| 5 | CRUD completo na API (`POST`, `PUT`, `DELETE`) |
| 6 | Front-end e back-end conversando de verdade, via `fetch` |
| 7 | Projeto final, revisado e polido |

## Como rodar o projeto completo

```bash
# terminal 1
cd backend
npm install
npm run dev
```

```bash
# terminal 2
cd frontend
npm install
npm run dev
```

Abra o endereço do front-end (geralmente `http://localhost:5173`) no
navegador — a lista de produtos deve carregar vindo da API, e
adicionar/remover produtos deve refletir no back-end de verdade
(recarregue a página para confirmar).

## Para ir além (desafios opcionais)

Se a turma tiver tempo sobrando, alguns caminhos para continuar
evoluindo o projeto, agora sem roteiro guiado:

- **Editar produtos pela tela**: a rota `PUT /produtos/:id` já existe
  na API desde a aula 5 — falta só a interface no React para editar um
  produto existente (reaproveitando `FormularioProduto`).
- **Validações**: impedir preço ou quantidade negativos, tanto no
  formulário quanto na API.
- **Persistência real**: trocar o array em memória do `server.js` por
  um arquivo JSON lido/escrito a cada alteração, para os dados
  sobreviverem a um reinício do servidor.
- **Buscar por nome**: um campo de busca no front-end que filtra a
  lista de produtos.

## Fim do curso

Parabéns! Quem chegou até aqui construiu, do zero, uma aplicação
completa: interface em React, API em Node/Express, e as duas
conversando via HTTP — a mesma arquitetura usada (em versões bem mais
complexas) por sistemas reais.
