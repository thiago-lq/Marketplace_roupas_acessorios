import { useState } from "react";

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
  coresDisponiveis,
  tamanhosDisponiveis,
  quantidadeCampos,
  maxCampos,
  adicionarCampo,
  removerCampo,
  minCampos,
}) {
  const [descricao, setDescricao] = useState("");

  const handleDescricaoChange =(e) => {
    const valor = e.target.value;
    const palavras = valor.trim().split(/\s+/);

    if (palavras.length <= 400) {
      setDescricao(valor);
    }
  };
  
  if (!aberto) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">
          Adicionar Produto
        </h3>
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
            <option value="" disabled>
              Selecione a categoria...
            </option>
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
              <option value="" disabled>
                Seleciona a subcategoria...
              </option>
              {subcategoriasPorGenero[categoriaSelecionada]?.map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
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
              <option value="" disabled>
                Selecione onde exibir...
              </option>
              {exibicaoPorGenero[categoriaSelecionada]?.map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
              ))}
            </select>
          )}

          <input
            type="url"
            name="imagem"
            placeholder="URL da imagem principal do produto"
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          {Array.from({ length: quantidadeCampos }).map((_, index) => (
            <input
              key={index}
              type="url"
              name="imagensExtras"
              placeholder={`URL da imagem ${index + 1}`}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          ))}
          <div className="flex flex-row gap-3">
            {quantidadeCampos < maxCampos && (
              <button
                type="button"
                onClick={adicionarCampo}
                className="flex justify-center rounded-2xl w-10 h-7 text-black hover:bg-black hover:text-white transition"
              >
                +
              </button>
            )}
            {quantidadeCampos > minCampos && (
              <button
                type="button"
                onClick={removerCampo}
                className="flex justify-center rounded-2xl w-10 h-7 text-black hover:bg-black hover:text-white transition"
              >
                -
              </button>
            )}
          </div>

          <textarea
            name="descricao"
            placeholder="Digite a descrição"
            className="w-full h-40 px-3 py-3 border border-gray-300 rounded-lg resize-none"
            value={descricao}
            onChange={handleDescricaoChange}
            required
          />

          <p className="text-sm text-gray-500">
            {descricao.trim().split(/\s+/).length} / 400 palavras
          </p>

          <div>
            <h3 className="font-semibold mb-2">Cores disponíveis</h3>
            <div className="flex flex-wrap gap-3">
              {coresDisponiveis.map((cor) => (
                <label key={cor} className="flex items-center gap-1">
                  <input type="checkbox" name="cores" value={cor} /> {cor}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Tamanhos disponíveis</h3>
            <div className="flex flex-wrap gap-3">
              {tamanhosDisponiveis.map((tamanho) => (
                <label key={tamanho} className="flex items-center gap-1">
                  <input type="checkbox" name="tamanhos" value={tamanho} />{" "}
                  {tamanho}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-6 gap-4">
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
