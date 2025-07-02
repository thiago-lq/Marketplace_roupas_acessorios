export default function ProductScroll({ products, onAddToCart }) {
    return (
    <div className="relative">
      <div className="overflow-x-auto snap-x snap-mandatory py-6 w-[calc(240px*4+15px*3)] mx-auto">
        <div className="flex gap-[15px] w-max">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-start w-[240px] flex-shrink-0 bg-white rounded-2xl shadow-lg p-4 flex flex-col"
            >
              <div className="relative w-full aspect-[3/4]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 h-[160px] justify-center items-center">
                <h2 className="font-semibold text-center text-gray-800 text-sm line-clamp-2">
                  {product.name}
                </h2>
                <p className="text-green-600 font-bold text-lg">
                  R$ {product.price.toFixed(2)}
                </p>
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm mt-auto"
                >
                Adicionar ao carrinho
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}