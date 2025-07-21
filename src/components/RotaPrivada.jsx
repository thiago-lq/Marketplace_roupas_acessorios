import { Navigate } from "react-router-dom";

export default function RotaPrivada({ user, children }) {
  if (!user) {
    return <Navigate to="/" replace />
  }

  return children;
}