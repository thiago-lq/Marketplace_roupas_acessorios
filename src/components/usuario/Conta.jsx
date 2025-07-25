import { useState } from "react";

export default function Conta () {
    const [tab, setTab] = useState("dados");

    return (
        <div>
            <div className="flex gap-12 border-b pb-2 justify-center">
                <button className={`pb-2 ${tab === "dados" ? "border-b-2 border-black font-bold" : ""}`}
                        onClick={() => setTab("dados")}>
                    Dados pessoais
                </button>
                <button className={`pb-2 ${tab === "enderecos" ? "border-b-2 border-black font-bold" : ""}`}
                        onClick={() => setTab("enderecos")}>
                    Lista de endereços
                </button>
                <button className={`pb-2 ${tab === "preferencias" ? "border-b-2 border-black font-bold" : ""}`}
                        onClick={() => setTab("preferencias")}>
                    Suas preferências
                </button>
                <button className={`pb-2 ${tab === "tamanho" ? "border-b-2 border-black font-bold" : ""}`}
                        onClick={() => setTab("tamanho")}>
                    Perfil de tamanho
                </button>
            </div>

            <div className="mt-6">
                {tab === "dados" && <p>Os dados pessoais vão estar aqui</p>}
                {tab === "enderecos" && <p>Os endereços vão estar aqui</p>}
                {tab === "preferencias" && <p>As preferências vão estar aqui</p>}
                {tab === "tamanho" && <p>Os tamanhos vão estar aqui</p>}
            </div>
        </div>
    );
}