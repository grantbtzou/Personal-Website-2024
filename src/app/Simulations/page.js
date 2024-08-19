import Image from "next/image"
import Simulation from "@/app/components/simulation"

export default function Page(){
    return(
        <main>
            <div>
                <h1 className="text-7xl font-light text-center mt-20">Simulations</h1>
                <div className="flex flex-wrap mx-auto mt-12 mb-24 justify-center md:justify-start max-w-5xl">
                    <div><Simulation
                    Path="Simulations/MontyHall" 
                    ImageUrl="/images/goat.jpg" 
                    Title="Monty Hall Problem"
                    Description="A simulation of the famous Monty Hall Problem"/>
                    </div>
                </div>
            </div>
        </main>
    )
}