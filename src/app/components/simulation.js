import Image from "next/image"

export default function Simulation({Path, ImageUrl, Title, Description}){
    return(
        <a href={Path}>
        <div className="flex flex-wrap flex-col bg-slate-200 max-w-72 h-96  rounded-lg overflow-hidden shadow-2xl">
            <div className="flex flex-wrap justify-center w-full border-b-2">
            <Image src={ImageUrl} height={150} width={288}/></div>
            <div className="px-4 mt-4">
            <h1 className="text-3xl text-start">{Title}</h1>
            <p className="text-xl">{Description}</p>
            </div>
        </div></a>
    )
}