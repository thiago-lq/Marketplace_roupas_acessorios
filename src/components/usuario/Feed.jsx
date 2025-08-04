import Cupons from "./Cupons";

export default function Feed() {
  // Exemplo de cupons (poderia vir de uma API futuramente)
  const listaCupons = [
  { valor: 75, condicao: "Compras acima de R$ 200", validade: "29/07/2025" },
  { valor: 50, condicao: "Primeira compra", validade: "10/08/2025" },
  { valor: 100, condicao: "Acima de R$ 500", validade: "01/09/2025" },
  { valor: 20, condicao: "Frete grátis", validade: "15/08/2025" },
  { valor: 10, condicao: "Qualquer valor", validade: "30/08/2025" },

  { valor: 30, condicao: "Compras acima de R$ 150", validade: "20/08/2025" },
  { valor: 60, condicao: "Segunda compra", validade: "05/09/2025" },
  { valor: 15, condicao: "Itens de promoção", validade: "25/08/2025" },
  { valor: 80, condicao: "Compras acima de R$ 300", validade: "02/09/2025" },
  { valor: 5, condicao: "Qualquer pedido", validade: "18/08/2025" },
  { valor: 40, condicao: "Somente roupas", validade: "12/09/2025" },
  { valor: 25, condicao: "Acessórios", validade: "29/08/2025" },
  { valor: 90, condicao: "Acima de R$ 400", validade: "22/09/2025" },
  { valor: 35, condicao: "Tênis esportivos", validade: "19/08/2025" },
  { valor: 70, condicao: "Pedidos acima de R$ 250", validade: "14/09/2025" },
];


  return (
    <div className="flex flex-col">
      <h1 className="pb-6 text-2xl font-semibold 
                       bg-gradient-to-r from-black via-gray-600 to-gray-400 
                       bg-clip-text text-transparent">
          Seus cupons
      </h1>
      <div className="overflow-x-auto overflow-hidden snap-x snap-mandatory py-6 w-full">
        <div className="flex gap-6 w-[1280px] px-4">
          {listaCupons.map((cupom, index) => (
            <Cupons
              key={index}
              valor={cupom.valor}
              condicao={cupom.condicao}
              validade={cupom.validade}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
