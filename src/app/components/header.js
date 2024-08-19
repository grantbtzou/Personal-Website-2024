import Link from "next/link"

export default function Header(){
    return(
        <div className="flex justify-center md:justify-end mx-8 gap-x-4 md:gap-x-16 text-xl">
            <Link className="w-32 md:w-auto text-center font-bold text-2xl hover:text-gray-500" href="/">Home</Link>
            <Link className="w-32 md:w-auto text-center font-bold text-2xl hover:text-gray-500" href="/Projects">Projects</Link>
            <Link className="w-32 md:w-auto text-center font-bold text-2xl hover:text-gray-500 mr-4" href="/Simulations">Simulations</Link>
        </div>
    )
}