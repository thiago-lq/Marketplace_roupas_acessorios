import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/configs.js";
import { useState, useEffect, useMemo } from "react";
import { ModalAdicionarProduto, ModalEditarProduto } from "../components/modais";
import { ProdutoTable } from "../components/produtos";

export default function PerfilAdm() {
  const [InputProduto, setInputProduto] = useState([]);
  const [modalAbertoEditar, setModalAbertoEditar] = useState(false);
  const [modalAbertoAdicionar, setModalAbertoAdicionar] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [exibicao, setExibicao] = useState("");
  const [quantidadeCampos, setQuantidadeCampos] = useState(1);
  const maxCampos = 5
  const minCampos = 1
  
  const adicionarCampo = () => {
    if (quantidadeCampos < maxCampos) {
      setQuantidadeCampos(quantidadeCampos + 1);
    }
  };

  const removerCampo = () => {
    if (quantidadeCampos > minCampos) {
      setQuantidadeCampos(quantidadeCampos - 1)
    }
  }

  const subcategoriasPorGenero = useMemo(
    () => ({
      feminino: [
        { value: "blusas_camisetas", label: "Blusas & Camisetas" },
        { value: "vestidos_saias", label: "Vestidos & Saias" },
        { value: "acessorios", label: "Acessórios" },
        { value: "calcas_leggings", label: "Calças & Leggings" },
        { value: "casacos_jaquetas", label: "Casacos & Jaquetas" },
        { value: "calcados", label: "Calçados" },
      ],
      masculino: [
        { value: "camisetas_regatas", label: "Camisetas & Regatas" },
        { value: "camisas_sociais_polo", label: "Camisas Sociais & Polo" },
        { value: "acessorios", label: "Acessórios" },
        { value: "calcas_bermudas", label: "Calças & Bermudas" },
        { value: "jaquetas_moletons", label: "Jaquetas & Moletons" },
        { value: "calcados", label: "Calçados" },
      ],
    }),
    []
  );

  const exibicaoPorGenero = useMemo(
    () => ({
      feminino: [
        { value: "produtos_destaque", label: "Produtos em Destaque" },
        { value: "feminino", label: "Exibir em Feminino" },
        { value: "lancamentos", label: "Lançamentos" },
        { value: "null", label: "Nenhum"},
      ],
      masculino: [
        { value: "produtos_destaque", label: "Produtos em Destaque" },
        { value: "masculino", label: "Exibir em Masculino" },
        { value: "lancamentos", label: "Lançamentos" },
        { value: "null", label: "Nenhum"},
      ],
    }),
    []
  );

  useEffect(() => {
    const q = collection(db, "Produtos");
    const unsub = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInputProduto(lista);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (
      modalAbertoEditar &&
      produtoEditando.nome &&
      produtoEditando.preco &&
      produtoEditando.categoria &&
      produtoEditando.subcategoria &&
      produtoEditando.imagem &&
      produtoEditando.imagensExtras &&
      produtoEditando.exibicao
    ) {
      const categoriaValida = produtoEditando.categoria.toLowerCase();
      const subcategorias = subcategoriasPorGenero[categoriaValida] || [];

      const subValida = subcategorias.find(
        (sub) => sub.value === produtoEditando.subcategoria
      );

      if (!subValida) {
        setProdutoEditando((prev) => ({
          ...prev,
          subcategoria: "",
        }));
      }
    }
  }, [modalAbertoEditar, produtoEditando, subcategoriasPorGenero]);

  function serializeForm(formElement) {
    const formData = new FormData(formElement);
    const data = {};

    for (const [key, value] of formData.entries()) {
      if (data.hasOwnProperty(key)) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    }

    return data;
  }

  const SalvaDB = async (e) => {
    e.preventDefault();
    const formulario = document.getElementById("formularioAdicionar");
    const produto = serializeForm(formulario);
    const { nome, preco, categoria, subcategoria, imagem, imagensExtras, exibicao } = produto;
    if (
      !nome ||
      !preco ||
      !categoria ||
      !subcategoria ||
      !imagem ||
      !exibicao
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    if (!imagensExtras || imagensExtras.length === 0) {
        alert("Por favor, preencha todos os campos.");
      }
    await addDoc(collection(db, "Produtos"), produto);
    setModalAbertoAdicionar(false);
  };

  function resetarFormularioAdicionar() {
    setCategoriaSelecionada("");
    setExibicao("");
    const form = document.getElementById("formularioAdicionar");
    if (form) form.reset();
  }

  async function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteDoc(doc(db, "Produtos", id));
    }
  }

  function editarProduto(produto) {
    setProdutoEditando(produto);
    setModalAbertoEditar(true);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    const ref = doc(db, "Produtos", produtoEditando.id);
    const { nome, preco, categoria, subcategoria, imagem, imagensExtras, exibicao } =
      produtoEditando;
    if (
      !nome ||
      !preco ||
      !categoria ||
      !subcategoria ||
      !imagem ||
      !exibicao
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (!imagensExtras || imagensExtras.length === 0) {
        alert("Por favor, preencha todos os campos.");
      }

    await updateDoc(ref, {
      nome,
      preco,
      categoria,
      subcategoria,
      imagem,
      imagensExtras,
      exibicao,
    });

    setModalAbertoEditar(false);
    setProdutoEditando(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Lista de produtos */}
      <ProdutoTable
        produtos={InputProduto}
        onEditar={editarProduto}
        onExcluir={excluirProduto}
        subcategoriasPorGenero={subcategoriasPorGenero}
        categoriaSelecionada={categoriaSelecionada}
        exibicaoPorGenero={exibicaoPorGenero}
        setModalAbertoAdicionar={setModalAbertoAdicionar}
        resetarFormularioAdicionar={resetarFormularioAdicionar}
      />

      {/* Modal Adicionar Produto */}
      <ModalAdicionarProduto
        aberto={modalAbertoAdicionar}
        aoFechar={() => setModalAbertoAdicionar(false)}
        aoSalvar={SalvaDB}
        categoriaSelecionada={categoriaSelecionada}
        setCategoriaSelecionada={setCategoriaSelecionada}
        exibicao={exibicao}
        setExibicao={setExibicao}
        subcategoriasPorGenero={subcategoriasPorGenero}
        exibicaoPorGenero={exibicaoPorGenero}
        resetarFormulario={resetarFormularioAdicionar}
        quantidadeCampos={quantidadeCampos}
        maxCampos={maxCampos}
        adicionarCampo={adicionarCampo}
        removerCampo={removerCampo}
        minCampos={minCampos}
      />

      {/* Modal Editar Produto */}
      <ModalEditarProduto
        aberto={modalAbertoEditar}
        aoFechar={() => setModalAbertoEditar(false)}
        aoSalvar={salvarEdicao}
        produtoEditando={produtoEditando}
        setProdutoEditando={setProdutoEditando}
        subcategoriasPorGenero={subcategoriasPorGenero}
        exibicaoPorGenero={exibicaoPorGenero}
      />
    </div>
  );
}
