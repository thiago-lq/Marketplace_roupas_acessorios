import { useState } from "react";

export default function ProdutoTable({
  produtos,
  onEditar,
  onExcluir,
  subcategoriasPorGenero,
  exibicaoPorGenero,
  setModalAbertoAdicionar,
  resetarFormularioAdicionar,
}) {
  const [tabMenu, setTabMenu] = useState("ListarProdutos");
  const [pesquisa, setPesquisa] = useState("")

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(pesquisa.toLowerCase())
);

  return (
    <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl">
      {/* ==== Tabs ==== */}
      <div className="w-full py-5 bg-gray-300 via-white to-gray-300 shadow-lg rounded-xl space-x-10">
        <button
          className={`text-center text-lg font-semibold mx-5 ${
            tabMenu === "ListarProdutos"
              ? "text-xl font-bold border-b-2 border-black"
              : ""
          }`}
          onClick={() => setTabMenu("ListarProdutos")}
        >
          Listar Produtos
        </button>
        <button
          className={`text-center text-lg font-semibold ${
            tabMenu === "CriarCupons"
              ? "text-xl font-bold border-b-2 border-black"
              : ""
          }`}
          onClick={() => setTabMenu("CriarCupons")}
        >
          Criar Cupons
        </button>
      </div>

      {tabMenu === "ListarProdutos" && (
        <>
          <div className="justify-between items-center m-5 flex">
            <h2 className="text-3xl font-bold text-gray-800">
              Lista de Produtos
            </h2>

            {/* Botão para abrir modal de adicionar */}
            <button
              onClick={() => {
                setModalAbertoAdicionar(true);
                resetarFormularioAdicionar();
              }}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
            >
              Adicionar Produto
            </button>
          </div>

          <div className="flex items-center mx-5 mb-10 w-max ">
              <input type="text" placeholder="Pesquisar por nome..." value={pesquisa} onChange={(e) => setPesquisa(e.target.value)}
              className="p-2 border rounded-lg flex-1" 
              />
          </div>

          {/* ==== Desktop ==== */}
          <div className="hidden md:block max-w-7xl max-h-[65vh] overflow-y-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-center">
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
                {produtosFiltrados.map((p) => (
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
                    <td className="p-3 flex justify-center items-center">
                      <img
                        src={p.imagem}
                        alt={p.nome}
                        className="h-20 w-20 object-cover rounded-lg border border-gray-200"
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

          {/* ==== Mobile ==== */}
          <div className="block md:hidden space-y-4 p-4">
            {produtosFiltrados.map((p) => (
              <div key={p.id}
                   className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4"
              >
                <img src={p.imagem} alt={p.nome} className="h-20 w-20 object-cover rounded-lg border border-gray-200"/>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{p.nome}</h3>
                  <p className="text-black font-bold">
                    R$ {parseFloat(p.preco).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {p.categoria} -{" "}
                    {subcategoriasPorGenero[p.categoria]?.find((sub) => sub.value === p.subcategoria)?.label || "-"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {exibicaoPorGenero[p.categoria]?.find((ex) => ex.value === p.exibicao)?.label || "-"}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                          onClick={() => onEditar(p)}>
                    Editar
                  </button>
                  <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium"
                          onClick={() => onExcluir(p.id)}>
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
