import ProdutoItem from "./ProdutoItem";

function ListaProdutos({ produtos, onRemover }) {
  if (produtos.length === 0) {
    return <p className="lista-vazia">Nenhum produto cadastrado.</p>;
  }

  return (
    <ul className="lista-produtos">
      {produtos.map((produto) => (
        <ProdutoItem key={produto.id} produto={produto} onRemover={onRemover} />
      ))}
    </ul>
  );
}

export default ListaProdutos;
