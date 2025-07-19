import { signOut } from "firebase/auth";
import { auth } from "../firebase/configs";
function Deslogar({ setUser }) {
  function deslogar() {
    signOut(auth).then(() => {
      setUser(null);
    });
  }

  return (
    <button onClick={deslogar} className="mx-4 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition">
      Deslogar
    </button>
  );
}
export default Deslogar;