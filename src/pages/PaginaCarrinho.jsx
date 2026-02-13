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

  // Estados para dados de pagamento
  const [dadosCartao, setDadosCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });
  const [dadosBoleto, setDadosBoleto] = useState(null);
  const [dadosPix, setDadosPix] = useState(null);
  const [etapaPagamento, setEtapaPagamento] = useState("selecao"); // selecao, processando, confirmado

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

  // Desconto total
  const descontoTotal = descontoCupom + descontoPix;
  const totalCarrinho = subtotal - descontoTotal;
  const valorParcela = totalCarrinho / parcelas;

  useEffect(() => {
    setParcelas(1);
    // Resetar dados de pagamento ao mudar método
    setDadosCartao({ numero: "", nome: "", validade: "", cvv: "" });
    setDadosBoleto(null);
    setDadosPix(null);
    setEtapaPagamento("selecao");
  }, [metodoPagamento]);

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
        popup: "rounded-2xl shadow-2xl p-4",
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

  const handleGerarBoleto = () => {
    const codigoBoleto =
      "34191.79001 01043.510047 91020.150008 9 88110000026000";
    const dataVencimento = new Date();
    dataVencimento.setDate(dataVencimento.getDate() + 3);

    setDadosBoleto({
      codigo: codigoBoleto,
      vencimento: dataVencimento.toLocaleDateString("pt-BR"),
      valor: totalCarrinho.toFixed(2),
    });
    setEtapaPagamento("processando");
  };

  const handleGerarPix = () => {
    const codigoPix =
      "00020126580014BR.GOV.BCB.PIX0136a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t05204000053039865405260.005802BR5913Fulano de Tal6008BRASILIA62070503***6304E2B4";

    setDadosPix({
      codigo: codigoPix,
      qrCode:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='white'/%3E%3Cpath d='M40 40 L160 40 L160 160 L40 160 Z' fill='none' stroke='black' stroke-width='2'/%3E%3C/svg%3E",
      expiracao: "30 minutos",
    });
    setEtapaPagamento("processando");
  };

  const handleProcessarPagamentoCartao = () => {
    // Validação básica
    if (
      !dadosCartao.numero ||
      !dadosCartao.nome ||
      !dadosCartao.validade ||
      !dadosCartao.cvv
    ) {
      Swal.fire({
        title: "Campos obrigatórios",
        text: "Preencha todos os dados do cartão.",
        icon: "warning",
        confirmButtonColor: "#000",
      });
      return;
    }

    if (dadosCartao.numero.replace(/\s/g, "").length < 16) {
      Swal.fire({
        title: "Número inválido",
        text: "Digite um número de cartão válido.",
        icon: "error",
        confirmButtonColor: "#000",
      });
      return;
    }

    setEtapaPagamento("processando");

    // Simulação de processamento
    setTimeout(() => {
      setEtapaPagamento("confirmado");
      finalizarCompra();
    }, 2000);
  };

  const finalizarCompra = () => {
    Swal.fire({
      title: "Compra confirmada!",
      html: `
        <div class="text-left text-sm">
          <p class="mb-2 font-semibold">Pedido realizado com sucesso!</p>
          <p class="mb-2">Pagamento: <strong>${metodoPagamento}</strong></p>
          ${parcelas > 1 ? `<p class="mb-2">${parcelas}x de R$ ${valorParcela.toFixed(2)}</p>` : ""}
          ${cupomAplicado ? `<p class="mb-2 text-green-600">Desconto: -R$ ${descontoCupom.toFixed(2)}</p>` : ""}
          <p class="mb-2 text-lg font-bold">Total: R$ ${totalCarrinho.toFixed(2)}</p>
          <p class="text-xs text-gray-600 mt-4">Obrigado por comprar conosco!</p>
        </div>
      `,
      icon: "success",
      confirmButtonColor: "#000",
      confirmButtonText: "Continuar comprando",
      customClass: {
        popup: "rounded-2xl shadow-2xl p-4",
      },
    }).then(() => {
      onClearCart();
      setMetodoPagamento("");
      setParcelas(1);
      setCupom("");
      setCupomAplicado("");
      setEtapaPagamento("selecao");
      navigate("/");
    });
  };

  const formatarNumeroCartao = (value) => {
    const v = value.replace(/\s/g, "").replace(/\D/g, "").substring(0, 16);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const formatarValidade = (value) => {
    const v = value.replace(/\D/g, "").substring(0, 4);
    if (v.length >= 3) {
      return v.substring(0, 2) + "/" + v.substring(2);
    }
    return v;
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Seus produtos
      </h1>

      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
        {produtos.length > 0 ? (
          <>
            {/* Lista de produtos - mobile first */}
            <ul className="space-y-3 mb-4 max-h-96 overflow-y-auto">
              {produtos.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3 gap-2"
                >
                  <div className="text-sm font-medium text-gray-700">
                    {item.nome}
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <div className="text-sm font-semibold text-green-600">
                      R$ {Number(item.preco).toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-600 hover:text-red-800 text-xs font-semibold px-3 py-1.5 rounded bg-red-100"
                    >
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Botão limpar carrinho */}
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
                      onClearCart();
                      Swal.fire(
                        "Limpo!",
                        "Seu carrinho foi esvaziado.",
                        "success",
                      );
                    }
                  });
                }}
                className="text-red-600 hover:text-red-800 text-sm font-semibold px-3 py-1.5 rounded bg-red-100"
              >
                Limpar carrinho
              </button>
            </div>

            {/* Resumo */}
            <div className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>

                {cupomAplicado && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto ({CUPONS[cupomAplicado]}%):</span>
                    <span>- R$ {descontoCupom.toFixed(2)}</span>
                  </div>
                )}

                {metodoPagamento === "Pix" && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Desconto Pix (5%):</span>
                    <span>- R$ {descontoPix.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-lg font-bold border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-green-600">
                    R$ {totalCarrinho.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Cupom */}
              <div className="mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2 text-sm sm:text-base">
                  Cupom de desconto:
                </h4>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                    placeholder="Digite seu cupom"
                    className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={cupomAplicado}
                  />
                  <button
                    onClick={handleAplicarCupom}
                    disabled={cupomAplicado}
                    className={`px-4 py-2 text-sm rounded-lg font-semibold transition ${
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
                    <span className="text-xs sm:text-sm text-green-600">
                      Cupom {cupomAplicado} aplicado!
                    </span>
                    <button
                      onClick={() => setCupomAplicado("")}
                      className="text-xs text-red-600 hover:text-red-800"
                    >
                      Remover
                    </button>
                  </div>
                )}
                {/* Lista de cupons disponíveis */}
                <div className="mt-2 text-xs text-gray-500">
                  Cupons disponíveis: BEMVINDO10, BLACKFRIDA, FRETEGRATIS,
                  NATAL25, PRIMAVERA
                </div>
              </div>

              {/* Métodos de pagamento */}
              <div className="space-y-4 mb-6">
                <h3 className="font-semibold text-base sm:text-lg">
                  Método de pagamento:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    "Cartão de Crédito",
                    "Cartão de Débito",
                    "Pix",
                    "Boleto",
                    "PayPal",
                    "Google Pay",
                  ].map((metodo) => (
                    <label
                      key={metodo}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                        metodoPagamento === metodo
                          ? "border-black bg-gray-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pagamento"
                        value={metodo}
                        checked={metodoPagamento === metodo}
                        onChange={(e) => setMetodoPagamento(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{metodo}</span>
                    </label>
                  ))}
                </div>

                {/* Formulário do Cartão */}
                {metodoPagamento === "Cartão de Crédito" &&
                  etapaPagamento === "selecao" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                      <h4 className="font-medium text-sm">Dados do cartão:</h4>

                      <input
                        type="text"
                        placeholder="Número do cartão"
                        value={dadosCartao.numero}
                        onChange={(e) =>
                          setDadosCartao({
                            ...dadosCartao,
                            numero: formatarNumeroCartao(e.target.value),
                          })
                        }
                        className="w-full p-2 text-sm border rounded-lg"
                        maxLength="19"
                      />

                      <input
                        type="text"
                        placeholder="Nome do titular"
                        value={dadosCartao.nome}
                        onChange={(e) =>
                          setDadosCartao({
                            ...dadosCartao,
                            nome: e.target.value,
                          })
                        }
                        className="w-full p-2 text-sm border rounded-lg"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={dadosCartao.validade}
                          onChange={(e) =>
                            setDadosCartao({
                              ...dadosCartao,
                              validade: formatarValidade(e.target.value),
                            })
                          }
                          className="p-2 text-sm border rounded-lg"
                          maxLength="5"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={dadosCartao.cvv}
                          onChange={(e) =>
                            setDadosCartao({
                              ...dadosCartao,
                              cvv: e.target.value
                                .replace(/\D/g, "")
                                .substring(0, 3),
                            })
                          }
                          className="p-2 text-sm border rounded-lg"
                          maxLength="3"
                        />
                      </div>

                      {/* Parcelamento */}
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium">
                          Número de parcelas:
                        </label>
                        <select
                          value={parcelas}
                          onChange={(e) => setParcelas(Number(e.target.value))}
                          className="w-full p-2 text-sm border rounded-lg"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                            (num) => (
                              <option key={num} value={num}>
                                {num}x de R$ {(totalCarrinho / num).toFixed(2)}
                                {num === 1 ? " (à vista)" : " sem juros"}
                              </option>
                            ),
                          )}
                        </select>
                      </div>

                      <button
                        onClick={handleProcessarPagamentoCartao}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm"
                      >
                        Pagar com cartão
                      </button>
                    </div>
                  )}

                {/* Pix */}
                {metodoPagamento === "Pix" && etapaPagamento === "selecao" && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                    <p className="text-sm mb-4">
                      Ganhe 5% de desconto pagando com Pix!
                    </p>
                    <button
                      onClick={handleGerarPix}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm"
                    >
                      Gerar código Pix
                    </button>
                  </div>
                )}

                {metodoPagamento === "Pix" && dadosPix && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                    <div className="mb-4">
                      <img
                        src={dadosPix.qrCode}
                        alt="QR Code Pix"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                    <p className="text-xs bg-white p-2 rounded border mb-2 break-all">
                      {dadosPix.codigo}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      Código válido por {dadosPix.expiracao}
                    </p>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(dadosPix.codigo)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm mr-2"
                    >
                      Copiar código
                    </button>
                    <button
                      onClick={finalizarCompra}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Já paguei
                    </button>
                  </div>
                )}

                {/* Boleto */}
                {metodoPagamento === "Boleto" &&
                  etapaPagamento === "selecao" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center">
                      <button
                        onClick={handleGerarBoleto}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm"
                      >
                        Gerar boleto
                      </button>
                    </div>
                  )}

                {metodoPagamento === "Boleto" && dadosBoleto && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Boleto gerado:</p>
                    <p className="text-xs bg-white p-2 rounded border mb-2 font-mono break-all">
                      {dadosBoleto.codigo}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      Vencimento: {dadosBoleto.vencimento}
                    </p>
                    <p className="text-xs text-gray-600 mb-4">
                      Valor: R$ {dadosBoleto.valor}
                    </p>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(dadosBoleto.codigo)
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm mr-2"
                    >
                      Copiar código
                    </button>
                    <button
                      onClick={finalizarCompra}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-sm"
                    >
                      Já paguei
                    </button>
                  </div>
                )}

                {/* Loading */}
                {etapaPagamento === "processando" && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-sm text-gray-600">
                      Processando pagamento...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-base sm:text-lg mb-4">
              Seu carrinho está vazio
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-sm sm:text-base"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
