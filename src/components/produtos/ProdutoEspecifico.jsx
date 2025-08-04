import { useState, useMemo } from "react";
import Swal from "sweetalert2";

export default function ProdutoEspecifico({ produtoID, onAddToCart }) {
  const [imagemPrincipal, setImagemPrincipal] = useState(produtoID?.imagem || "");

  const coresArray = useMemo(() => {
    if (!produtoID?.cores) return [];
    if (Array.isArray(produtoID.cores)) return produtoID.cores;
    try {
      return JSON.parse(produtoID.cores.replace(/'/g, '"').replace(/\\"/g, '"')) || [];
    } catch {
      return [];
    }
  }, [produtoID?.cores]);

  const tamanhosArray = useMemo(() => {
    if (!produtoID?.tamanhos) return [];
    if (Array.isArray(produtoID.tamanhos)) return produtoID.tamanhos;
    try {
      return JSON.parse(produtoID.tamanhos.replace(/'/g, '"').replace(/\\"/g, '"')) || [];
    } catch {
      return [];
    }
  }, [produtoID?.tamanhos]);

  const [corSelecionada, setCorSelecionada] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);

  const handleAddToCart = () => {
    if (!corSelecionada && coresArray.length > 0) {
      Swal.fire("Selecione uma cor", "Você precisa escolher uma cor antes de continuar.", "warning");
      return;
    }
    if (!tamanhoSelecionado && tamanhosArray.length > 0) {
      Swal.fire("Selecione um tamanho", "Você precisa escolher um tamanho antes de continuar.", "warning");
      return;
    }

    onAddToCart?.({
      ...produtoID,
      corSelecionada,
      tamanhoSelecionado,
      imagem: imagemPrincipal,
    });

    Swal.fire("Adicionado!", "Produto adicionado ao carrinho com sucesso.", "success");
  };

  const imagensExtras = Array.isArray(produtoID?.imagensExtras) ? produtoID.imagensExtras : [];

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Coluna Esquerda (imagem e opções) */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <div className="w-full rounded-lg overflow-hidden shadow-md aspect-square bg-gray-100">
          {imagemPrincipal ? (
            <img src={imagemPrincipal} alt="Imagem principal" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Imagem não disponível
            </div>
          )}
        </div>

        {imagensExtras.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {imagensExtras.map((url, index) => (
              <button
                key={index}
                onClick={() => setImagemPrincipal(url)}
                className="w-20 h-20 rounded-md overflow-hidden border-2 border-transparent hover:border-black transition"
                type="button"
              >
                <img src={url} alt={`Imagem ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {coresArray.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Cores disponíveis:</h3>
            <div className="flex flex-wrap gap-3">
              {coresArray.map((cor, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCorSelecionada(cor)}
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      corSelecionada === cor ? "border-black" : "border-gray-300"
                    }`}
                    style={{ backgroundColor: cor.toLowerCase() }}
                  />
                  <span className="text-xs text-gray-600">{cor}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tamanhosArray.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-3">Tamanhos disponíveis:</h3>
            <div className="flex flex-wrap gap-2">
              {tamanhosArray.map((tamanho, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTamanhoSelecionado(tamanho)}
                  className={`px-4 py-2 border-2 rounded-md transition ${
                    tamanhoSelecionado === tamanho ? "border-black bg-black text-white" : "border-gray-300"
                  }`}
                >
                  {tamanho}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">{produtoID?.nome || "Produto"}</h1>
          <h2 className="text-xl lg:text-2xl font-semibold mb-2">Descrição</h2>
          <p className="text-gray-700 whitespace-pre-line">{produtoID?.descricao || "Descrição não disponível."}</p>
        </div>

        <div className="mt-8">
          <button
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 px-6 text-lg rounded-lg shadow hover:bg-gray-900 transition active:scale-95"
            type="button"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
