function ProdutoItem({ produto, onRemover }) {
  return (
    <li className="produto-item">
      <span className="produto-nome">{produto.nome}</span>
      <span>R$ {produto.preco.toFixed(2)}</span>
      <span>{produto.quantidade} un.</span>
      <button type="button" className="botao-remover" onClick={() => onRemover(produto.id)}>
        Remover
      </button>
    </li>
  );
}

export default ProdutoItem;
