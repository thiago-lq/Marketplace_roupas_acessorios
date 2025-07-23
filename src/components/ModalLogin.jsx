import { Link } from "react-router-dom";
export default function ModalLogin ({onClose, deslogar}) {
    return (
      <div>
        <div className="fixed top-[4.5rem] right-0 w-80 max-h-[210vh] bg-white border border-gray-300 shadow-2xl rounded-xl z-50 p-2">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-black text-sm hover:text-white font-semibold hover:bg-black rounded-3xl w-4 h-max"
            >
              X
            </button>
          </div>
          <div className="flex justify-between items-center py-3 mr-5">
            <Link to="/PerfilAdm">
              <button
                className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1"
                onClick={onClose}
              >
                Ir para o seu perfil
              </button>
            </Link>
            <button className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1">
              Ver carrinho
            </button>
            <button
              className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1"
              onClick={deslogar}
            >
              Desconectar
            </button>
          </div>
        </div>
      </div>
    );
}