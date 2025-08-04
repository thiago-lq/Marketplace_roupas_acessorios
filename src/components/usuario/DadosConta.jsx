export default function DadosConta({
  salvarDados,
  nome,
  setNome,
  email,
  telefone,
  setTelefone,
  cpf,
  setCpf,
  rua,
  setRua,
  numero,
  setNumero,
  cidade,
  setCidade,
  estado,
  setEstado,
  pais,
  setPais,
  cep,
  setCep,
}) {
  return (
    <form
      className="grid grid-cols-2 gap-4 max-w-lg mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        salvarDados();
      }}
    >
      <label>
        Nome Completo
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        E-mail (não editável)
        <input
          type="email"
          value={email}
          readOnly
          className="border p-2 w-full bg-gray-100"
        />
      </label>

      <label>
        CPF
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Telefone
        <input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Rua
        <input
          type="text"
          value={rua}
          onChange={(e) => setRua(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Número
        <input
          type="text"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Cidade
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        Estado
        <input
          type="text"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        País
        <input
          type="text"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <label>
        CEP
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className="border p-2 w-full"
        />
      </label>
      
      <button
        type="submit"
        className="col-span-2 bg-black text-white p-3 rounded hover:bg-gray-800"
      >
        Salvar
      </button>
    </form>
  );
}
