export default function Cupons() {
    return (
        <div className="bg-gradient-to-r from-black via-gray-800 to-gray-400 snap-start flex-shrink-0 w-[250px] rounded-2xl shadow-lg p-4 
                        border border-gray-200 transition-all duration-300 relative hover:border-black">
        {/* Valor grande */}
        <h2 className="text-2xl font-bold text-white">R$ 10</h2>
        
        {/* Descrição do cupom */}
        <p className="text-sm mt-2 text-white">Compras acima de R$ 200</p>
        
        {/* Validade */}
        <p className="text-xs text-white mt-4">Válido até: 29/07/2025</p>

        </div>
    );
}