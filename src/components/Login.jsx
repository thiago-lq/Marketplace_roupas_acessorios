import { auth, providerGoogle } from "../firebase/configs";
import { signInWithPopup } from "firebase/auth";
import { Link } from "react-router-dom";
export default function Login({setUser}) {
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

    return (
        <div>
           
                <button onClick={logarGoogle}
                    className="mb-8 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition">
                Logar com o Google
                </button>
          
        </div>
    );
}