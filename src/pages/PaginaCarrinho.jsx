import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaginaCarrinho({
  produtos,
  onRemoveFromCart,
  onClearCart,
}) {
  const navigate = useNavigate();
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState("");

  // Cupons fictícios
  const CUPONS = {
    BEMVINDO10: 10,
    BLACKFRIDA: 20,
    FRETEGRATIS: 0,
    NATAL25: 25,
    PRIMAVERA: 15,
  };

  // Calcula o total do carrinho
  const subtotal = produtos.reduce((acc, item) => acc + Number(item.preco), 0);

  // Aplica desconto do cupom
  const descontoCupom = cupomAplicado
    ? subtotal * (CUPONS[cupomAplicado] / 100)
    : 0;

  // Aplica desconto do Pix (5%)
  const descontoPix = metodoPagamento === "Pix" ? subtotal * 0.05 : 0;

  // Desconto total (cupom + Pix)
  const descontoTotal = descontoCupom + descontoPix;

  // Total final com descontos aplicados
  const totalCarrinho = subtotal - descontoTotal;
  const valorParcela = totalCarrinho / parcelas;

  // Efeito para resetar parcelas quando muda o método de pagamento
  useEffect(() => {
    setParcelas(1);
  }, [metodoPagamento]);

  // Alerts de confirmação para remover itens do carrinho
  const handleRemove = (index) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Você quer remover este item?",
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

  // Função para aplicar cupom
  const handleAplicarCupom = () => {
    const cupomUpper = cupom.toUpperCase().trim();

    if (!cupomUpper) {
      Swal.fire({
        title: "Atenção!",
        text: "Digite um cupom válido.",
        icon: "warning",
        confirmButtonColor: "#000",
      });
      return;
    }

    if (CUPONS[cupomUpper]) {
      setCupomAplicado(cupomUpper);
      Swal.fire({
        title: "Cupom aplicado!",
        text: `Você ganhou ${CUPONS[cupomUpper]}% de desconto!`,
        icon: "success",
        confirmButtonColor: "#000",
        timer: 2000,
        showConfirmButton: false,
      });
      setCupom("");
    } else {
      Swal.fire({
        title: "Cupom inválido!",
        text: "Este cupom não existe ou já expirou.",
        icon: "error",
        confirmButtonColor: "#000",
      });
    }
  };

  // Alerta de confirmação de compra
  const handleFinalizarCompra = () => {
    if (!metodoPagamento) {
      Swal.fire({
        title: "Atenção!",
        text: "Por favor, selecione um método de pagamento.",
        icon: "warning",
        confirmButtonColor: "#000",
        confirmButtonText: "OK",
      });
      return;
    }

    if (produtos.length === 0) {
      Swal.fire({
        title: "Carrinho vazio!",
        text: "Adicione produtos ao carrinho antes de finalizar a compra.",
        icon: "warning",
        confirmButtonColor: "#000",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Compra confirmada!",
      html: `
        <div class="text-left">
          <p class="mb-2 font-semibold">✅ Pedido realizado com sucesso!</p>
          <p class="mb-2">Pagamento: <strong>${metodoPagamento}</strong></p>
          ${parcelas > 1 ? `<p class="mb-2">${parcelas}x de R$ ${valorParcela.toFixed(2)}</p>` : ""}
          ${cupomAplicado ? `<p class="mb-2 text-green-600">Desconto cupom (${CUPONS[cupomAplicado]}%): -R$ ${descontoCupom.toFixed(2)}</p>` : ""}
          ${metodoPagamento === "Pix" ? `<p class="mb-2 text-green-600">Desconto Pix (5%): -R$ ${descontoPix.toFixed(2)}</p>` : ""}
          ${descontoTotal > 0 ? `<p class="mb-2 font-semibold">Total de descontos: -R$ ${descontoTotal.toFixed(2)}</p>` : ""}
          <p class="mb-2 text-lg font-bold">Total final: <span class="text-green-600">R$ ${totalCarrinho.toFixed(2)}</span></p>
          <p class="text-sm text-gray-600 mt-4">Obrigado por comprar conosco!</p>
          <p class="text-xs text-gray-500 mt-2">Seu carrinho foi esvaziado.</p>
        </div>
      `,
      icon: "success",
      confirmButtonColor: "#000",
      confirmButtonText: "Continuar comprando",
      customClass: {
        popup: "rounded-2xl shadow-2xl p-4",
      },
    }).then(() => {
      // Limpa o carrinho após a compra
      onClearCart();

      // Reseta os estados locais
      setMetodoPagamento("");
      setParcelas(1);
      setCupom("");
      setCupomAplicado("");

      // Redireciona para a página inicial
      navigate("/");
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Seus produtos</h1>

      {/* Lista de produtos */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {produtos.length > 0 ? (
          <>
            <ul className="space-y-3 mb-4 max-h-96 overflow-y-auto">
              {produtos.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="text-sm font-medium text-gray-700 truncate flex-1">
                    {item.nome}
                  </div>
                  <div className="flex items-center gap-2 ml-4">
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

            {/* Botão para limpar todo o carrinho */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Limpar carrinho?",
                    text: "Todos os itens serão removidos.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#000",
                    confirmButtonText: "Sim, limpar",
                    cancelButtonText: "Cancelar",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      // Usa a função onClearCart que já existe para limpar tudo de uma vez
                      onClearCart();
                      Swal.fire(
                        "Limpo!",
                        "Seu carrinho foi esvaziado.",
                        "success",
                      );
                    }
                  });
                }}
                className="text-red-600 hover:text-red-800 text-sm font-semibold px-3 py-1 rounded bg-red-100"
              >
                Limpar carrinho
              </button>
            </div>

            {/* Resumo do carrinho */}
            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>

                {/* Descontos aplicados */}
                {cupomAplicado && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span>Desconto cupom ({CUPONS[cupomAplicado]}%):</span>
                    <span>- R$ {descontoCupom.toFixed(2)}</span>
                  </div>
                )}

                {metodoPagamento === "Pix" && (
                  <div className="flex justify-between items-center text-sm text-green-600">
                    <span>Desconto Pix (5%):</span>
                    <span>- R$ {descontoPix.toFixed(2)}</span>
                  </div>
                )}

                {descontoTotal > 0 && (
                  <div className="flex justify-between items-center text-sm font-semibold text-green-600 border-t border-green-200 pt-2 mt-2">
                    <span>Total de descontos:</span>
                    <span>- R$ {descontoTotal.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-lg font-bold border-t pt-2 mt-2">
                  <span>Total final:</span>
                  <span className="text-green-600">
                    R$ {totalCarrinho.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Seção de cupom */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Cupom de desconto:</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                    placeholder="Digite seu cupom"
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={cupomAplicado}
                  />
                  <button
                    onClick={handleAplicarCupom}
                    disabled={cupomAplicado}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      cupomAplicado
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {cupomAplicado ? "Aplicado" : "Aplicar"}
                  </button>
                </div>
                {cupomAplicado && (
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-sm text-green-600">
                      Cupom {cupomAplicado} aplicado!
                    </span>
                    <button
                      onClick={() => {
                        setCupomAplicado("");
                      }}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remover cupom
                    </button>
                  </div>
                )}
                <div className="mt-2 text-xs text-gray-500">
                  Cupons disponíveis: BEMVINDO10, BLACKFRIDA, FRETEGRATIS,
                  NATAL25, PRIMAVERA
                </div>
              </div>

              {/* Opções de pagamento fictícias */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-lg">Método de pagamento:</h3>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="Cartão de Crédito"
                      checked={metodoPagamento === "Cartão de Crédito"}
                      onChange={(e) => setMetodoPagamento(e.target.value)}
                      className="mr-2"
                    />
                    <span>Cartão de Crédito</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="Cartão de Débito"
                      checked={metodoPagamento === "Cartão de Débito"}
                      onChange={(e) => setMetodoPagamento(e.target.value)}
                      className="mr-2"
                    />
                    <span>Cartão de Débito</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="Pix"
                      checked={metodoPagamento === "Pix"}
                      onChange={(e) => setMetodoPagamento(e.target.value)}
                      className="mr-2"
                    />
                    <span>Pix (5% de desconto)</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="Boleto"
                      checked={metodoPagamento === "Boleto"}
                      onChange={(e) => setMetodoPagamento(e.target.value)}
                      className="mr-2"
                    />
                    <span>Boleto Bancário</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="PayPal"
                      checked={metodoPagamento === "PayPal"}
                      onChange={(e) => setMetodoPagamento(e.target.value)}
                      className="mr-2"
                    />
                    <span>PayPal</span>
                  </label>

                  <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pagamento"
                      value="Google Pay"
                      checked={metodoPagamento === "Google Pay"}
                      onChange={(e) => setMetodoPagamento(e.target.value)}
                      className="mr-2"
                    />
                    <span>Google Pay</span>
                  </label>
                </div>

                {/* Opção de parcelamento (só aparece para cartão de crédito) */}
                {metodoPagamento === "Cartão de Crédito" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <label className="block mb-2 font-medium">
                      Número de parcelas:
                    </label>
                    <select
                      value={parcelas}
                      onChange={(e) => setParcelas(Number(e.target.value))}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                        <option key={num} value={num}>
                          {num}x de R$ {(totalCarrinho / num).toFixed(2)}
                          {num === 1 ? " (à vista)" : " (sem juros)"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Botão de finalizar compra */}
              <button
                onClick={handleFinalizarCompra}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Finalizar Compra
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              Seu carrinho está vazio
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
