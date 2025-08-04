import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/configs";
import DadosConta from "./DadosConta";

export default function Conta() {
  const [tab, setTab] = useState("dados");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [pais, setPais] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    async function carregarDados() {
      if (!user) return;

      try {
        const ref = doc(db, "Usuarios", user.uid); // nome da coleção sem acento
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const dados = snap.data();
          setNome(dados.nome || "");
          setEmail(dados.email || user.email || "");
          setCpf(dados.cpf || "")
          setTelefone(dados.telefone || "");
          setRua(dados.endereco?.rua || "");
          setNumero(dados.endereco?.numero || "");
          setCidade(dados.endereco?.cidade || "");
          setEstado(dados.endereco?.estado || "");
          setPais(dados.endereco?.pais || "");
          setCep(dados.endereco?.cep || "");
        } else {
          setNome(user.displayName || "");
          setEmail(user.email || "");
        }
      } catch (e) {
        console.error("Erro ao carregar dados do usuário", e);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, [user]);

  async function salvarDados() {
    if (!user) return;
    try {
      await setDoc(doc(db, "Usuarios", user.uid), {
        nome,
        email, // email vem do Auth e não deve ser alterado
        cpf,
        telefone,
        endereco: {
          rua,
          numero,
          cidade,
          estado,
          pais,
          cep,
        },
        atualizadoEm: new Date(),
      });
      alert("Dados salvos com sucesso!");
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
      alert("Erro ao salvar dados.");
    }
  }

  if (loading) return <p>Carregando dados...</p>;

  return (
    <div>
      <div className="flex gap-12 border-b pb-2 justify-center">
        <button
          className={`pb-2 ${
            tab === "dados" ? "border-b-2 border-black font-bold" : ""
          }`}
          onClick={() => setTab("dados")}
        >
          Dados pessoais
        </button>
        <button
          className={`pb-2 ${
            tab === "preferencias" ? "border-b-2 border-black font-bold" : ""
          }`}
          onClick={() => setTab("preferencias")}
        >
          Suas preferências
        </button>
        <button
          className={`pb-2 ${
            tab === "tamanho" ? "border-b-2 border-black font-bold" : ""
          }`}
          onClick={() => setTab("tamanho")}
        >
          Perfil de tamanho
        </button>
      </div>

      <div className="mt-6">
        {tab === "dados" && (
          <DadosConta
            salvarDados={salvarDados}
            nome={nome}
            setNome={setNome}
            email={email} // email só para exibir
            telefone={telefone}
            setTelefone={setTelefone}
            cpf={cpf}
            setCpf={setCpf}
            rua={rua}
            setRua={setRua}
            numero={numero}
            setNumero={setNumero}
            cidade={cidade}
            setCidade={setCidade}
            estado={estado}
            setEstado={setEstado}
            pais={pais}
            setPais={setPais}
            cep={cep}
            setCep={setCep}
          />
        )}
        {tab === "preferencias" && <p>As preferências vão estar aqui</p>}
        {tab === "tamanho" && <p>Os tamanhos vão estar aqui</p>}
      </div>
    </div>
  );
}
