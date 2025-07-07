import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/configs";

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
      <section className="force-margin">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b border-gray-300 pb-3">
          Produtos em Destaque
        </h1>
        <Carousel products={products.slice(0, 10)} />
      </section>

      {/* Masculino */}
      <section className="force-margin">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r text-gray-800 mb-6">
          Masculino
        </h2>
        <ProductScroll
          products={products.filter((p) => p.categoria === "masculino")}
          onAddToCart={onAddToCart}
        />
      </section>

      {/* Feminino */}
      <section className="force-margin">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r text-gray-800 mb-6">
          Feminino
        </h2>
        <ProductScroll
          products={products.filter((p) => p.categoria === "feminino")}
          onAddToCart={onAddToCart}
        />
      </section>
    </main>
  );
}
