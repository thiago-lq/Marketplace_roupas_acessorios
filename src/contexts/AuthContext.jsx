import { createContext, useContext, useEffect, useState } from "react";
import { auth, providerGoogle, db } from "../firebase/configs";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

function isPWA() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [cargo, setCargo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRedirectResult() {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUser(result.user);
          const ref = doc(db, "Funcionários", result.user.uid);
          const snap = await getDoc(ref);
          setCargo(snap.exists() ? snap.data().cargo : null);
          setLoading(false);
          return true; // redirect login tratado
        }
      } catch (error) {
        console.error("Erro getRedirectResult:", error);
      }
      return false;
    }

    setLoading(true);

    checkRedirectResult().then((redirectHandled) => {
      if (!redirectHandled) {
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
      }
    });
  }, []);

  async function loginGoogle() {
    if (isPWA()) {
      await signInWithRedirect(auth, providerGoogle);
    } else {
      await signInWithPopup(auth, providerGoogle);
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
