export default function Cupons({ valor, condicao, validade }) {
  return (
    <div
      className="bg-gradient-to-r from-black via-gray-800 to-gray-500 snap-start flex-shrink-0 
                 w-[250px] rounded-2xl shadow-lg p-3 border border-gray-300 
                 transition-all duration-300 hover:scale-105 hover:border-black relative"
    >
      {/* Valor grande */}
      <h2 className="text-3xl font-bold text-white">R$ {valor}</h2>

      {/* Descrição do cupom */}
      <p className="text-sm mt-3 text-gray-200">{condicao}</p>

      {/* Validade */}
      <p className="text-xs text-gray-300 mt-5">Válido até: {validade}</p>

      {/* Botão usar */}
      <button
        className="absolute bottom-4 right-4 text-xs px-3 py-1 rounded-full 
                   bg-white text-black font-semibold shadow hover:bg-gray-200 transition"
      >
        Usar
      </button>
    </div>
  );
}
