import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/configs";
import { useEffect, useState } from "react";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [verificando, setVerificando] = useState(true);

  useEffect(() => {
  async function verificarAdmin() {
    console.log("Iniciando verificação de admin...");

    if (!adminOnly || !user) {
      console.log("Não é rota de admin ou usuário não está logado.");
      setVerificando(false);
      return;
    }

    console.log("Buscando dados do usuário no Firestore...");
    const ref = doc(db, "Usuários", user.uid);
    try {
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const dados = snap.data();
        console.log("Dados do usuário:", dados);
        setIsAdmin(dados.cargo === "admin");
      } else {
        console.warn("Documento do usuário não encontrado no Firestore.");
        setIsAdmin(false);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setIsAdmin(false);
    }

    setVerificando(false);
  }

  verificarAdmin();
}, [user, adminOnly]);

  if (loading || verificando) {
    return <p className="text-center mt-20">Carregando...</p>;
  }

  if (!user) return <Navigate to="/" />;

  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return children;
}
