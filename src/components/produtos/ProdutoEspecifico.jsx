import { useState, useMemo } from "react";

export default function ProdutoEspecifico({ produtoID, onAddToCart }) {
  // Verificação segura da imagem principal
  const [imagemPrincipal, setImagemPrincipal] = useState(
    produtoID?.imagem || ""
  );

  // Parse seguro de cores
  const coresArray = useMemo(() => {
    if (!produtoID?.cores) return [];
    
    if (Array.isArray(produtoID.cores)) return produtoID.cores;

    if (typeof produtoID.cores === "string") {
      try {
        // Tenta parsear como JSON, tratando aspas simples e removendo possíveis escapes
        const parsed = JSON.parse(
          produtoID.cores
            .replace(/'/g, '"')
            .replace(/\\"/g, '"')
        );
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, [produtoID?.cores]);

  // Parse seguro de tamanhos
  const tamanhosArray = useMemo(() => {
    if (!produtoID?.tamanhos) return [];
    
    if (Array.isArray(produtoID.tamanhos)) return produtoID.tamanhos;

    if (typeof produtoID.tamanhos === "string") {
      try {
        const parsed = JSON.parse(
          produtoID.tamanhos
            .replace(/'/g, '"')
            .replace(/\\"/g, '"')
        );
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, [produtoID?.tamanhos]);

  // Estados para seleção
  const [corSelecionada, setCorSelecionada] = useState(null);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);

  // Função ao adicionar no carrinho
  const handleAddToCart = () => {
    if (!corSelecionada && coresArray.length > 0) {
      alert("Por favor, selecione uma cor.");
      return;
    }
    if (!tamanhoSelecionado && tamanhosArray.length > 0) {
      alert("Por favor, selecione um tamanho.");
      return;
    }

    // Passa o produto com as seleções
    if (onAddToCart) {
      onAddToCart({
        ...produtoID,
        corSelecionada,
        tamanhoSelecionado,
        imagem: imagemPrincipal, // Garante que a imagem atual seja enviada
      });
    }
  };

  // Verifica se há imagens extras
  const imagensExtras = Array.isArray(produtoID?.imagensExtras) 
    ? produtoID.imagensExtras 
    : [];

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-8">
      {/* Imagem principal e thumbnails */}
      <div className="flex flex-col items-center md:items-start md:w-1/2 gap-4">
        <div className="w-full relative rounded-md overflow-hidden shadow-md aspect-square">
          {imagemPrincipal ? (
            <img
              src={imagemPrincipal}
              alt="Imagem principal"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span>Imagem não disponível</span>
            </div>
          )}
        </div>

        {imagensExtras.length > 0 && (
          <div className="flex overflow-x-auto gap-3 w-full py-2">
            {imagensExtras.map((url, index) => (
              <button
                key={index}
                onClick={() => setImagemPrincipal(url)}
                className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 border-transparent hover:border-black transition"
                type="button"
              >
                <img
                  src={url}
                  alt={`Imagem adicional ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <section className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{produtoID?.nome || "Produto"}</h1>
          <h2 className="text-2xl font-semibold mb-3">Descrição</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {produtoID?.descricao || "Descrição não disponível."}
          </p>
        </section>

        {/* Seleção de cores - só mostra se houver cores */}
        {coresArray.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Cores disponíveis:</h3>
            <div className="flex gap-3 flex-wrap">
              {coresArray.map((cor, i) => {
                const corLower = cor.toLowerCase();
                const selecionada = corSelecionada === cor;
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      title={cor}
                      onClick={() => setCorSelecionada(cor)}
                      className={`w-8 h-8 rounded-full border-2 transition
                        ${selecionada ? "border-black" : "border-gray-400"}
                        hover:border-black
                      `}
                      style={{ backgroundColor: corLower }}
                      aria-label={`Selecionar cor ${cor}`}
                    />
                    <span className="text-xs text-center">{cor}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Seleção de tamanhos - só mostra se houver tamanhos */}
        {tamanhosArray.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Tamanhos disponíveis:</h3>
            <div className="flex gap-3 flex-wrap">
              {tamanhosArray.map((tamanho, i) => {
                const selecionado = tamanhoSelecionado === tamanho;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setTamanhoSelecionado(tamanho)}
                    className={`px-4 py-1 border-2 rounded-md text-sm transition
                      ${selecionado ? "border-black font-semibold" : "border-gray-400"}
                      hover:border-black
                    `}
                  >
                    {tamanho}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Botão adicionar */}
        <div>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-6 py-3 text-lg rounded-md shadow-lg hover:bg-gray-800 transition w-full md:w-auto"
            type="button"
            disabled={!produtoID}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}