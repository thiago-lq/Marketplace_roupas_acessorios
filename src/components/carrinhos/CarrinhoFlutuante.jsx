import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

// Função que renderiza o componente CarrinhoFlutuante
export default function CarrinhoFlutuante({ visivel, produtos, onClose, onRemoveFromCart }) {
  const [animar, setAnimar] = useState(false);
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    if (visivel) {
      setMostrar(true);
      setAnimar(true);
    } else if (!visivel) {
      setAnimar(false);
      const timer = setTimeout(() => setMostrar(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visivel, mostrar]);

  if (!mostrar) return null;

  // Alerts de confirmação para remover itens do carrinho
  const handleRemove = (index) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você quer remover este item do carrinho?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
      customClass: {
        popup:'rounded-2xl shadow-2xl p-4 animate-zoomIn'
      },
      showClass: {
        popup: 'animate-zoomIn'
      },
      hideClass: {
        popup: 'animate-zoomOut'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        onRemoveFromCart(index);
        Swal.fire("Removido!", "O item foi removido do seu carrinho.", "success");
      }
    });
  };

  return (
    <div className={`fixed top-[4.5rem] right-6 w-80 max-h-[70vh] bg-white border border-gray-300 shadow-2xl rounded-xl z-50 p-4 ${animar ? "slideDownIn" : "slideDownOut"}`}>
      <div className="w-full max-w mb-2">
        <div className="flex justify-between">
          <h2 className="text-lg font-bold text-gray-800">Carrinho</h2>
          <button
            onClick={onClose}
            className="text-black text-sm hover:text-white font-semibold hover:bg-black rounded-2xl h-max px-1"
          >
            X
          </button>
        </div>
      </div>

      {produtos.length === 0 ? (
        <p className="text-gray-500 text-sm">Seu carrinho está vazio.</p>
      ) : (
        <ul className="space-y-3">
          {produtos.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div className="text-sm font-medium text-gray-700 truncate">
                {item.nome}
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-semibold text-green-600">
                  R$ {Number(item.preco).toFixed(2)}
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded bg-red-100"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {produtos.length === 0 ? null : (
        <Link to="/PaginaCarrinho">
          <div className="w-full flex justify-end items-center">
            <div className="w-max text-sm bg-white hover:bg-black hover:text-white rounded-xl px-2">
              <button>Ir ao carrinho</button>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
