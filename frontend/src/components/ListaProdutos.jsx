import ProdutoItem from "./ProdutoItem";

function ListaProdutos({ produtos }) {
  return (
    <ul className="lista-produtos">
      {produtos.map((produto) => (
        <ProdutoItem key={produto.id} produto={produto} />
      ))}
    </ul>
  );
}

export default ListaProdutos;
