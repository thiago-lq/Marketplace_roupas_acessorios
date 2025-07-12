import { useEffect, useState } from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";
import PerfilAdm from "./PerfilAdm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/configs";
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

  if(loading) {
    return( 
    <div>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading..." className="mx-auto mt-40" />
    </div>
    )}

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Por favor, faça login</h1>
        <Login setUser={setUser} />
      </div>
    );
  }

  return (
    <div>
      <PerfilAdm />
      <Deslogar setUser={setUser} />
    </div>
  );
}

export default PaginaLogin;
