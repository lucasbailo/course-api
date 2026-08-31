// Endereço do back-end (aula 4 e 5). Os dois projetos rodam separados,
// em portas diferentes: o front-end nesta porta do Vite (geralmente
// 5173) e o back-end na porta 3000.
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
