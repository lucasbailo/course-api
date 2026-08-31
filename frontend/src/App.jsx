import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import FormularioProduto from "./components/FormularioProduto";
import ListaProdutos from "./components/ListaProdutos";
import { listarProdutos, criarProduto, removerProduto } from "./api/produtos";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    listarProdutos()
      .then(setProdutos)
      .catch(() => setErro("Não foi possível carregar os produtos. O back-end está rodando?"))
      .finally(() => setCarregando(false));
  }, []);

  async function handleAdicionar(novoProduto) {
    const produtoCriado = await criarProduto(novoProduto);
    setProdutos((produtosAtuais) => [...produtosAtuais, produtoCriado]);
  }

  async function handleRemover(id) {
    await removerProduto(id);
    setProdutos((produtosAtuais) => produtosAtuais.filter((produto) => produto.id !== id));
  }

  return (
    <>
      <Header />
      <main>
        <section className="cartao">
          <h2>Novo produto</h2>
          <FormularioProduto onAdicionar={handleAdicionar} />
        </section>

        <section className="cartao">
          <h2>Produtos cadastrados</h2>
          {carregando && <p>Carregando produtos...</p>}
          {erro && <p className="mensagem-erro">{erro}</p>}
          {!carregando && !erro && (
            <ListaProdutos produtos={produtos} onRemover={handleRemover} />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
