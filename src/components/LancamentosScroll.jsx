export default function LancamentosScroll({ products, onAddToCart }) {
  return (
    <div className="relative py-8">
      <div className="overflow-y-auto snap-y snap-mandatory py-6 max-h-[90vh] px-4 sm:px-6">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-[15px] w-full md:w-max md:ml-auto pr-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="snap-start
                           w-full sm:w-[220px] md:w-[240px] lg:w-[260px]
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

                <div className="p-3 flex flex-col h-[140px] sm:h-[150px] md:h-[180px] justify-between items-center text-center">
                  <h2 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg leading-tight">
                    {product.nome}
                  </h2>
                  <p className="text-black font-semibold text-base sm:text-lg md:text-xl">
                    R$ {Number(product.preco).toFixed(2)}
                  </p>
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
