import { useState } from "react";

const valoresIniciais = { nome: "", preco: "", quantidade: "" };

function FormularioProduto({ onAdicionar }) {
  const [valores, setValores] = useState(valoresIniciais);

  function handleChange(evento) {
    const { name, value } = evento.target;
    setValores((valoresAtuais) => ({ ...valoresAtuais, [name]: value }));
  }

  function handleSubmit(evento) {
    evento.preventDefault();

    onAdicionar({
      nome: valores.nome,
      preco: Number(valores.preco),
      quantidade: Number(valores.quantidade),
    });

    setValores(valoresIniciais);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        placeholder="Ex: Caderno"
        value={valores.nome}
        onChange={handleChange}
        required
      />

      <label htmlFor="preco">Preço (R$)</label>
      <input
        type="number"
        id="preco"
        name="preco"
        step="0.01"
        min="0"
        placeholder="Ex: 12.50"
        value={valores.preco}
        onChange={handleChange}
        required
      />

      <label htmlFor="quantidade">Quantidade</label>
      <input
        type="number"
        id="quantidade"
        name="quantidade"
        min="0"
        placeholder="Ex: 10"
        value={valores.quantidade}
        onChange={handleChange}
        required
      />

      <button type="submit">Adicionar produto</button>
    </form>
  );
}

export default FormularioProduto;
