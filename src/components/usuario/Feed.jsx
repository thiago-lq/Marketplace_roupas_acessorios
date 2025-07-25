import Cupons from "./Cupons";

export default function Feed() {
    
    return (
        <div className="flex flex-col justify-between gap-15">
            <div className="flex flex-col py-3">
                <h1 className="text-2xl font-semibold text-black">Seus cupons</h1>
                <div className="overflow-x-auto snap-x snap-mandatory py-6 mx-auto w-[800px] max-w-full">
                    <div className="flex gap-15 w-max">
                        <Cupons/>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap">
            <h1 className="text-2xl text-black font-semibold">Produtos recomendados</h1>
            </div>
            <div className="flex flex-col">
            <h1 className="text-black text-2xl font-semibold">Extras</h1>
            </div>
        </div>
    );
}