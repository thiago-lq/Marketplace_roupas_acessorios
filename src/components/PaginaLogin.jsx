import { useEffect, useState } from "react";
import PerfilAdm from "../pages/PerfilAdm";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth, providerGoogle } from "../firebase/configs";
import Deslogar from "../components/Deslogar";

function PaginaLogin() {
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

  if(loading) {
    return( 
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading..." className="mx-auto mt-40" />
    </div>
    )}

  if (!user) {
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 ">
          <h1 className="text-2xl font-bold mb-4">Por favor, faça login</h1>
          <button onClick={logarGoogle}
                  className="mb-8 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                    Logar com o Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Deslogar setUser={setUser} />
      <PerfilAdm />
    </div>
  );
}

export default PaginaLogin;
