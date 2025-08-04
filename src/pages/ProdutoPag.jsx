import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { ProdutoEspecifico } from "../components/produtos";

export default function ProdutoPag({onAddToCart}) {
  const { id } = useParams();
  const produtos = useProducts();

  const produtoID = produtos.find((p) => p.id === id);

  return (
    <div className="flex flex-wrap">
      <ProdutoEspecifico produtoID={produtoID} onAddToCart={onAddToCart}/>
    </div>
  );
}
