import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, providerGoogle } from "../firebase/configs";
import { Navigate } from "react-router-dom";

function PaginaLogin({visivel, onClose}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  

  async function logarGoogle() {
        try {
            const result = await signInWithPopup(auth, providerGoogle);
            const user = result.user;
            console.log("Usuário logado:", user);
            setUser(user); // Atualiza o estado do usuário no componente pai
        } catch (err) {
            console.error("Erro ao logar:", err);
        }
    }
  
      function deslogar() {
      signOut(auth).then(() => {
        setUser(null);
        onClose(); // Fecha a janela de login
      });
     }

  if(loading) {
    return( 
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading..." className="mx-auto mt-40" />
    </div>
    )}

    if (!visivel) {
    return null;
  } else if (visivel && !user) {
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 ">
          <h1 className="text-2xl font-bold mb-4">Por favor, faça login</h1>
          <button onClick={logarGoogle}
                  className="mb-8 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                    Logar com o Google
          </button>
          <button onClick={onClose}
                  className="text-red-500 text-sm hover:underline">
            Fechar
        </button>
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
            <button className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1"
                    onClick={onClose}>
              Ir para o seu perfil
            </button>
          </Link>
          <button className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1">
            Ver carrinho
          </button>
          <button className="text-black font-semibold hover:text-white hover:bg-black max-w rounded-md px-1"
            onClick={deslogar}>
            Desconectar
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaginaLogin;
