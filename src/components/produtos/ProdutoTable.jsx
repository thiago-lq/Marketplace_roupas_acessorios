export default function ProdutoTable({ produtos, onEditar, onExcluir, subcategoriasPorGenero, exibicaoPorGenero, setModalAbertoAdicionar, resetarFormularioAdicionar }) {
  
  return (
  <div className="w-full max-w-7xl p-6 bg-white rounded-2xl shadow-xl overflow-x-auto">
    <div className="justify-between items-center mb-6 flex">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Lista de Produtos</h2>
      {/* Botão para abrir modal de adicionar */}
      <button
        onClick={() => {
          setModalAbertoAdicionar(true);
          resetarFormularioAdicionar();
        }}
        className="mb-8 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
      >
        Adicionar Produto
      </button>
    </div>
    <table className="min-w-full border-separate border-spacing-y-2 text-left">
      <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
        <tr>
          <th className="p-3">Nome</th>
          <th className="p-3">Preço</th>
          <th className="p-3">Categoria</th>
          <th className="p-3">Subcategoria</th>
          <th className="p-3">Exibição</th>
          <th className="p-3">Imagem</th>
          <th className="p-3">Ações</th>
        </tr>
      </thead>
      <tbody className="text-gray-700 text-sm">
        {produtos.map((p) => (
          <tr
            key={p.id}
            className="bg-white hover:bg-gray-50 rounded-lg shadow-sm transition"
          >
            <td className="p-3 font-medium capitalize">{p.nome}</td>
            <td className="p-3 font-semibold text-green-600">
              R$ {parseFloat(p.preco).toFixed(2)}
            </td>
            <td className="p-3 capitalize">{p.categoria}</td>
            <td className="p-3 capitalize">
              {subcategoriasPorGenero[p.categoria]?.find(
                (sub) => sub.value === p.subcategoria
              )?.label || "-"}
            </td>
            <td className="p-3 capitalize">
              {exibicaoPorGenero[p.categoria]?.find(
                (ex) => ex.value === p.exibicao
              )?.label || "-"}
            </td>
            <td className="p-3">
              <img
                src={p.imagem}
                alt={p.nome}
                className="h-12 w-12 object-cover rounded-lg border border-gray-200"
              />
            </td>
            <td className="p-3 space-x-2">
              <button
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                onClick={() => onEditar(p)}
              >
                Editar
              </button>
              <button
                className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                onClick={() => onExcluir(p.id)}
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}