import { Link } from "react-router-dom";

export default function ProductScroll({ products }) {
  return (
    <div className="relative">
      <div className="overflow-x-auto snap-x snap-mandatory py-6 mx-auto w-full sm:w-[530px] md:w-[800px] lg:w-[1280px] max-w-full">
        <div className="flex gap-[15px] w-max">
          {products.map((product) => (
            <Link to={`produto/${product.id}`}>
              <div
                key={product.id}
                className="snap-start 
                         w-[170px] sm:w-[220px] md:w-[240px] lg:w-[300px]
                         flex-shrink-0 bg-white rounded-2xl shadow-lg 
                         p-3 flex flex-col border border-transparent hover:border-gray-300 
                         transition-all duration-300"
              >
                <div className="relative w-full aspect-[4/5]">
                  <img
                    src={product.imagem}
                    alt={product.nome}
                    className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
                  />
                </div>

                <div
                  className="p-3 flex flex-col 
                              h-[80px] sm:h-[90px] md:h-[120px] 
                              justify-between items-center text-center"
                >
                  <h2
                    className="font-semibold text-gray-800 
                               text-sm sm:text-lg md:text-xl 
                               leading-tight line-clamp-2"
                  >
                    {product.nome}
                  </h2>
                  <p
                    className="text-black font-semibold 
                              text-base sm:text-lg md:text-xl"
                  >
                    R$ {Number(product.preco).toFixed(2)}
                  </p>
                  <div className="relative inline-block group">
                    <div
                      className="absolute bottom-0 right-0 w-full h-full bg-gray-600 z-0 
                               transition-transform duration-300 translate-x-0 translate-y-0
                               group-hover:translate-x-[-2px] group-hover:translate-y-[-3px]"
                      style={{ transform: "translate(6px, 6px)" }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
