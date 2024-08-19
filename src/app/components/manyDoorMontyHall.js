'use client'
import { useState } from "react";
import { useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import WinRate from "./winRate";

export default function ManyDoorMontyHall(){
    const generateDoors = (size) => {
        const doors = new Array(size).fill(false); 
        const carIndex = Math.floor(Math.random() * size);
        doors[carIndex] = true;
        return { doors,  carIndex };
    }

    const [winningDoor, setWinningDoor] = useState();
    const [doorCount, setDoorCount] = useState(100);
    const [doors, setDoors] = useState([]);
    const [selectedDoor, setSelectedDoor] = useState(null);
    const [revealedDoors, setRevealedDoors] = useState(null);
    const [finalSelection, setFinalSelection] = useState(null);
    const [stage, setStage] = useState(1);
    const [stayWins, setStayWins] = useState(0);
    const [stayLosses, setStayLosses] = useState(0);
    const [switchWins, setSwitchWins] = useState(0)
    const [switchLosses, setSwitchLosses] = useState(0)

    useEffect(() => {
        const { doors: generatedDoors, carIndex: carIndex } = generateDoors(doorCount);
        setDoors(generatedDoors); 
        setWinningDoor(carIndex); 
        setStage(1);
        setSelectedDoor(null);
        setRevealedDoors(null);
        setFinalSelection(null);
        setStayWins(0);
        setStayLosses(0); 
        setSwitchWins(0); 
        setSwitchLosses(0);
      }, [doorCount]);
    
    const revealDoors = (selectedIndex) =>{
        let keptDoor = 0;
        const revealedDoors = [];
        
        // Creates an array of the doors which are available to reveal
        // For each door and its index, if it is not the chosen index and it is false, return i, otherwise null 
        // Filter to remove all the nulls 
        if(doors[selectedDoor]){
            const availableDoors = doors.map((door, i) => (i !== selectedIndex && !door ? i : null)).filter(i => i !== null);
            keptDoor = Math.floor(Math.random() * availableDoors.length);
            for(let i = 0; i < availableDoors.length; i++){
                if(i !== keptDoor && i !== selectedDoor){
                    revealedDoors.push(availableDoors[i]);
                }
            }
        }
        else{
            keptDoor = winningDoor;
            for(let i = 0; i < doorCount; i++){
                if(i !== keptDoor && i !== selectedIndex){
                    revealedDoors.push(i);
                    console.log(revealedDoors)
                }
            }
        }
        console.log(selectedIndex)
        return revealedDoors;
    }

    const handleDoorClick = (index) => {
        if (stage === 1) {
          setSelectedDoor(index);
          console.log(index)
          console.log("selected: " + selectedDoor)
          setRevealedDoors(revealDoors(index));
          setStage(2);
        } else if (stage === 2) {
          setFinalSelection(index);
          setStage(3);
        } else if (stage === 3) {
          resetGame();
        }
    };

    const resetGame = () => {
        const { doors: generatedDoors, carIndex: carIndex } = generateDoors(doorCount);
        setDoors(generatedDoors); 
        setWinningDoor(carIndex); 
        setSelectedDoor(null);
        setRevealedDoors(null);
        setFinalSelection(null);
        setStage(1);
    };

    const getDoorText = (index) => {
        if (stage === 1) {
          return "Select";
        }
        if (stage === 2) {
          if (revealedDoors.includes(index)) {
            return "Goat";
          }
          return index === selectedDoor ? "Stay" : "Switch";
        }
        if (stage === 3) {
          return doors[index] ? "Car" : "Goat";
        }
    };

    const bottomText = () => {
    if (stage === 1) {
        return "Pick a door";
    }
    if (stage === 2) {
        return "Stay or switch";
    }
    if (stage === 3 && finalSelection === selectedDoor && doors[finalSelection]) {
        return "You stayed and won! Click any door to play again";
    }
    if (stage === 3 && finalSelection === selectedDoor && !doors[finalSelection]) {
        return "You stayed and lost. Click any door to play again";
    }
    if (stage === 3 && finalSelection !== selectedDoor && doors[finalSelection]) {
        return "You switched and won! Click any door to play again";
    }
    if (stage === 3 && finalSelection !== selectedDoor && !doors[finalSelection]) {
        return "You switched and lost. Click any door to play again";
    }
    };
    
    useEffect(() => {
    if (stage === 3 && finalSelection === selectedDoor && doors[finalSelection]) {
        setStayWins(prevStayWins => prevStayWins + 1);
    } else if (stage === 3 && finalSelection === selectedDoor && !doors[finalSelection]) {
        setStayLosses(prevStayLosses => prevStayLosses + 1);
    } else if (stage === 3 && finalSelection !== selectedDoor && doors[finalSelection]) {
        setSwitchWins(prevSwitchWins => prevSwitchWins + 1);
    } else if (stage === 3 && finalSelection !== selectedDoor && !doors[finalSelection]) {
        setSwitchLosses(prevSwitchLosses => prevSwitchLosses + 1);
    }
    }, [stage, finalSelection, selectedDoor, doors]);

    return(
        <div>
        <div className="flex flex-wrap text-base justify-items-start content-start p-8 min-h-[2028px] lg:min-h-[636px] bg-slate-400 md:w-[858px] ">
        <TransitionGroup className="flex flex-wrap door-container gap-x-4 gap-y-2">{doors.map((_, index) => (
        <CSSTransition
        key={index}
        timeout={500}
        classNames={{
        enter: 'pop-in-animation',
        exit: 'pop-out-animation',
        }}
        >
        <button
            key={index}
            className={`px-3 py-3 w-[65px] h-[50px] text-center border rounded pop-animation ${
            stage === 1 || (stage === 2 && !revealedDoors.includes(index))
                ? "bg-blue-500 hover:bg-blue-400 text-white"
                : (stage === 2  && revealedDoors.includes(index)) 
                ? "bg-gray-500 text-white"
                : (stage === 3 && revealedDoors.includes(index)) 
                ? "bg-gray-500 hover:bg-gray-400 text-white "
                : index === winningDoor
                ? "bg-green-500 hover:bg-green-400 text-white" 
                : "bg-red-500 hover:bg-red-400 text-white"
            }`}
            onClick={() => handleDoorClick(index)}
            disabled={stage === 2 && revealedDoors.includes(index)}
        >
            {getDoorText(index)}
        </button>
        </CSSTransition>
        ))} </TransitionGroup>
        </div>
        <p className="text-3xl mt-4 text-center">{bottomText()}</p>
        <div className="flex flex-wrap gap-x-2 mt-1"> <input
        id="doorCount"
        type="range"
        min="3"
        max="100"
        value={doorCount}
        onChange={(e) => setDoorCount(parseInt(e.target.value, 10))}
        /><p>Doors: {doorCount}</p></div>
        <div className="flex flex-wrap mt-4 justify-evenly">
            <WinRate label="Stay Winrate" wins={stayWins} losses={stayLosses}/>
            <WinRate label="Switch Winrate" wins={switchWins} losses={switchLosses}/>
        </div>
        </div>
    )
}