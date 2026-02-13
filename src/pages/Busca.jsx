// pages/Busca.jsx
import { useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Busca() {
  const { products = [] } = useProducts(); // 🔥 Desestruturação correta com valor padrão
  const location = useLocation();

  const [filtroGenero, setFiltroGenero] = useState("todos");
  const [subFiltro, setSubFiltro] = useState("");
  const [subFiltroAberto, setSubFiltroAberto] = useState(false);
  const [buscaTermo, setBuscaTermo] = useState("");

  // Função auxiliar para garantir que products é array
  const produtosArray = Array.isArray(products) ? products : [];

  const produtosFiltrados =
    filtroGenero === "todos"
      ? produtosArray
      : produtosArray.filter((p) => p?.categoria === filtroGenero);

  const produtosSubFiltrados = produtosFiltrados.filter((p) => {
    const condSub = subFiltro === "" || p?.subcategoria === subFiltro;
    const condBusca =
      buscaTermo === "" ||
      p?.nome?.toLowerCase().includes(buscaTermo.toLowerCase());
    return condSub && condBusca;
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const genero = query.get("genero") || "todos";
    const sub = query.get("sub") || "";
    const busca = query.get("query") || "";
    setBuscaTermo(busca);
    setFiltroGenero(genero);
    setSubFiltro(sub);
    setSubFiltroAberto(genero !== "todos");
  }, [location.search]);

  function handleFiltroClick(genero) {
    setFiltroGenero(genero);
    setSubFiltroAberto(genero !== "todos");
    setSubFiltro("");
    setBuscaTermo("");
  }

  function handleSubFiltroClick(subcategoria) {
    if (subFiltro === subcategoria) {
      setSubFiltro("");
    } else {
      setSubFiltro(subcategoria);
    }
  }

  // Mensagem quando não há produtos
  if (produtosSubFiltrados.length === 0) {
    return (
      <div className="relative p-3 md:p-6">
        <div className="flex flex-col gap-6">
          {/* Filtros */}
          <div className="sticky top-0 bg-white z-20 py-3">
            <div className="flex flex-row gap-3 mb-5">
              <button
                onClick={() => handleFiltroClick("todos")}
                className={`block w-max text-center font-semibold text-lg px-4 py-2 rounded ${
                  filtroGenero === "todos"
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => handleFiltroClick("feminino")}
                className={`block w-max text-center font-semibold text-lg px-4 py-2 rounded ${
                  filtroGenero === "feminino"
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Feminino
              </button>
              <button
                onClick={() => handleFiltroClick("masculino")}
                className={`block w-max text-center font-semibold text-lg px-4 py-2 rounded ${
                  filtroGenero === "masculino"
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                Masculino
              </button>
            </div>
          </div>

          {/* Mensagem de nenhum produto */}
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {buscaTermo
                ? `Nenhum produto encontrado para "${buscaTermo}"`
                : "Nenhum produto encontrado nesta categoria"}
            </p>
            {(filtroGenero !== "todos" || subFiltro || buscaTermo) && (
              <button
                onClick={() => {
                  setFiltroGenero("todos");
                  setSubFiltro("");
                  setBuscaTermo("");
                  setSubFiltroAberto(false);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-3 md:p-6">
      <div className="flex flex-col gap-6">
        {/* Filtros + Subfiltros (STICKY) */}
        <div className="sticky top-0 bg-white z-20 py-3">
          <div className="flex flex-row gap-3 mb-5">
            <button
              onClick={() => handleFiltroClick("todos")}
              className={`block w-max text-center font-semibold text-lg px-4 py-2 rounded ${
                filtroGenero === "todos"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => handleFiltroClick("feminino")}
              className={`block w-max text-center font-semibold text-lg px-4 py-2 rounded ${
                filtroGenero === "feminino"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Feminino
            </button>
            <button
              onClick={() => handleFiltroClick("masculino")}
              className={`block w-max text-center font-semibold text-lg px-4 py-2 rounded ${
                filtroGenero === "masculino"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Masculino
            </button>
          </div>

          {subFiltroAberto && (
            <div className="grid grid-cols-2 items-center gap-2 mb-2">
              {filtroGenero === "feminino" && (
                <>
                  <button
                    onClick={() => handleSubFiltroClick("blusas_camisetas")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "blusas_camisetas"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Blusas & Camisetas
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("calcas_leggings")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "calcas_leggings"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Calças & Leggings
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("vestidos_saias")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "vestidos_saias"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Vestidos & Saias
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("casacos_jaquetas")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "casacos_jaquetas"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Casacos & Jaquetas
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("acessorios")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "acessorios"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Acessórios
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("calcados")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "calcados"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Calçados
                  </button>
                </>
              )}
              {filtroGenero === "masculino" && (
                <>
                  <button
                    onClick={() => handleSubFiltroClick("camisetas_regatas")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "camisetas_regatas"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Camisetas & Regatas
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("calcas_bermudas")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "calcas_bermudas"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Calças & Bermudas
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("camisas_sociais_polo")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "camisas_sociais_polo"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Camisas Sociais & Polo
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("jaquetas_moletons")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "jaquetas_moletons"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Jaquetas & Moletons
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("acessorios")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "acessorios"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Acessórios
                  </button>
                  <button
                    onClick={() => handleSubFiltroClick("calcados")}
                    className={`px-4 py-1 rounded font-semibold ${
                      subFiltro === "calcados"
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Calçados
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Produtos */}
        <div>
          <div className="max-w-1980 mx-auto grid grid-cols-2 md:grid-cols-5 gap-[7px] md:gap-[30px] transition-all duration-500 h-auto">
            {produtosSubFiltrados.map((product) => (
              <Link to={`produto/${product.id}`} key={product.id}>
                <div
                  className="flex-shrink-0 bg-white rounded-2xl shadow-lg 
                        p-3 flex flex-col border border-transparent hover:border-gray-300 transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/5]">
                    <img
                      src={product.imagem}
                      alt={product.nome}
                      className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
                    />
                  </div>
                  <div className="p-3 flex flex-col h-[80px] sm:h-[90px] md:h-[110px] justify-between items-center text-center">
                    <h2 className="font-semibold text-gray-800 text-sm sm:text-lg md:text-xl leading-tight">
                      {product.nome}
                    </h2>
                    <p className="text-black font-semibold text-base sm:text-lg md:text-xl">
                      R$ {Number(product.preco).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
