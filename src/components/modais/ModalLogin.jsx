import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function ModalLogin({ onClose, deslogar }) {
  const { cargo, loading } = useAuth();

  return (
    <div>
      <div className="fixed top-[4.5rem] right-2 w-80 max-h-[210vh] bg-white border border-gray-300 shadow-2xl rounded-xl z-50 p-3">
        <div className="flex justify-between">
          <p className="text-xl font-semibold bg-gradient-to-r from-black via-gray-700 to-gray-800
            bg-clip-text text-transparent mx-auto">
            Bem vindo
          </p>
          <button
            onClick={onClose}
            className="text-black text-sm hover:text-white font-semibold hover:bg-black rounded-3xl w-4 h-max"
          >
            X
          </button>
        </div>
        <div className="flex flex-col px-2 pt-6 gap-4">
          {loading ? (
            <p className="text-gray-500">Carregando perfil...</p>
          ) : (
            <Link to={cargo === "admin" ? "/PerfilAdm" : "/PerfilUsuario"}>
              {cargo === "admin" ?
              <button
                onClick={onClose}
                className="text-black text-start font-semibold hover:text-white hover:bg-black w-max rounded-md px-2 py-0.5"
              >
                Ir para o gerenciador do site
              </button>
              :
                <button
                onClick={onClose}
                className="text-black text-start font-semibold hover:text-white hover:bg-black w-max rounded-md px-2 py-0.5"
              >
                Ir para o seu perfil
              </button>
              }
            </Link>
          )}

          <button className="text-black text-start font-semibold hover:text-white hover:bg-black w-max rounded-md px-2 py-0.5">
            Ir para os seus pedidos
          </button>

          <button
            className="text-black text-start font-semibold hover:text-white hover:bg-black w-max rounded-md px-2 py-0.5"
            onClick={deslogar}
          >
            Desconectar
          </button>
        </div>
      </div>
    </div>
  );
}
