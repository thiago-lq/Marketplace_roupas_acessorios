import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/configs";
import LancamentosScroll from "../components/LancamentosScroll";
import ProductScroll from "../components/ProductScroll";
import Carousel from "../components/Carousel";

export default function Home({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = collection(db, "Produtos");
    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(lista);
    });

    return () => unsub();
  }, []);

  return (
    <main className="max-w-8xl mx-auto px-6 py-12 space-y-20">
      {/* Produtos em Destaque */}
      <section className="px-4 md:px-24">
        <div className= "inline-block bg-white shadow-[0_4px_6px_-2px_rgba(0,0,0,0.2)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8 mb-8">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-black via-gray-700 to-gray-800 
               bg-clip-text text-transparent">
          Produtos em Destaque
          </h1>
          <div className="h-[2px] w-full mt-2 bg-gradient-to-r from-black via-gray-700 to-gray-500 rounded-full"></div>
        </div>
        <Carousel products={products.slice(0, 10)} />
      </section>

      {/* Masculino */}
      <section>
        <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8">
          <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-900 via-gray-700 to-gray-500 
               bg-clip-text text-transparent">
          Masculino
          </h2>
        </div>
        <ProductScroll
          products={products.filter((p) => p.categoria === "masculino")}
          onAddToCart={onAddToCart}
        />
      </section>

      {/* Feminino */}
      <section>
        <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8">
          <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-900 via-gray-700 to-gray-500 
               bg-clip-text text-transparent">
          Feminino
          </h2>
        </div>
        <ProductScroll
          products={products.filter((p) => p.categoria === "feminino")}
          onAddToCart={onAddToCart}
        />
      </section>
      <section>
        <div className="bg-white shadow-[0_8px_20px_rgba(0,0,0,0.15)] rounded-lg p-3 sm:p-4 md:p-6 lg:p-8">
          <h2 className="text-2xl font-extrabold text-center bg-gradient-to-r from-blue-900 via-gray-700 to-gray-500 
               bg-clip-text text-transparent">
          Lançamentos
          </h2>
        </div>
        <LancamentosScroll
          products={products}
          onAddToCart={onAddToCart}
        />
      </section>
    </main>
  );
}
