export default function ModalEditarProduto({
  aberto,
  aoFechar,
  aoSalvar,
  produtoEditando,
  setProdutoEditando,
  subcategoriasPorGenero,
  exibicaoPorGenero,
  quantidadeCampos,
  maxCampos,
  adicionarCampo,
  removerCampo,
  minCampos
}) {
  if (!aberto || !produtoEditando) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative overflow-y-auto max-h-[90vh]">
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Editar Produto</h3>
        <form onSubmit={aoSalvar} className="space-y-6">
          <input
            type="text"
            placeholder="Nome"
            value={produtoEditando.nome}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                nome: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Preço"
            value={produtoEditando.preco}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                preco: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            min="0"
            step="0.01"
            required
          />
          <select
            value={produtoEditando.categoria}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                categoria: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Selecione...</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>
          <select
            value={produtoEditando.subcategoria || ""}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                subcategoria: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="" disabled>Seleciona a subcategoria...</option>
            {subcategoriasPorGenero[produtoEditando.categoria]?.map((sub) => (
              <option key={sub.value} value={sub.value}>{sub.label}</option>
            ))}
          </select>
          <select
            value={produtoEditando.exibicao || ""}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                exibicao: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="" disabled>Selecione onde exibir...</option>
            {exibicaoPorGenero[produtoEditando.categoria]?.map((sub) => (
              <option key={sub.value} value={sub.value}>{sub.label}</option>
            ))}
          </select>
          <input
            type="url"
            placeholder="URL da imagem principal do produto"
            value={produtoEditando.imagem}
            onChange={(e) =>
              setProdutoEditando({
                ...produtoEditando,
                imagem: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          {Array.from({ length: quantidadeCampos}).map((_, index) => (
            <input
              key={index}
              type="url"
              placeholder={`URL da imagem ${index + 1}`}
              value={produtoEditando.imagensExtras?.[index] || ""}
              onChange={(e) => {
                const novasImagens = [...(produtoEditando.imagensExtras || [])];
                novasImagens[index] = e.target.value;
                setProdutoEditando({
                  ...produtoEditando,
                  imagensExtras: novasImagens
                })
              }}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            />
          ))}
          <div className="flex flex-row gap-3">
            {quantidadeCampos < maxCampos && (
            <button type="button" onClick={adicionarCampo} className="flex justify-center rounded-2xl w-10 h-7 text-black hover:bg-black hover:text-white transition"
            >
              +
            </button>
            )}
            {quantidadeCampos > minCampos && (
              <button type="button" onClick={removerCampo} className="flex justify-center rounded-2xl w-10 h-7 text-black hover:bg-black hover:text-white transition">
                -
              </button>
            )}
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={aoFechar}
              className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
