import MontyHall from "@/app/components/montyHall"
import ManyDoorMontyHall from "@/app/components/manyDoorMontyHall"

export default function Page(){
    return(
    <main>
        <div className="mx-8 md:mx-auto max-w-4xl text-xl">
         <h1 className="text-7xl text-center mt-20">The Monty Hall Problem</h1>
         <p className="mt-12">The first time I remember hearing this problem was when watching <span className="italic">21</span> in 10th grade.
            I didn't understand it initially, but it piqued my interest in statistics right as I was taking AP Statistics, leading me to choose to double major in CS and Statistics. 
         </p>
         <h2 className="text-5xl mt-8">The Problem</h2>
         <p className="mt-2">Imagine you are on a gameshow faced with three doors. Behind one of the doors is a brand new car! Behind the other two are goats. The host asks you to pick a door.
            After selecting your door, the host opens one of the other two doors and reveals a goat. Then he asks you if you would like to stick with your original selection or to switch
            your pick to the remaining door. Should you switch? 
         </p>
         <h2 className="text-5xl mt-8">Intuition</h2>
         <p className="mt-2"> 
            The intuitive result is that it makes no difference whether you switch or not, so most people choose to stay in case the host is tricking them(however, we'll ignore any analysis on 
            how the host might try to trick you and assume that the host always behaves the same way). After all, there are two doors, the probability must be a 50/50, right? 
         </p>
         <p className="mt-2">In reality, switching <span className="font-bold">doubles</span> your chances of winning from 1/3 to 2/3. You can see this by playing the game below with both strategies. 
         The more times you play, the closer your winrates will approach 1/3 and 2/3. </p>
         <div className="flex flex-wrap mt-12 justify-center w-full"><MontyHall /></div>
         <h2 className="text-5xl mt-8">Explanation</h2>
         <p className="mt-2">Despite the host's action having seemingly no impact on your decision, it has actually given you more information. When the host opens a door, you gain the information that the prize
            is not behind that door, allowing you to improve your odds. But how does that information benefit you? And what if the host opened the door before you picked it, wouldn't your chances have to be 50/50 in that situation? 
            What's the difference?
         </p>
         <p className="mt-2">The key is that the host is not going to reveal the door that you have already picked. After all, then you would know for sure whether you want to stay or switch. 
            Since there is a 1/3 chance that you picked the correct door initially, there must also only be a 1/3 chance to win when you stay. 
            This means that the chances of the winning door being behind one of the other two doors must be 2/3. And since one of those two doors is revealed to be losing,
             <span className="italic"> if the winning door was one of the two doors that you did not pick, then it must be the unrevealed door! </span>
            This is why the unrevealed door has a 2/3 chance of being correct.
            If the host opened a door before you made a selection, your chances would be 50/50 to guess the correct door because the host could eliminate either of the two losing doors.
         </p>
         <p className="mt-2">
            To better illustrate the solution, try playing the game with any number of doors from 3 to 100. With 100 doors, there is only a 1% chance that you guess correctly initially. 
            99% of the time the winning door will be on one of the other doors, leaving it as the sole remaining door when all the others are opened. 
         </p>
         <div className="flex flex-wrap mt-12 justify-center w-full"><ManyDoorMontyHall/></div>
        </div>
    </main>
    )
}