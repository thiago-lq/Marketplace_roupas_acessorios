import { useState } from "react";

export default function ProdutoEspecifico({ produtoID }) {
  const [imagemPrincipal, setImagemPrincipal] = useState(produtoID.imagem);

  return (
    <div className="relative flex flex-col sm:w-[100px] md:w-[800px] md:h-[800px] md:mx-10 mx-auto">
      <div className="relative w-full h-full mx-15">
        <img
          src={imagemPrincipal}
          alt="imagem principal"
          className="absolute inset-0 w-[500px] h-[550px] object-cover object-center"
        />
      </div>
      <div className="relative">
        <div className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory md:w-[600px] h-[230px] w-full max-w-full">
          <div className="flex w-full">
            {(produtoID.imagensExtras || []).map((url, index) => (
              <div
                key={index}
                className="snap-start w-[200px] flex-shrink-0 bg-white flex flex-col"
              >
                <div className="relative w-full">
                  <button
                    className="cursor-pointer"
                    onClick={() => setImagemPrincipal(url)}
                  >
                    <img
                      src={url}
                      alt={`Imagem adicional ${index + 1}`}
                      className="object-cover object-center w-full h-full hover:opacity-60"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
