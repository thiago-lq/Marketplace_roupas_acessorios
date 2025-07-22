import { createContext, useContext, useEffect, useState } from "react";
import { auth, providerGoogle } from "../firebase/configs";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

// Criação do contexto
const AuthContext = createContext();

// Provedor do contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  async function loginGoogle() {
    const result = await signInWithPopup(auth, providerGoogle);
    setUser(result.user);
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loginGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado
export function useAuth() {
  return useContext(AuthContext);
}
