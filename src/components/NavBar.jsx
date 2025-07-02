import logo from "../assets/logo.png";
import carrinho from "../assets/carrinho.png"; // Importe sua imagem do carrinho
import perfil from "../assets/perfil.png"; // Importe sua imagem de perfil
import { Link } from "react-router-dom"; // Importando Link do react-router-dom

export default function Navbar() {
  return (
    <nav className="h-10 bg-white shadow-md flex items-center justify-between px-6">
      {/* Logo com altura limitada a 64px */}
      <Link to="/">
        <img src={logo} alt="Logo" className="max-h-[5rem] w-auto -mt-12" />
      </Link>
      {/* Container para os ícones do lado direito */}
      <div className="flex items-center" style={{ gap: "20px"}}>
        {/* Botão do carrinho com imagem */}
        <button className="p-1 hover:opacity-30 transition-opacity bg-transparent border-none">
          <img 
            src={carrinho} 
            alt="Carrinho" 
            className="max-h-[3rem] w-auto -mt-7" // Ajuste a altura conforme necessário
          />
        </button>

        {/* Botão de perfil com imagem */}
        <Link to="/perfil">
          <button className="p-1 hover:opacity-30 transition-opacity bg-transparent border-none">
          <img 
            src={perfil} 
            alt="Perfil" 
            className="max-h-[3rem] w-auto -mt-6" // Ajuste a altura conforme necessário
          />  
          </button>
        </Link>
      </div>
    </nav>
  );
}