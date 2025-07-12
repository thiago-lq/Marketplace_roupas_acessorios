import { useEffect, useState } from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";
import PerfilAdm from "./PerfilAdm";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/configs";

function PaginaLogin() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

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
    </div>
  );
}

export default PaginaLogin;
