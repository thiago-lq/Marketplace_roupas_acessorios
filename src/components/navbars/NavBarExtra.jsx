import { Link } from "react-router-dom";

export default function NavBarExtra({ extraAberto }) {
  return (
    <div
      className={`absolute top-full left-0 w-full bg-white shadow-lg z-40
        origin-top transform overflow-hidden transition-transform duration-300 ease-in-out
        ${extraAberto ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}
    >
      <div className="py-3 flex justify-center gap-10">
        <div className="flex flex-col items-center justify-between gap-5">
          <div className="flex flex-row gap-5">
            <Link to="Busca?genero=feminino&sub=">
            <p className="text-sm text-black font-bold hover:underline">
              Feminino
            </p>
            </Link>
            <Link to="Busca?genero=feminino&sub=blusas_camisetas">
            <p className="text-sm text-black font-bold hover:underline">
              Blusas & Camisetas
            </p>
            </Link>
            <Link to="Busca?genero=feminino&sub=vestidos_saias">
            <p className="text-sm text-black font-bold hover:underline">
              Vestidos & Saias
            </p>
            </Link>
            <Link to="Busca?genero=feminino&sub=acessorios">
            <p className="text-sm text-black font-bold hover:underline">
              Acessórios
            </p>
            </Link>
            <Link to="Busca?genero=feminino&sub=calcas_leggings">
            <p className="text-sm text-black font-bold hover:underline">
              Calças & Leggings
            </p>
            </Link>
            <Link to="Busca?genero=feminino&sub=casacos_jaquetas">
            <p className="text-sm text-black font-bold hover:underline">
              Casacos & Jaquetas
            </p>
            </Link>
            <Link to="Busca?genero=feminino&sub=calcados">
            <p className="text-sm text-black font-bold hover:underline">
              Calçados
            </p>
            </Link>
          </div>
          <div className="flex flex-row gap-5">
            <Link to="Busca?genero=masculino&sub=">
              <p className="text-sm text-black font-bold hover:underline">
                Masculino
              </p>
            </Link>
            <Link to="Busca?genero=masculino&sub=camisetas_regatas">
              <p className="text-sm text-black font-bold hover:underline">
                Camisetas & Regatas
              </p>
            </Link>
            <Link to="Busca?genero=masculino&sub=camisas_sociais_polo">
              <p className="text-sm text-black font-bold hover:underline">
                Camisas Sociais & Polo
              </p>
            </Link>
            <Link to="Busca?genero=masculino&sub=acessorios">
              <p className="text-sm text-black font-bold hover:underline">
                Acessórios
              </p>
            </Link>
            <Link to="Busca?genero=masculino&sub=calcas_bermudas">
              <p className="text-sm text-black font-bold hover:underline">
                Calças & Bermudas
              </p>
            </Link>
            <Link to="Busca?genero=masculino&sub=jaquetas_moletons">
              <p className="text-sm text-black font-bold hover:underline">
                Jaquetas & Moletons 
              </p>
            </Link>
            <Link to="Busca?genero=masculino&sub=calcados">
              <p className="text-sm text-black font-bold hover:underline">
                Calçados
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
