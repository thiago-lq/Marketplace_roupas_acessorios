import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaginaCarrinho({
  cart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onClearCart,
}) {
  const navigate = useNavigate();
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState("");
  const [etapaPagamento, setEtapaPagamento] = useState("selecao");

  // Estados para dados de pagamento
  const [dadosCartao, setDadosCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });
  const [dadosBoleto, setDadosBoleto] = useState(null);
  const [dadosPix, setDadosPix] = useState(null);

  // Cupons fictícios
  const CUPONS = {
    BEMVINDO10: 10,
    BLACKFRIDA: 20,
    FRETEGRATIS: 0,
    NATAL25: 25,
    PRIMAVERA: 15,
  };

  // Calcula o subtotal com quantidades
  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.preco) * (item.quantidade || 1),
    0,
  );

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

  const handleRemove = (index, nome) => {
    Swal.fire({
      title: "Tem certeza?",
      text: `Remover ${nome} do carrinho?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, remover",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        onRemoveFromCart(index);
        Swal.fire({
          title: "Removido!",
          text: "Item removido do carrinho.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
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
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (CUPONS[cupomUpper]) {
      setCupomAplicado(cupomUpper);
      Swal.fire({
        title: "Cupom aplicado!",
        text: `${CUPONS[cupomUpper]}% de desconto!`,
        icon: "success",
        confirmButtonColor: "#000",
        timer: 2000,
        showConfirmButton: false,
      });
      setCupom("");
    } else {
      Swal.fire({
        title: "Cupom inválido!",
        text: "Este cupom não existe ou expirou.",
        icon: "error",
        confirmButtonColor: "#000",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleRemoverCupom = () => {
    setCupomAplicado("");
    Swal.fire({
      title: "Cupom removido!",
      text: "O cupom foi removido com sucesso.",
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
    });
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
      parcelas: parcelas, // BOLETO TAMBÉM PARCELADO (só pra crédito e boleto)
      valorParcela: valorParcela.toFixed(2),
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

  const handleProcessarPagamentoCartao = (tipoCartao) => {
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
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (dadosCartao.numero.replace(/\s/g, "").length < 16) {
      Swal.fire({
        title: "Número inválido",
        text: "Digite um número de cartão válido.",
        icon: "error",
        confirmButtonColor: "#000",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setEtapaPagamento("processando");

    setTimeout(() => {
      setEtapaPagamento("confirmado");
      finalizarCompra(tipoCartao);
    }, 2000);
  };

  const finalizarCompra = (tipoPagamento = metodoPagamento) => {
    Swal.fire({
      title: "Compra confirmada!",
      html: `
        <div class="text-left text-sm">
          <p class="mb-2 font-semibold">Pedido realizado com sucesso!</p>
          <p class="mb-2">Pagamento: <strong>${tipoPagamento}</strong></p>
          ${parcelas > 1 && (tipoPagamento === "Cartão de Crédito" || tipoPagamento === "Boleto") ? `<p class="mb-2">${parcelas}x de R$ ${valorParcela.toFixed(2)}</p>` : '<p class="mb-2">Pagamento à vista</p>'}
          ${cupomAplicado ? `<p class="mb-2 text-green-600">Desconto: -R$ ${descontoCupom.toFixed(2)}</p>` : ""}
          ${tipoPagamento === "Pix" ? `<p class="mb-2 text-green-600">Desconto Pix: -R$ ${descontoPix.toFixed(2)}</p>` : ""}
          <p class="mb-2 text-lg font-bold">Total: R$ ${totalCarrinho.toFixed(2)}</p>
          <p class="text-xs text-gray-600 mt-4">Obrigado por comprar conosco!</p>
        </div>
      `,
      icon: "success",
      confirmButtonColor: "#000",
      confirmButtonText: "Continuar comprando",
    }).then(() => {
      onClearCart();
      resetarEstado();
      navigate("/");
    });
  };

  const resetarEstado = () => {
    setMetodoPagamento("");
    setParcelas(1);
    setCupom("");
    setCupomAplicado("");
    setDadosCartao({ numero: "", nome: "", validade: "", cvv: "" });
    setDadosBoleto(null);
    setDadosPix(null);
    setEtapaPagamento("selecao");
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

  // Verifica se pode parcelar (só Crédito e Boleto)
  const podeParcelar = () => {
    return (
      metodoPagamento === "Cartão de Crédito" || metodoPagamento === "Boleto"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Carrinho de Compras
          {cart.length > 0 && (
            <span className="text-base font-normal text-gray-500 ml-3">
              ({cart.length} {cart.length === 1 ? "item" : "itens"})
            </span>
          )}
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna da esquerda - Produtos */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Produtos</h2>
                <ul className="space-y-4">
                  {cart.map((item, index) => {
                    const quantidade = item.quantidade || 1;
                    const subtotalItem = Number(item.preco) * quantidade;

                    return (
                      <li key={index} className="border-b pb-4 last:border-b-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-800">
                              {item.nome}
                            </h3>
                            {(item.corSelecionada ||
                              item.tamanhoSelecionado) && (
                              <div className="text-sm text-gray-500 mt-1">
                                {item.corSelecionada && (
                                  <span className="mr-3">
                                    Cor: {item.corSelecionada}
                                  </span>
                                )}
                                {item.tamanhoSelecionado && (
                                  <span>
                                    Tamanho: {item.tamanhoSelecionado}
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="text-green-600 font-semibold mt-1">
                              R$ {Number(item.preco).toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onDecreaseQuantity(index)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg font-bold transition"
                                disabled={quantidade <= 1}
                              >
                                -
                              </button>
                              <span className="w-10 text-center font-medium">
                                {quantidade}
                              </span>
                              <button
                                onClick={() => onIncreaseQuantity(index)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full text-lg font-bold transition"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-gray-500">Subtotal:</p>
                              <p className="font-semibold">
                                R$ {subtotalItem.toFixed(2)}
                              </p>
                            </div>

                            <button
                              onClick={() => handleRemove(index, item.nome)}
                              className="text-red-500 hover:text-red-700 p-2"
                              title="Remover item"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Limpar carrinho?",
                        text: "Todos os itens serão removidos.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#6b7280",
                        confirmButtonText: "Sim, limpar",
                        cancelButtonText: "Cancelar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          onClearCart();
                          Swal.fire({
                            title: "Limpo!",
                            text: "Carrinho esvaziado.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                          });
                        }
                      });
                    }}
                    className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Limpar carrinho
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna da direita - Resumo e pagamento */}
            <div className="lg:col-span-1 space-y-4">
              {/* Resumo do pedido */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h2 className="text-lg font-semibold mb-4">Resumo do pedido</h2>
                <div className="space-y-3">
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

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        R$ {totalCarrinho.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cupom de desconto */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="font-medium mb-3">Cupom de desconto</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value.toUpperCase())}
                    placeholder="Digite seu cupom"
                    className="flex-1 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!!cupomAplicado}
                  />
                  <button
                    onClick={handleAplicarCupom}
                    disabled={!!cupomAplicado}
                    className={`px-4 py-2 text-sm rounded-lg font-semibold transition whitespace-nowrap ${
                      cupomAplicado
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {cupomAplicado ? "Aplicado" : "Aplicar"}
                  </button>
                </div>

                {cupomAplicado && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 p-2 rounded-lg">
                    <span className="text-xs sm:text-sm text-green-700">
                      Cupom {cupomAplicado} aplicado!
                    </span>
                    <button
                      onClick={handleRemoverCupom}
                      className="text-xs text-red-600 hover:text-red-800 font-medium"
                    >
                      Remover
                    </button>
                  </div>
                )}

                <div className="mt-2 text-xs text-gray-500">
                  Cupons: BEMVINDO10, BLACKFRIDA, NATAL25, PRIMAVERA
                </div>
              </div>

              {/* Métodos de pagamento */}
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                <h3 className="font-medium mb-3">Forma de pagamento</h3>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Cartão de Crédito",
                    "Cartão de Débito",
                    "Pix",
                    "Boleto",
                  ].map((metodo) => (
                    <button
                      key={metodo}
                      onClick={() => {
                        setMetodoPagamento(metodo);
                        setEtapaPagamento("selecao");
                        setParcelas(1); // Reseta parcelas ao mudar método
                        setDadosCartao({
                          numero: "",
                          nome: "",
                          validade: "",
                          cvv: "",
                        });
                      }}
                      className={`p-2 text-sm border rounded-lg transition ${
                        metodoPagamento === metodo
                          ? "border-black bg-gray-50 font-medium"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {metodo}
                    </button>
                  ))}
                </div>

                {/* SELETOR DE PARCELAS - SÓ PARA CRÉDITO E BOLETO */}
                {metodoPagamento &&
                  podeParcelar() &&
                  etapaPagamento === "selecao" && (
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium">
                        Número de parcelas:
                      </label>
                      <select
                        value={parcelas}
                        onChange={(e) => setParcelas(Number(e.target.value))}
                        className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                          <option key={num} value={num}>
                            {num}x de R$ {(totalCarrinho / num).toFixed(2)}
                            {num === 1 ? " (à vista)" : " sem juros"}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                {/* Formulários de pagamento */}
                {metodoPagamento && (
                  <div className="mt-4 pt-4 border-t">
                    {/* Cartão de Crédito e Débito */}
                    {(metodoPagamento === "Cartão de Crédito" ||
                      metodoPagamento === "Cartão de Débito") &&
                      etapaPagamento === "selecao" && (
                        <div className="space-y-3">
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
                            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                              className="p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                              className="p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              maxLength="3"
                            />
                          </div>
                          <button
                            onClick={() =>
                              handleProcessarPagamentoCartao(metodoPagamento)
                            }
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition"
                          >
                            {metodoPagamento === "Cartão de Crédito" &&
                            parcelas > 1
                              ? `Pagar ${parcelas}x de R$ ${valorParcela.toFixed(2)}`
                              : "Pagar"}
                          </button>
                        </div>
                      )}

                    {/* Pix - SEM PARCELAS */}
                    {metodoPagamento === "Pix" &&
                      etapaPagamento === "selecao" && (
                        <div className="text-center">
                          <p className="text-sm text-green-600 font-medium mb-3">
                            Ganhe 5% de desconto!
                          </p>
                          <button
                            onClick={handleGerarPix}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition"
                          >
                            Gerar código Pix
                          </button>
                        </div>
                      )}

                    {metodoPagamento === "Pix" && dadosPix && (
                      <div className="text-center">
                        <div className="mb-4">
                          <img
                            src={dadosPix.qrCode}
                            alt="QR Code Pix"
                            className="w-48 h-48 mx-auto border rounded-lg p-2"
                          />
                        </div>
                        <p className="text-xs bg-gray-50 p-2 rounded border mb-2 break-all font-mono">
                          {dadosPix.codigo}
                        </p>
                        <p className="text-xs text-gray-500 mb-3">
                          Código válido por {dadosPix.expiracao}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(dadosPix.codigo)
                            }
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition"
                          >
                            Copiar
                          </button>
                          <button
                            onClick={() => finalizarCompra("Pix")}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                          >
                            Já paguei
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Boleto - AGORA COM PARCELAS (só aqui e no crédito) */}
                    {metodoPagamento === "Boleto" &&
                      etapaPagamento === "selecao" && (
                        <div>
                          <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded-lg mb-3">
                            {parcelas > 1
                              ? `Boleto parcelado em ${parcelas}x de R$ ${valorParcela.toFixed(2)}`
                              : "Boleto à vista"}
                          </p>
                          <button
                            onClick={handleGerarBoleto}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition"
                          >
                            {parcelas > 1
                              ? `Gerar boleto - ${parcelas}x`
                              : "Gerar boleto"}
                          </button>
                        </div>
                      )}

                    {metodoPagamento === "Boleto" && dadosBoleto && (
                      <div>
                        <div className="mb-2">
                          <p className="text-sm font-medium">
                            {dadosBoleto.parcelas > 1
                              ? `${dadosBoleto.parcelas}x de R$ ${dadosBoleto.valorParcela}`
                              : "Boleto à vista"}
                          </p>
                        </div>
                        <p className="text-sm font-medium mb-2">
                          Boleto gerado:
                        </p>
                        <p className="text-xs bg-gray-50 p-2 rounded border mb-2 font-mono break-all">
                          {dadosBoleto.codigo}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          Vencimento: {dadosBoleto.vencimento}
                        </p>
                        <p className="text-xs text-gray-600 mb-3">
                          Valor total: R$ {dadosBoleto.valor}
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(dadosBoleto.codigo)
                            }
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition"
                          >
                            Copiar
                          </button>
                          <button
                            onClick={() => finalizarCompra("Boleto")}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition"
                          >
                            Já paguei
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Loading */}
                    {etapaPagamento === "processando" && (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
                        <p className="text-sm text-gray-600">
                          Processando pagamento...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="text-gray-500 text-lg mb-4">
              Seu carrinho está vazio
            </p>
            <button
              onClick={() => navigate("/")}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg text-sm sm:text-base transition"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
