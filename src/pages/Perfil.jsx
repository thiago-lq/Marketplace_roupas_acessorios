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
  const [modalAbertoEditar, setModalAbertoEditar] = useState(false);
  const [modalAbertoAdicionar, setModalAbertoAdicionar] = useState(false);
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
    const formulario = document.getElementById("formularioAdicionar");
    const produto = serializeForm(formulario);
    await addDoc(collection(db, "Produtos"), produto);
    setModalAbertoAdicionar(false);
  };

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
    const { nome, preco, categoria, imagem } = produtoEditando;

    await updateDoc(ref, {
      nome,
      preco,
      categoria,
      imagem,
    });

    setModalAbertoEditar(false);
    setProdutoEditando(null);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      {/* Botão para abrir modal de adicionar */}
      <button
        onClick={() => setModalAbertoAdicionar(true)}
        className="mb-8 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition"
      >
        Adicionar Produto
      </button>

      {/* Lista de produtos */}
      <div className="w-full max-w-7xl p-4 bg-white rounded-xl shadow-lg overflow-x-auto">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
          Lista de Produtos
        </h2>
        <table className="min-w-full border-collapse table-auto text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm select-none">
            <tr>
              <th className="p-4 border-b border-gray-300">Nome</th>
              <th className="p-4 border-b border-gray-300">Preço</th>
              <th className="p-4 border-b border-gray-300">Categoria</th>
              <th className="p-4 border-b border-gray-300">Imagem</th>
              <th className="p-4 border-b border-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {InputProduto.map((p) => (
              <tr
                key={p.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                <td className="p-4 align-middle font-medium">{p.nome}</td>
                <td className="p-4 align-middle font-semibold text-green-600">
                  R$ {parseFloat(p.preco).toFixed(2)}
                </td>
                <td className="p-4 align-middle capitalize">{p.categoria}</td>
                <td className="p-4 align-middle">
                  <img
                    src={p.imagem}
                    alt={p.nome}
                    className="h-12 w-12 object-cover rounded-lg border border-gray-200"
                  />
                </td>
                <td className="p-4 align-middle space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                    onClick={() => editarProduto(p)}
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
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

      {/* Modal Adicionar Produto */}
      {modalAbertoAdicionar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Adicionar Produto
            </h3>
            <form
              id="formularioAdicionar"
              onSubmit={SalvaDB}
              className="space-y-6"
            >
              <input
                type="text"
                name="nome"
                placeholder="Nome do produto"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                required
              />
              <input
                type="number"
                name="preco"
                placeholder="Preço do produto"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                min="0"
                step="0.01"
                required
              />
              <select
                name="categoria"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione a categoria...
                </option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
              <input
                type="url"
                name="imagem"
                placeholder="URL da imagem do produto"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                required
              />
              <div className="flex justify-end mt-6 gap-4">
                <button
                  type="button"
                  onClick={() => setModalAbertoAdicionar(false)}
                  className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Editar Produto */}
      {modalAbertoEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 relative">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Editar Produto</h3>
            <form onSubmit={salvarEdicao} className="space-y-6">
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                min="0"
                step="0.01"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
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
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
                required
              />
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setModalAbertoEditar(false)}
                  className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
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
