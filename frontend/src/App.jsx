import "./App.css";
import Header from "./components/Header";
import ListaProdutos from "./components/ListaProdutos";
import produtosIniciais from "./data/produtos";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="cartao">
          <h2>Produtos cadastrados</h2>
          <ListaProdutos produtos={produtosIniciais} />
        </section>
      </main>
    </>
  );
}

export default App;
