import React from "react";

export default function ProdutoTable({ produtos, onEditar, onExcluir }) {
  return (
    <div className="w-full max-w-7xl p-4 bg-white rounded-xl shadow-lg overflow-x-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        Lista de Produtos
      </h2>
      <table className="min-w-full border-collapse table-auto text-left">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm select-none">
          <tr>
            <th className="p-4 border-b border-gray-300">Nome</th>
            <th className="p-4 border-b border-gray-300">Preço</th>
            <th className="p-4 border-b border-gray-300">Categoria</th>
            <th className="p-4 border-b border-gray-300">Imagem</th>
            <th className="p-4 border-b border-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {produtos.map((p) => (
            <tr
              key={p.id}
              className="border-b last:border-b-0 hover:bg-gray-50 transition"
            >
              <td className="p-4 align-middle font-medium">{p.nome}</td>
              <td className="p-4 align-middle font-semibold text-green-600">
                R$ {parseFloat(p.preco).toFixed(2)}
              </td>
              <td className="p-4 align-middle capitalize">{p.categoria}</td>
              <td className="p-4 align-middle">
                <img
                  src={p.imagem}
                  alt={p.nome}
                  className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                />
              </td>
              <td className="p-4 align-middle space-x-2">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                  onClick={() => onEditar(p)}
                >
                  Editar
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
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
