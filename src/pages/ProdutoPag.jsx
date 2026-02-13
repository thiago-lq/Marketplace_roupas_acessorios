import { useParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { ProdutoEspecifico } from "../components/produtos";

export default function ProdutoPag({ onAddToCart }) {
  const { id } = useParams();
  const { products = [] } = useProducts();

  // Garantir que products é array
  const productsArray = Array.isArray(products) ? products : [];

  // Buscar produto pelo ID
  const produto = productsArray.find((p) => p?.id === id);

  // Se não encontrar o produto
  if (!produto) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Produto não encontrado</p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {/* Passando como produtoID que é o que o componente espera */}
      <ProdutoEspecifico produtoID={produto} onAddToCart={onAddToCart} />
    </div>
  );
}
