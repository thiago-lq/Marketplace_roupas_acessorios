import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

// Função que renderiza o componente CarrinhoFlutuante
export default function CarrinhoFlutuante({
  visivel,
  cart,
  onClose,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}) {
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

  // Calcula total do carrinho
  const totalCarrinho = cart.reduce(
    (acc, item) => acc + Number(item.preco) * (item.quantidade || 1),
    0,
  );

  // Alerts de confirmação para remover itens do carrinho
  const handleRemove = (index, nome) => {
    Swal.fire({
      title: "Tem certeza?",
      text: `Você quer remover ${nome} do carrinho?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "rounded-2xl shadow-2xl p-4 animate-zoomIn",
      },
      showClass: {
        popup: "animate-zoomIn",
      },
      hideClass: {
        popup: "animate-zoomOut",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onRemoveFromCart(index);
        Swal.fire(
          "Removido!",
          "O item foi removido do seu carrinho.",
          "success",
        );
      }
    });
  };

  return (
    <div
      className={`fixed top-[4.5rem] right-6 w-80 md:w-96 max-h-[80vh] bg-white border border-gray-300 shadow-2xl rounded-xl z-50 p-4 flex flex-col ${
        animar ? "slideDownIn" : "slideDownOut"
      }`}
    >
      <div className="w-full mb-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">
            Carrinho ({cart.length} {cart.length === 1 ? "item" : "itens"})
          </h2>
          <button
            onClick={onClose}
            className="text-black text-sm hover:text-white font-semibold hover:bg-black rounded-2xl h-max px-2 py-1"
          >
            X
          </button>
        </div>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-8">
          Seu carrinho está vazio.
        </p>
      ) : (
        <>
          <ul className="space-y-4 overflow-y-auto flex-1 max-h-[50vh] pr-1">
            {cart.map((item, index) => {
              const quantidade = item.quantidade || 1;
              const subtotal = Number(item.preco) * quantidade;

              return (
                <li key={index} className="flex flex-col border-b pb-3">
                  {/* Nome e preço */}
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                      {item.nome}
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      R$ {Number(item.preco).toFixed(2)}
                    </div>
                  </div>

                  {/* Detalhes (cor/tamanho) */}
                  {(item.corSelecionada || item.tamanhoSelecionado) && (
                    <div className="text-xs text-gray-500 mb-2">
                      {item.corSelecionada && (
                        <span>Cor: {item.corSelecionada} </span>
                      )}
                      {item.tamanhoSelecionado && (
                        <span>Tam: {item.tamanhoSelecionado}</span>
                      )}
                    </div>
                  )}

                  {/* Controles de quantidade */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onDecreaseQuantity(index)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {quantidade}
                      </span>
                      <button
                        onClick={() => onIncreaseQuantity(index)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold">
                        Subtotal: R$ {subtotal.toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemove(index, item.nome)}
                        className="text-red-600 hover:text-red-800 text-xs font-semibold"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Total e botão */}
          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="text-lg font-bold text-green-600">
                R$ {totalCarrinho.toFixed(2)}
              </span>
            </div>

            <Link to="/PaginaCarrinho" onClick={onClose}>
              <div className="w-full bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition">
                <button className="w-full">Ir ao carrinho</button>
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
