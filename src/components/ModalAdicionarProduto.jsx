import React from "react";

export default function ModalAdicionarProduto({
  aberto,
  aoFechar,
  aoSalvar,
  categoriaSelecionada,
  setCategoriaSelecionada,
  exibicao,
  setExibicao,
  subcategoriasPorGenero,
  exibicaoPorGenero,
}) {
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Adicionar Produto</h3>
        <form
          id="formularioAdicionar"
          onSubmit={aoSalvar}
          className="space-y-6"
        >
          <input
            type="text"
            name="nome"
            placeholder="Nome do produto"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            name="preco"
            placeholder="Preço do produto"
            className="w-full p-3 border border-gray-300 rounded-lg"
            min="0"
            step="0.01"
            required
          />
          <select
            name="categoria"
            required
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={categoriaSelecionada}
            onChange={(e) => setCategoriaSelecionada(e.target.value)}
          >
            <option value="" disabled>Selecione a categoria...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>

          {categoriaSelecionada && (
            <select
              name="subcategoria"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              defaultValue=""
            >
              <option value="" disabled>Seleciona a subcategoria...</option>
              {subcategoriasPorGenero[categoriaSelecionada]?.map((sub) => (
                <option key={sub.value} value={sub.value}>{sub.label}</option>
              ))}
            </select>
          )}

          {categoriaSelecionada && (
            <select
              name="exibicao"
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={exibicao}
              onChange={(e) => setExibicao(e.target.value)}
            >
              <option value="" disabled>Selecione onde exibir...</option>
              {exibicaoPorGenero[categoriaSelecionada]?.map((sub) => (
                <option key={sub.value} value={sub.value}>{sub.label}</option>
              ))}
            </select>
          )}

          <input
            type="url"
            name="imagem"
            placeholder="URL da imagem do produto"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />

          <div className="flex justify-end mt-6 gap-4">
            <button
              type="button"
              onClick={aoFechar}
              className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
