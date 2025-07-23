  import { useState, useEffect } from "react";
  import { signInWithEmailAndPassword, signInWithPopup, signOut, signInWithRedirect, getRedirectResult } from "firebase/auth";
  import { auth, providerGoogle } from "../firebase/configs";
  import { useAuth } from "../contexts/AuthContext";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import FormularioLogin from "../components/FormularioLogin";
  import ModalLogin from "../components/ModalLogin";

  function Login({ visivel, onClose }) {
    const { user, loading } = useAuth();
    const [ email, setEmail ] = useState("");
    const [ senha, setSenha ] = useState("");
    const [ modoCriarConta, setModoCriarConta ] = useState(false);

    // Este limpa o formulário quando o modal abre
    useEffect(() => {
      if (visivel && !user) {
        setEmail("");
        setSenha("");
        setModoCriarConta(false);
      }
    }, [visivel, user]);

    // Este roda uma vez para tratar o redirecionamento do login
    useEffect(() => {
      async function verificarRedirect() {
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          console.log("Usuário redirecionado:", result.user);
        }
      } catch (error) {
        console.error("Erro após redirecionamento:", error);
      }
    }
    verificarRedirect();
  }, []);


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
        if (isPWA()) {
          await signInWithRedirect(auth, providerGoogle);
        } else {
          await signInWithPopup(auth, providerGoogle);
          onClose();
        }
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

    function isPWA() {
      return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
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
        <FormularioLogin
          onClose = {onClose}
          isPWA = {isPWA}
          enviarFormulario = {enviarFormulario} 
          email = {email}
          setEmail = {setEmail}
          senha = {senha}
          setSenha = {setSenha}
          modoCriarConta = {modoCriarConta}
          setModoCriarConta = {setModoCriarConta}
          signInWithRedirect = {signInWithRedirect}
          logarGoogle = {logarGoogle}
          auth = {auth}
          providerGoogle = {providerGoogle}
        />
      )
    }

    return (
      <ModalLogin
        onClose = {onClose}
        deslogar = {deslogar}
      />
    );
  }

  export default Login;
