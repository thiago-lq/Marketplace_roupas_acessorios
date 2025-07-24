import { createContext, useContext, useEffect, useState } from "react";
import { auth, providerGoogle, db } from "../firebase/configs";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingLoginGoogle, setLoadingLoginGoogle] = useState(false);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const ref = doc(db, "Funcionários", user.uid);
          const snap = await getDoc(ref);
          setCargo(snap.exists() ? snap.data().cargo : null);
          setUser(user);
        } else {
          setUser(null);
          setCargo(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);

  async function loginGoogle() {
    if (loadingLoginGoogle) return; // evita cliques duplos
    setLoadingLoginGoogle(true);
    try {
        await signInWithPopup(auth, providerGoogle);
      } catch (err) {
      console.error("Erro ao logar:", err);
    } finally {
      setLoadingLoginGoogle(false);
    }
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setCargo(null);
  }

  return (
    <AuthContext.Provider value={{ user, cargo, loginGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
