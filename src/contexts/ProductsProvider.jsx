// contexts/ProductsProvider.jsx
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/configs";
import ProductsContext from "./ProductsContext";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const q = collection(db, "Produtos");
    const unsub = onSnapshot(q, 
      (snapshot) => {
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(lista);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Erro ao carregar produtos:", error);
        setError("Erro ao carregar produtos. Tente novamente.");
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}