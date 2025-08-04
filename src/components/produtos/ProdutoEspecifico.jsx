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
                  <div className="relative inline-block group">
                        <button
                          onClick={() => onAddToCart(product)}
                          className="bg-black text-white px-2 sm:px-3 py-1 sm:py-2 text-sm sm:text-base md:text-lg relative z-10
                                   transition-transform duration-300 
                                   group-hover:translate-x-[-2px] group-hover:translate-y-[-3px]
                                   group-hover:text-gray-300 leading-tight"
                        >
                          Adicionar ao carrinho
                        </button>
                        <div
                          className="absolute bottom-0 right-0 w-full h-full bg-gray-600 z-0 transition-transform duration-300 
                                   group-hover:translate-x-[-2px] group-hover:translate-y-[-3px]"
                          style={{ transform: "translate(6px, 6px)" }}
                        />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
