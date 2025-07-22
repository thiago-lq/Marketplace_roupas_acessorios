import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth, providerGoogle } from "../firebase/configs";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import { createUserWithEmailAndPassword } from "firebase/auth";


function Login({ visivel, onClose }) {
  const { user, loading } = useAuth();
  const [ email, setEmail] = useState("");
  const [ senha, setSenha] = useState("");
  const [modoCriarConta, setModoCriarConta] = useState(false);

  useEffect(() => {
    if (visivel && !user) {
      // limpa os campos sempre que o formulário for aberto e o usuário não estiver logado
      setEmail("");
      setSenha("");
      setModoCriarConta(false); // opcional, reseta o modo também
    }
  }, [visivel, user]);

  async function enviarFormulario(e) {
    e.preventDefault();
    try{
      if (modoCriarConta) {
        await createUserWithEmailAndPassword(auth, email, senha);
      } else {
        await signInWithEmailAndPassword(auth, email, senha);
      }
      onClose();
      resetarFormularioLogin();
    } catch (err) {
      console.error("Erro:", err.message);
    }
  }

  async function logarGoogle() {
    try {
      await signInWithPopup(auth, providerGoogle);
      onClose(); // fecha a janela se quiser
    } catch (err) {
      console.error("Erro ao logar:", err);
    }
  }

  function deslogar() {
    signOut(auth).then(() => {
      onClose();
    });
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

  if (!user && visivel) {
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4">
          <div className="flex justify-between">
            <img src={logo} alt="Logo" className="max-h-[3rem] w-auto mb-5" />
            <button
            onClick={onClose}
            className=" text-red-500 text-sm hover:bg-red-500 hover:text-white rounded-2xl px-1 h-max"
          >
            X
          </button>
          </div>
          <h1 className="text-2xl font-bold mb-4">Fazer login ou criar uma conta</h1>
          <p className="text-sm my-4">Aproveite acesso exclusivo a produtos, experiências, ofertas e mais.</p>
          <div className="flex flex-wrap justify-between gap-5">
            <div className="border border-black hover:opacity-60">
              <button
              onClick={logarGoogle}
              className="p-2">
                <img src={google} alt="google" className="max-h-[2rem]"></img>
              </button>
            </div>
            <form onSubmit={enviarFormulario}
                  className="space-y-6">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Endereço de e-maill *"
                  className="w-full p-3 border border-black rounded-lg"
                  required
                />
                <input type="password"
                       value={senha}
                       onChange={(e) => setSenha(e.target.value)}
                       placeholder="Senha *"
                       className="w-full p-3 border border-black rounded-lg"
                       required
                />
                <button type="submit"
                        className="bg-black text-white py-2 rounded-lg w-full hover:bg-gray-800">
                  {modoCriarConta ? "Criar Conta" : "Entrar"}
                </button>
                <p onClick={() => setModoCriarConta(!modoCriarConta)}
                   className="text-sm text-blue-600 hover:underline cursor-pointer w-max">
                  {modoCriarConta ? "Já tem conta? Faça Login" : "Não tem conta? Criar uma"}
                </p>
              </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="fixed top-[4.5rem] right-0 w-80 max-h-[210vh] bg-white border border-gray-300 shadow-2xl rounded-xl z-50 p-4">
        <div className="flex justify-between items-center py-3 mr-5">
          <button
            onClick={onClose}
            className="text-red-500 text-sm fixed top-[4.8rem] right-1 hover:text-white font-semibold hover:bg-red-500 rounded-3xl w-4 h-max"
          >
            X
          </button>
          <Link to="/PerfilAdm">
            <button
              className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1"
              onClick={onClose}
            >
              Ir para o seu perfil
            </button>
          </Link>
          <button className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1">
            Ver carrinho
          </button>
          <button
            className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1"
            onClick={deslogar}
          >
            Desconectar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
