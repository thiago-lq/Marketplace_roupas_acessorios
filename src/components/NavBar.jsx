import logo from "../assets/logo.png";
import carrinho from "../assets/carrinho.png";
import perfil from "../assets/perfil.png";
import { Link } from "react-router-dom";

export default function Navbar({ onCarrinhoClick }) {
  return (
    <nav className="h-10 bg-white shadow-md flex items-center justify-between px-6">
      <Link to="/">
        <img src={logo} alt="Logo" className="max-h-[5rem] w-auto -mt-12" />
      </Link>
      <div className="flex items-center" style={{ gap: "20px" }}>
        <button
          className="p-1 hover:opacity-30 transition-opacity bg-transparent border-none"
          onClick={onCarrinhoClick}
        >
          <img
            src={carrinho}
            alt="Carrinho"
            className="max-h-[3rem] w-auto -mt-7"
          />
        </button>
        <Link to="/perfil">
          <button className="p-1 hover:opacity-30 transition-opacity bg-transparent border-none">
            <img
              src={perfil}
              alt="Perfil"
              className="max-h-[3rem] w-auto -mt-6"
            />
          </button>
        </Link>
      </div>
    </nav>
  );
}
