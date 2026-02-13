// hooks/useProducts.js
import { useContext } from "react";
import ProductsContext from "../contexts/ProductsContext";

export function useProducts() {
  const context = useContext(ProductsContext);
  
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductsProvider");
  }
  
  return context;
}