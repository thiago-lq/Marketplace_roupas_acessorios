// PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children, adminOnly = false }) {
  const { user, cargo, loading } = useAuth();

  if (loading) {
    return <p className="text-center mt-20">Carregando...</p>;
  }

  if (!user) return <Navigate replace to="/" />;

  if (adminOnly && cargo !== "admin") return <Navigate replace to="/" />;

  return children;
}
