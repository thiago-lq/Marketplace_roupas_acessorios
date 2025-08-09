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
import Swal from "sweetalert2";

export default function PerfilAdm() {
  const [InputProduto, setInputProduto] = useState([]);
  const [modalAbertoEditar, setModalAbertoEditar] = useState(false);
  const [modalAbertoAdicionar, setModalAbertoAdicionar] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [exibicao, setExibicao] = useState("");
  const [quantidadeCampos, setQuantidadeCampos] = useState(1);
  const maxCampos = 7;
  const minCampos = 1;

  const adicionarCampo = () => {
    if (quantidadeCampos < maxCampos) {
      setQuantidadeCampos(quantidadeCampos + 1);
    }
  };

  const removerCampo = () => {
    if (quantidadeCampos > minCampos) {
      setQuantidadeCampos(quantidadeCampos - 1);
    }
  };

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
        { value: "null", label: "Nenhum" },
      ],
      masculino: [
        { value: "produtos_destaque", label: "Produtos em Destaque" },
        { value: "masculino", label: "Exibir em Masculino" },
        { value: "lancamentos", label: "Lançamentos" },
        { value: "null", label: "Nenhum" },
      ],
    }),
    []
  );

  const coresDisponiveis = [
    "Preto", "Branco", "Cinza", "Azul", "Vermelho",
    "Verde", "Amarelo", "Laranja", "Marrom", "Bege",
    "Roxo", "Rosa", "Prata", "Dourado", "Única"
  ];

  const tamanhosDisponiveis = [
    "PP", "P", "M", "G", "GG", "XG",
    "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "Único"
  ];

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
      produtoEditando?.nome &&
      produtoEditando?.preco &&
      produtoEditando?.categoria &&
      produtoEditando?.subcategoria &&
      produtoEditando?.imagem &&
      produtoEditando?.imagensExtras &&
      produtoEditando?.descricao &&
      produtoEditando?.exibicao &&
      produtoEditando?.cores &&
      produtoEditando?.tamanhos
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

    // Garante que cores e tamanhos sejam sempre arrays
    const cores = Array.isArray(produto.cores) ? produto.cores : [produto.cores].filter(Boolean);
    const tamanhos = Array.isArray(produto.tamanhos) ? produto.tamanhos : [produto.tamanhos].filter(Boolean);

    const { nome, preco, categoria, subcategoria, imagem, imagensExtras, exibicao, descricao } = produto;

    // Validação dos campos
    if (
      !nome ||
      !preco ||
      !categoria ||
      !subcategoria ||
      !imagem ||
      !exibicao ||
      !descricao ||
      cores.length === 0 ||
      tamanhos.length === 0
    ) {
      await Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, preencha todos os campos.",
      });
      return;
    }
    if (!imagensExtras || imagensExtras.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, preencha todos os campos.",
      });
      return;
    }

    try {
      await addDoc(collection(db, "Produtos"), {
        ...produto,
        cores,
        tamanhos,
      });

      setModalAbertoAdicionar(false);

      await Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Produto adicionado com sucesso!",
      });
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Falha ao adicionar produto.",
      });
    }
  };

   const [descricao, setDescricao] = useState("");

  function resetarFormularioAdicionar() {
    setCategoriaSelecionada("");
    setExibicao("");
    setDescricao("");
    setQuantidadeCampos(1);
    const form = document.getElementById("formularioAdicionar");
    if (form) form.reset();
  }

  async function excluirProduto(id) {
    const result = await Swal.fire({
      title: "Excluir produto?",
      text: "Tem certeza que deseja excluir este produto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(db, "Produtos", id));
        await Swal.fire({
          icon: "success",
          title: "Excluído!",
          text: "Produto excluído com sucesso.",
        });
      } catch {
        await Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Falha ao excluir produto.",
        });
      }
    }
  }

  function editarProduto(produto) {
    setProdutoEditando(produto);
    setModalAbertoEditar(true);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    const ref = doc(db, "Produtos", produtoEditando.id);
    const cores = Array.isArray(produtoEditando.cores) ? produtoEditando.cores : [produtoEditando.cores].filter(Boolean);
    const tamanhos = Array.isArray(produtoEditando.tamanhos) ? produtoEditando.tamanhos : [produtoEditando.tamanhos].filter(Boolean);
    const { nome, preco, categoria, subcategoria, imagem, imagensExtras, exibicao, descricao } =
      produtoEditando;

    if (
      !nome ||
      !preco ||
      !categoria ||
      !subcategoria ||
      !imagem ||
      !exibicao ||
      !descricao ||
      cores.length === 0 ||
      tamanhos.length === 0
    ) {
      await Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, preencha todos os campos.",
      });
      return;
    }

    if (!imagensExtras || imagensExtras.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, preencha todos os campos.",
      });
      return;
    }

    try {
      await updateDoc(ref, {
        nome,
        preco,
        categoria,
        subcategoria,
        imagem,
        imagensExtras,
        exibicao,
        descricao,
        cores,
        tamanhos,
      });

      setModalAbertoEditar(false);
      setProdutoEditando(null);

      await Swal.fire({
        icon: "success",
        title: "Sucesso",
        text: "Produto atualizado com sucesso!",
      });
    } catch {
      await Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Falha ao atualizar produto.",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
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
        coresDisponiveis={coresDisponiveis}
        tamanhosDisponiveis={tamanhosDisponiveis}
        resetarFormulario={resetarFormularioAdicionar}
        quantidadeCampos={quantidadeCampos}
        maxCampos={maxCampos}
        adicionarCampo={adicionarCampo}
        removerCampo={removerCampo}
        minCampos={minCampos}
        setDescricao={setDescricao}
        descricao={descricao}
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
        coresDisponiveis={coresDisponiveis}
        tamanhosDisponiveis={tamanhosDisponiveis}
        quantidadeCampos={quantidadeCampos}
        maxCampos={maxCampos}
        adicionarCampo={adicionarCampo}
        removerCampo={removerCampo}
        minCampos={minCampos}
      />
    </div>
  );
}
