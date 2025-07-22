import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Lista de emails autorizados como admin
const adminEmails = ["thiagolq100@gmail.com"]; // ← coloque seu email real do Google

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="text-center mt-20">Carregando...</p>;

  if (!user) return <Navigate to="/" />;

  if (adminOnly && !adminEmails.includes(user.email)) {
    return <Navigate to="/" />;
  }

  return children;
}
