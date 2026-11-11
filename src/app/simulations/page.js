import Simulation from "@/app/components/Simulation"

export const metadata = {
  title: "Grant Zou | Simulations",
  description: "Probability simulations"
}

export default function Page(){
    return(
        <main>
            <div>
                <h1 className="text-7xl font-light text-center mt-20">Simulations</h1>
                <div className="flex flex-wrap mx-auto mt-12 mb-24 gap-10 justify-center md:justify-start max-w-5xl">
                    <div><Simulation
                    path="simulations/monty-hall" 
                    imageUrl="/static/images/goat.jpg" 
                    title="Monty Hall Problem"
                    description="A simulation of the famous Monty Hall Problem"/>
                    </div>
                    <div><Simulation 
                    path="simulations/graph-game"
                    imageUrl="/static/images/TensorFlow_logo.svg.png"
                    title="AI Graph Game"
                    description="Play a game against an AI which adapts to your playstyle. Under development"
                    />
                    </div>
                </div>
            </div>
        </main>
    )
}