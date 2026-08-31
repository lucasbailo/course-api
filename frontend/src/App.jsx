import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import FormularioProduto from "./components/FormularioProduto";
import ListaProdutos from "./components/ListaProdutos";
import produtosIniciais from "./data/produtos";

function App() {
  const [produtos, setProdutos] = useState(produtosIniciais);

  function handleAdicionar(novoProduto) {
    setProdutos((produtosAtuais) => [
      ...produtosAtuais,
      { id: Date.now(), ...novoProduto },
    ]);
  }

  function handleRemover(id) {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((produto) => produto.id !== id),
    );
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
          <ListaProdutos produtos={produtos} onRemover={handleRemover} />
        </section>
      </main>
    </>
  );
}

export default App;
