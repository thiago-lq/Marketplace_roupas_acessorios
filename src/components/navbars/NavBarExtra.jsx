import { Link } from "react-router-dom";

export default function NavBarExtra({ extraAberto, closeNavbarExtra }) {
  return (
    <div
      className={`absolute top-full left-0 w-full bg-white shadow-lg z-40
        origin-top overflow-hidden transition-all duration-800 ease-in-out
        ${extraAberto ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
    >
      <div className="py-3 px-5 flex sm:flex-row md:flex-col md:justify-between md:items-center gap-6">
        {/* Feminino */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 flex-1">
          <Link to="Busca?genero=feminino&sub=" className="font-extrabold hover:underline" onClick={closeNavbarExtra}>Feminino</Link>
          <Link to="Busca?genero=feminino&sub=blusas_camisetas" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Blusas & Camisetas</Link>
          <Link to="Busca?genero=feminino&sub=vestidos_saias" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Vestidos & Saias</Link>
          <Link to="Busca?genero=feminino&sub=acessorios" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Acessórios</Link>
          <Link to="Busca?genero=feminino&sub=calcas_leggings" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Calças & Leggings</Link>
          <Link to="Busca?genero=feminino&sub=casacos_jaquetas" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Casacos & Jaquetas</Link>
          <Link to="Busca?genero=feminino&sub=calcados" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Calçados</Link>
        </div>

        {/* Masculino */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-5 flex-1">
          <Link to="Busca?genero=masculino&sub=" className="font-extrabold hover:underline" onClick={closeNavbarExtra}>Masculino</Link>
          <Link to="Busca?genero=masculino&sub=camisetas_regatas" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Camisetas & Regatas</Link>
          <Link to="Busca?genero=masculino&sub=camisas_sociais_polo" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Camisas Sociais & Polo</Link>
          <Link to="Busca?genero=masculino&sub=acessorios" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Acessórios</Link>
          <Link to="Busca?genero=masculino&sub=calcas_bermudas" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Calças & Bermudas</Link>
          <Link to="Busca?genero=masculino&sub=jaquetas_moletons" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Jaquetas & Moletons</Link>
          <Link to="Busca?genero=masculino&sub=calcados" className="font-semibold hover:underline" onClick={closeNavbarExtra}>Calçados</Link>
        </div>
      </div>
    </div>
  );
}
