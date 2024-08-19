'use client'
import { useState } from "react";
import { useEffect } from "react";

import WinRate from "./winRate";

const generateDoors = () => {
    const doors = [false, false, false];
    const carIndex = Math.floor(Math.random() * 3);
    doors[carIndex] = true;
    return doors;
  };

export default function MontyHall(){
    const [doors, setDoors] = useState(generateDoors());
    const [selectedDoor, setSelectedDoor] = useState(null);
    const [revealedDoor, setRevealedDoor] = useState(null);
    const [finalSelection, setFinalSelection] = useState(null);
    const [stage, setStage] = useState(1);
    const [stayWins, setStayWins] = useState(0);
    const [stayLosses, setStayLosses] = useState(0);
    const [switchWins, setSwitchWins] = useState(0)
    const [switchLosses, setSwitchLosses] = useState(0)

    const handleDoorClick = (index) => {
        if (stage === 1) {
          setSelectedDoor(index);
          // Creates an array of available doors 
          // For each door and its index, if it is not the chosen index and it is false, return i, otherwise null 
          // Filter to remove all the nulls 
          const availableDoors = doors.map((door, i) => (i !== index && !door ? i : null)).filter(i => i !== null);
          setRevealedDoor(availableDoors[Math.floor(Math.random() * availableDoors.length)]);
          setStage(2);
        } else if (stage === 2) {
          setFinalSelection(index);
          setStage(3);
        } else if (stage === 3) {
          resetGame();
        }
    };

    const resetGame = () => {
        setDoors(generateDoors());
        setSelectedDoor(null);
        setRevealedDoor(null);
        setFinalSelection(null);
        setStage(1);
    };

    const getDoorText = (index) => {
        if (stage === 1) {
          return "Select";
        }
        if (stage === 2) {
          if (index === revealedDoor) {
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
      
      // Example of handling state updates elsewhere, e.g., inside a useEffect or event handler
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
            <div className="flex flex-wrap justify-evenly p-8 bg-slate-400 h-96 max-w-4xl gap-x-20">
            {doors.map((_, index) => (
            <button
                key={index}
                className={`px-6 py-3 border rounded text-3xl w-52 ${
                    stage === 1 || (stage === 2 && index!==revealedDoor)
                    ? "bg-blue-500 hover:bg-blue-400 text-white"
                    : ((stage === 2 || stage === 3) && index===revealedDoor) 
                    ? "bg-gray-500 text-white"
                    : (stage === 3 && index===revealedDoor) 
                    ? "bg-gray-500 hover:bg-gray-400 text-white "
                    : doors[index]
                    ? "bg-green-500 hover:bg-green-400 text-white" 
                    : "bg-red-500 hover:bg-red-400 text-white"
                }`}
                onClick={() => handleDoorClick(index)}
                disabled={stage === 2 && index === revealedDoor}
            >
                {getDoorText(index)}
            </button>
            ))}
            </div>
            <p className="text-3xl mt-4 text-center">{bottomText()}</p>
            <div className="flex flex-wrap mt-4 justify-evenly">
                <WinRate label="Stay Winrate" wins={stayWins} losses={stayLosses}/>
                <WinRate label="Switch Winrate" wins={switchWins} losses={switchLosses}/>
            </div>
        </div>
    )
}