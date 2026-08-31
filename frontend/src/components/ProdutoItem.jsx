function ProdutoItem({ produto }) {
  return (
    <li className="produto-item">
      <span className="produto-nome">{produto.nome}</span>
      <span>R$ {produto.preco.toFixed(2)}</span>
      <span>{produto.quantidade} un.</span>
    </li>
  );
}

export default ProdutoItem;
