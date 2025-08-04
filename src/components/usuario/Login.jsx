import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/configs";
import { useAuth } from "../../contexts/AuthContext";
import FormularioLogin from "../formularios";
import { ModalLogin } from "../modais";
import Swal from "sweetalert2";

export default function Login({ visivel, onClose }) {
  const { user, loading, loginGoogle, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [modoCriarConta, setModoCriarConta] = useState(false);

  // Limpa formulário sempre que o modal abre
  useEffect(() => {
    if (visivel && !user) {
      setEmail("");
      setSenha("");
      setModoCriarConta(false);
    }
  }, [visivel, user]);

  async function enviarFormulario(e) {
    e.preventDefault();
    try {
      if (modoCriarConta) {
        await createUserWithEmailAndPassword(auth, email, senha);
      } else {
        await signInWithEmailAndPassword(auth, email, senha);
      }
      onClose();
      resetarFormularioLogin();
    } catch (err) {
      console.error("Erro:", err.message);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: err.message || "Erro ao tentar realizar a operação.",
      });
    }
  }

  function resetarFormularioLogin() {
    setEmail("");
    setSenha("");
  }

  if (loading) {
    return (
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="Loading..."
          className="mx-auto mt-40"
        />
      </div>
    );
  }

  if (!visivel) return null;

  if (!user) {
    return (
      <FormularioLogin
        onClose={onClose}
        enviarFormulario={enviarFormulario}
        email={email}
        setEmail={setEmail}
        senha={senha}
        setSenha={setSenha}
        modoCriarConta={modoCriarConta}
        setModoCriarConta={setModoCriarConta}
        logarGoogle={loginGoogle}
      />
    );
  }

  return <ModalLogin onClose={onClose} deslogar={logout} />;
}
