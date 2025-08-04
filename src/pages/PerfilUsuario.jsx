import { useState, useEffect } from "react";
import { Feed, Pedidos, Conta } from "../components/usuario";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/configs";

export default function PerfilUsuario() {
  const [filtroPagina, setFiltroPagina] = useState("inicio");
  const { user } = useAuth();
  const [nome, setNome] = useState("");

  useEffect(() => {
    async function buscarNome() {
      if (!user) return;

      if (user.displayName) {
        setNome(user.displayName);
      } else {
        const ref = doc(db, "Usuarios", user.uid);
        const snap = await getDoc(ref);
        setNome(snap.exists() ? (snap.data().nome || "Usuário") : "Usuário");
      }
    }
    buscarNome();
  }, [user, filtroPagina]);

  function handleFiltroClick(escolha) {
    setFiltroPagina(escolha);
  }

  return (
    <div className="p-6 relative">
      <h1 className="text-2xl font-bold mb-4">{`Olá, ${nome}`} </h1>
      <div className="flex gap-6">
        <aside className="w-full max-w-45 md-[100px] mt-10">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleFiltroClick("inicio")}
              className={`block w-full text-center p-3 shadow-md ${
                filtroPagina === "inicio"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Ínicio
            </button>
            <button
              onClick={() => handleFiltroClick("pedidos")}
              className={`block w-full text-center p-3 shadow-md ${
                filtroPagina === "pedidos"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Pedidos
            </button>
            <button
              onClick={() => handleFiltroClick("conta")}
              className={`block w-full text-center p-3 shadow-md ${
                filtroPagina === "conta"
                  ? "bg-black text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Conta
            </button>
          </div>
        </aside>
        <div className="flex-1">
          {filtroPagina === "inicio" && <Feed />}
          {filtroPagina === "pedidos" && <Pedidos />}
          {filtroPagina === "conta" && <Conta />}
        </div>
      </div>
    </div>
  );
}
