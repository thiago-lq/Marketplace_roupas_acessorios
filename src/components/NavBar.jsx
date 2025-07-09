import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";
import carrinho from "../assets/carrinho.png";
import perfil from "../assets/perfil.png";
import { Link } from "react-router-dom";

export default function Navbar({ onCarrinhoClick }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;

      // Rolando para baixo
      if (currentScroll > lastScrollY.current && currentScroll > 100) {
        setShowNavbar(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }

      // Rolando para cima
      else if (currentScroll < lastScrollY.current) {
        if (!showNavbar) {
          // Aplica atraso para mostrar
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            setShowNavbar(true);
          }, 300); // Ajuste esse valor como quiser (ms)
        }
      }

      lastScrollY.current = currentScroll;
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showNavbar]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white shadow-lg flex items-center justify-between px-6 py-2 transition-transform duration-300 z-50
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Link to="/">
        <img src={logo} alt="Logo" className="max-h-[5rem] w-auto" />
      </Link>
      <div className="flex items-center" style={{ gap: "20px" }}>
        <button
          className="p-1 hover:opacity-30 transition-opacity bg-transparent border-none"
          onClick={onCarrinhoClick}
        >
          <img src={carrinho} alt="Carrinho" className="max-h-[2.5rem] w-auto" />
        </button>
        <Link to="/perfil">
          <button className="p-1 hover:opacity-30 transition-opacity bg-transparent border-none">
            <img src={perfil} alt="Perfil" className="max-h-[2.5rem] w-auto" />
          </button>
        </Link>
      </div>
    </nav>
  );
}
