import { useState, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import seta from "../../assets/seta-para-baixo.png";
import carrinho from "../../assets/carrinho.png";
import perfil from "../../assets/perfil.png";
import busca from "../../assets/busca.png"
import { Link } from "react-router-dom";
import NavBarExtra from "./NavBarExtra";

export default function Navbar({ onCarrinhoClick, onLoginClick }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [extraAberto, setExtraAberto] = useState(false);
  const lastScrollY = useRef(0);
  const timeoutRef = useRef(null);
  const [termoBusca, setTermoBusca] = useState("");

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

  function handleAbrirExtra() {
    setExtraAberto((prev) => !prev);
  }

  function handleBuscar(e) {
    e.preventDefault();
    if (termoBusca.trim() !== "") {
      window.location.href = `/busca?query=${encodeURIComponent(termoBusca)}`;
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white shadow-lg flex items-center justify-between px-6 py-2 transition-transform duration-300 z-50
       ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <Link to="/">
        <img src={logo} alt="Logo" className="max-h-[3rem] w-auto" />
      </Link>
      <div className="mt-8">
        <button
          onClick={handleAbrirExtra}
          className={`absolute left-1/2 -translate-x-1/2 transition-transform duration-300 ${
            extraAberto ? "rotate-180" : ""
          }`}
        >
          <img src={seta} alt="menu de produtos" />
        </button>
          <NavBarExtra
            extraAberto = {extraAberto}
          />
      </div>
      <div className="flex items-center gap-3">
        <form onSubmit={handleBuscar} className="relative w-full mas-w-xs">
          <input type="text" value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)}
                placeholder="Buscar..."
                className="-full border rounded px-2 py-1 focus:outline-none">
          </input>
          <button type="submit" className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer">
            <img src={busca} alt="buscar" />
          </button>
        </form>
        <button
          className="pr-2 hover:opacity-30 transition-opacity bg-transparent border-none"
          onClick={onCarrinhoClick}
        >
          <img
            src={carrinho}
            alt="Carrinho"
            className="max-h-[3rem] w-auto"
          />
        </button>
        <button
          className="pl-1 hover:opacity-30 transition-opacity bg-transparent border-none"
          onClick={onLoginClick}
        >
          <img src={perfil} alt="Perfil" className="max-h-[3rem] w-auto" />
        </button>
      </div>
    </nav>
  );
}
