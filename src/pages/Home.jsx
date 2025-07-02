// src/pages/Home.jsx
import products from "../data/products";
import ProductScroll from "../components/ProductScroll";
import Carousel from "../components/Carousel";

export default function Home() {
  const handleAddToCart = (product) => {
    console.log("Adicionado ao carrinho:", product);
  };

  return (
    <div className="max-w-8xl mx-auto px-6 py-8">
      <div className="force-margin"> {/* Container extra para margem */}
        <section>
          <h1 className="text-2xl font-semibold">Produtos em Destaque</h1>
          <Carousel products={products.filter(p => p.id <= 20)} />
        </section>
      </div>
      <div className="force-margin"> {/* Container extra para margem */}
        <section>
          <h2 className="text-xl font-semibold text-center">Masculino</h2>
          <ProductScroll
            products={products.filter(p => p.id > 20 && p.category === "Masculino")}
            onAddToCart={handleAddToCart}
          />
        </section>
      </div>
      <div className="force-margin">
        <section>
          <div className="relative w-full h-20 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                background: 'linear-gradient(to bottom right, black 50%, white 50%)',
              }}
            ></div>
            <h2 className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
              <span className="text-white pr-1">Femi</span>
              <span className="text-black">nino</span>
            </h2>
          </div>
          <ProductScroll
            products={products.filter(p => p.id > 20 && p.category === "Feminino")}
            onAddToCart={handleAddToCart}
          />
        </section>
      </div>
      <div className="force-margin">
        <section>
          <h2 className="text-xl font-semibold text-center">Lançamentos</h2>
          <ProductScroll
            products={products.filter(p => p.id > 20 && p.category === "Novos")}
            onAddToCart={handleAddToCart}
          />
        </section>
      </div>
    </div>
  );
}
