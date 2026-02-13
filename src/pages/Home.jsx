// pages/Home.jsx
import { LancamentosScroll, ProductScroll } from "../components/produtos";
import Carrossel from "../components/carrosseis";
import { useProducts } from "../hooks/useProducts";

export default function Home({ onAddToCart }) {
  const { products, error } = useProducts(); // 🔥 Desestruturação correta

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-8xl mx-auto py-12 space-y-20">
      {/* Produtos em Destaque */}
      <section className="px-4 md:px-30">
        <div className="inline-block bg-white shadow-[0_4px_6px_-2px_rgba(0,0,0,0.2)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 mb-8">
          <h1
            className="text-2xl font-extrabold bg-gradient-to-r from-black via-gray-700 to-gray-800 
               bg-clip-text text-transparent"
          >
            Produtos em Destaque
          </h1>
          <div className="h-[2px] w-full mt-2 bg-gradient-to-r from-black via-gray-700 to-gray-500 rounded-full"></div>
        </div>
        <Carrossel
          products={products.filter((p) => p.exibicao === "produtos_destaque")}
        />
      </section>

      {/* Masculino */}
      <section className="px-3">
        <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8">
          <h2
            className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-900 via-gray-700 to-gray-500 
               bg-clip-text text-transparent"
          >
            Masculino
          </h2>
        </div>
        <ProductScroll
          products={products.filter((p) => p.exibicao === "masculino")}
          onAddToCart={onAddToCart}
        />
      </section>

      {/* Feminino */}
      <section className="px-3">
        <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8">
          <h2
            className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-900 via-gray-700 to-gray-500 
               bg-clip-text text-transparent"
          >
            Feminino
          </h2>
        </div>
        <ProductScroll
          products={products.filter((p) => p.exibicao === "feminino")}
          onAddToCart={onAddToCart}
        />
      </section>

      {/* Lançamentos */}
      <section className="px-1">
        <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 mx-2 mb-10">
          <h2
            className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-900 via-gray-700 to-gray-500 
               bg-clip-text text-transparent"
          >
            Lançamentos
          </h2>
        </div>
        <LancamentosScroll
          products={products.filter((p) => p.exibicao === "lancamentos")}
          onAddToCart={onAddToCart}
        />
      </section>
    </main>
  );
}
