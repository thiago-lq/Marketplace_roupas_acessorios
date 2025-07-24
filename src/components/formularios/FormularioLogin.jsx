import logo from "../../assets/logo.png";
import google from "../../assets/google.png";

export default function FormularioLogin({
  onClose,
  enviarFormulario,
  email,
  setEmail,
  senha,
  setSenha,
  modoCriarConta,
  setModoCriarConta,
  logarGoogle,
}) {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4">
        <div className="flex justify-between">
          <img src={logo} alt="Logo" className="max-h-[3rem] w-auto mb-5" />
          <button
            onClick={onClose}
            className=" text-black text-sm hover:bg-black hover:text-white rounded-2xl px-1 h-max cursor-pointer"
          >
            X
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Fazer login ou criar uma conta</h1>
        <p className="text-sm my-4">
          Aproveite acesso exclusivo a produtos, experiências, ofertas e mais.
        </p>
        <div className="flex flex-wrap justify-between gap-5">
          <div className="border border-black hover:opacity-60">
            <button onClick={logarGoogle} className="p-2 cursor-pointer">
              <img src={google} alt="google" className="max-h-[2rem]" />
            </button>
          </div>
          <form onSubmit={enviarFormulario} className="space-y-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Endereço de e-mail *"
              className="w-full p-3 border border-black rounded-lg"
              required
            />
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha *"
              className="w-full p-3 border border-black rounded-lg"
              required
            />
            <button
              type="submit"
              className="bg-black text-white py-2 rounded-lg w-full hover:bg-gray-800 cursor-pointer"
            >
              {modoCriarConta ? "Criar Conta" : "Entrar"}
            </button>
            <p
              onClick={() => setModoCriarConta(!modoCriarConta)}
              className="text-sm text-black hover:underline cursor-pointer w-max"
            >
              {modoCriarConta
                ? "Já tem conta? Faça Login"
                : "Não tem conta? Criar uma"}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
