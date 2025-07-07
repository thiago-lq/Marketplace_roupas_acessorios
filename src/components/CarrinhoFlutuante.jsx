export default function CarrinhoFlutuante({ visivel, produtos, onClose, onRemoveFromCart }) {
  if (!visivel) return null;

  return (
    <div className="fixed top-[4.5rem] right-6 w-80 max-h-[70vh] overflow-y-auto bg-white border border-gray-300 shadow-2xl rounded-xl z-50 p-4 animate-slide-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold text-gray-800">Carrinho</h2>
        <button
          onClick={onClose}
          className="text-red-500 text-sm hover:underline"
        >
          Fechar
        </button>
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
                  onClick={() => onRemoveFromCart(index)}
                  className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded bg-red-100"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
