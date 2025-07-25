import { useState } from "react";
import { Feed, Pedidos, Conta } from "../components/usuario";
export default function PerfilUsuario() {
  const [filtroPagina, setFiltroPagina] = useState("inicio");

  function handleFiltroClick(escolha) {
    setFiltroPagina(escolha);
  }

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-4">Olá, </h1>
      <div className="flex gap-6">
        <aside className="w-full max-w-50 md-[100px] mt-10">
          <div className="flex flex-col gap-3">
            <button onClick={() => handleFiltroClick("inicio")}
                    className={`block w-full text-left p-3 shadow-md ${
                      filtroPagina === "inicio"
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}>
              Ínicio
            </button>
            <button onClick={() => handleFiltroClick("pedidos")}
                    className={`block w-full text-left p-3 shadow-md ${
                      filtroPagina === "pedidos"
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}>
              Pedidos
            </button>
            <button onClick={() => handleFiltroClick("conta")}
                    className={`block w-full text-left p-3 shadow-md ${
                      filtroPagina === "conta"
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                    }`}>
              Conta
            </button>
          </div>
        </aside>
        <div className="flex-1 mx-15">
          {filtroPagina === "inicio" &&
            <Feed/>
          }
          {filtroPagina === "pedidos" &&
            <Pedidos/>
          }
          {filtroPagina === "conta" &&
            <Conta/>
          }
        </div>
      </div>
    </div>
  );
}
