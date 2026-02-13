import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/configs";
import DadosConta from "./DadosConta";
import Swal from "sweetalert2";

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
        const ref = doc(db, "Usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const dados = snap.data();
          setNome(dados.nome || "");
          setEmail(dados.email || user.email || "");
          setCpf(dados.cpf || "");
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
        email,
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

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Dados salvos com sucesso!",
        confirmButtonColor: "#000",
      });
    } catch (e) {
      console.error("Erro ao salvar dados:", e);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Erro ao salvar dados.",
        confirmButtonColor: "#000",
      });
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
      </div>

      <div className="mt-6">
        {tab === "dados" && (
          <DadosConta
            salvarDados={salvarDados}
            nome={nome}
            setNome={setNome}
            email={email}
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
      </div>
    </div>
  );
}
