import Cupons from "./Cupons";

export default function Feed() {
    
    return (
        <div className="flex flex-col justify-between">
            <div className="flex flex-col py-3">
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-black via-white to-gray-500 
               bg-clip-text text-transparent">Seus cupons</h1>
                <div className="overflow-x-auto snap-x snap-mandatory py-6 mx-auto w-[1200px] max-w-full">
                    <div className="flex gap-15 w-max">
                        <Cupons/>
                        <Cupons/>
                        <Cupons/>
                        <Cupons/>
                        <Cupons/>
                        <Cupons/>
                        <Cupons/>
                        <Cupons/>
                    </div>
                </div>
            </div>
        </div>
    );
}