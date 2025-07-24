import { useState } from "react";

export default function LancamentosScroll({ products, onAddToCart }) {
  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [subFiltroAberto, setSubFiltroAberto] = useState(false);
  const [subFiltro, setSubFiltro] = useState("");

  const produtosFiltrados =
    filtroGenero === "todos"
      ? products
      : products.filter((p) => p.categoria === filtroGenero);
  
  const produtosSubFiltrados =
    subFiltro === ""
      ? produtosFiltrados
      : produtosFiltrados.filter((p) => p.subcategoria === subFiltro);
  
  function handleFiltroClick(genero) {
    setFiltroGenero(genero);
    setSubFiltroAberto(genero !== "todos");
    setSubFiltro("");
  }
  function handleSubFiltroClick(subcategoria) {
    if(subFiltro === subcategoria) {
      setSubFiltro("");
    } else {
      setSubFiltro(subcategoria);
    }
    
    // Aqui você pode adicionar lógica para filtrar ainda mais os produtos
  }
  return (
    <div className="relative py-8 px-6">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Sidebar - Filtro */}
        <aside className="w-max md:w-[200px]">
          <div className="flex md:flex-col gap-3">
            <button
              onClick={() => handleFiltroClick("todos")}
              className={`block w-full text-left px-4 py-2 rounded ${
                filtroGenero === "todos"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleFiltroClick("feminino")}
              className={`block w-full text-left px-4 py-2 rounded ${
                filtroGenero === "feminino"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Feminino
            </button>
            <button
              onClick={() => handleFiltroClick("masculino")}
              className={`block w-full text-left px-4 py-2 rounded ${
                filtroGenero === "masculino"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Masculino
            </button>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <div className="flex-1">
          {/* Submenu horizontal que empurra o grid para baixo */}
          {subFiltroAberto && (
            <div className="grid grid-cols-2 items-center gap-2 mb-6 md:justify-between">
              {filtroGenero === "feminino" && (
                <>
                  <button 
                  onClick={() => handleSubFiltroClick("blusas_camisetas")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "blusas_camisetas" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Blusas & Camisetas
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("calcas_leggings")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "calcas_leggings" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Calças & Leggings
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("vestidos_saias")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "vestidos_saias" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Vestidos & Saias
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("casacos_jaquetas")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "casacos_jaquetas" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Casacos & Jaquetas
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("acessorios")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "acessorios" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Acessórios
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("calcados")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "calcados" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Calçados
                  </button>
                </>
              )}
              {filtroGenero === "masculino" && (
                <>
                  <button 
                  onClick={() => handleSubFiltroClick("camisetas_regatas")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "camisetas_regatas" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Camisetas & Regatas
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("calcas_bermudas")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "calcas_bermudas" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Calças & Bermudas
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("camisas_sociais_polo")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "camisas_sociais_polo" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Camisas Sociais & Polo
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("jaquetas_moletons")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "jaquetas_moletons" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Jaquetas & Moletons
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("acessorios")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "acessorios" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Acessórios
                  </button>
                  <button 
                  onClick={() => handleSubFiltroClick("calcados")}
                  className={`px-4 py-1 rounded text-sm} ${
                    subFiltro === "calcados" ? "bg-black text-white" : " bg-gray-100 hover:bg-gray-200"
                  }`}>
                    Calçados
                  </button>
                </>
              )}
            </div>
          )}

          {/* Grid dos produtos */}
          <div className="overflow-y-auto snap-y snap-mandatory max-h-[90vh]">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-[15px] pr-2 transition-all duration-500">
              {produtosSubFiltrados.map((product) => (
                <div
                  key={product.id}
                  className="snap-start w-full sm:w-[220px] md:w-[240px] lg:w-[260px] flex-shrink-0 bg-white rounded-2xl shadow-lg 
                             p-3 flex flex-col border border-transparent hover:border-gray-300 transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/5]">
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
                    />
                  </div>
                  <div className="p-3 flex flex-col h-[140px] sm:h-[150px] md:h-[180px] justify-between items-center text-center">
                    <h2 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg leading-tight">
                      {product.nome}
                    </h2>
                    <p className="text-black font-semibold text-base sm:text-lg md:text-xl">
                      R$ {Number(product.preco).toFixed(2)}
                    </p>
                    <div className="relative inline-block group">
                      <button
                        onClick={() => onAddToCart(product)}
                        className="bg-black text-white px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base md:text-lg relative z-10
                                   transition-transform duration-300 
                                   group-hover:translate-x-[-2px] group-hover:translate-y-[-3px]
                                   group-hover:text-gray-300 leading-tight"
                      >
                        Adicionar ao carrinho
                      </button>
                      <div
                        className="absolute bottom-0 right-0 w-full h-full bg-gray-600 z-0 transition-transform duration-300 
                                   group-hover:translate-x-[-2px] group-hover:translate-y-[-3px]"
                        style={{ transform: "translate(6px, 6px)" }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
