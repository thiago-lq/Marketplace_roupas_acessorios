import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/configs.js";
import { useState, useEffect } from "react";

export default function Perfil() {
  const [InputProduto, setInputProduto] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

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
    const formulario = document.getElementById("formulario");
    const produto = serializeForm(formulario);
    console.log("Produto:", produto);
    await addDoc(collection(db, "Produtos"), produto);
  };
  async function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      await deleteDoc(doc(db, "Produtos", id));
    }
  }

  function editarProduto(produto) {
    setProdutoEditando(produto);
    setModalAberto(true);
  }

  async function salvarEdicao(e) {
    e.preventDefault();
    const ref = doc(db, "Produtos", produtoEditando.id);
    const { nome, preco, categoria, imagem } = produtoEditando;

    await updateDoc(ref, {
      nome,
      preco,
      categoria,
      imagem,
    });

    setModalAberto(false);
    setProdutoEditando(null);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={SalvaDB}
        id="formulario"
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Cadastro de Produto
        </h2>

        <input
          type="text"
          name="nome"
          placeholder="Nome do produto"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="number"
          name="preco"
          placeholder="Preço do produto"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="categoria"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
        >
          <option value="" disabled selected>
            Selecione a categoria...
          </option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
        </select>

        <input
          type="url"
          name="imagem"
          placeholder="URL da imagem do produto"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Salvar
        </button>
      </form>
      <div className="p-4 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm uppercase text-gray-600">
            <tr>
              <th className="p-3">Nome</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Categoria</th>
              <th className="p-3">Imagem</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {InputProduto.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{p.nome}</td>
                <td className="p-3">R$ {p.preco}</td>
                <td className="p-3 capitalize">{p.categoria}</td>
                <td className="p-3">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="h-10 w-10 object-cover rounded"
                  />
                </td>
                <td className="p-3 space-x-2">
                  <button
                    className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 text-xs"
                    onClick={() => editarProduto(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700 text-xs"
                    onClick={() => excluirProduto(p.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Editar Produto</h3>
            <form onSubmit={salvarEdicao} className="space-y-4">
              <input
                type="text"
                placeholder="Nome"
                value={produtoEditando.nome}
                onChange={(e) =>
                  setProdutoEditando({
                    ...produtoEditando,
                    nome: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="number"
                placeholder="Preço"
                value={produtoEditando.preco}
                onChange={(e) =>
                  setProdutoEditando({
                    ...produtoEditando,
                    preco: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
              <select
                value={produtoEditando.categoria}
                onChange={(e) =>
                  setProdutoEditando({
                    ...produtoEditando,
                    categoria: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Selecione...</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
              <input
                type="url"
                placeholder="URL da imagem"
                value={produtoEditando.imagem}
                onChange={(e) =>
                  setProdutoEditando({
                    ...produtoEditando,
                    imagem: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
