import { useSocket } from "./Socket/websocketprovider";
import { useState } from "react";

export default function NewGame(){
  const { state, dispatch, connect, send} = useSocket();
  const [inputCode, setInputCode] = useState('');
  
  const createGame = () => {
    send({ type: "CREATEGAME" })
  };

  const joinRoom = () => {
    send({
      type: "JOINGAME",
      roomId: inputCode,
    });
  };

  return(
  <div className="flex flex-col justify-start">
    <button className="border-2 w-24" onClick={createGame}>Create Game</button>
    <div className="">
      <button className="border-2" onClick={joinRoom}>Join Room</button>
      <input className="border-2"
      value={inputCode} 
      onChange={(e) => {
      const cleaned = e.target.value
      .toUpperCase()          
      .replace(/[^A-Z]/g, "") 
      .slice(0, 4);        
      setInputCode(cleaned);   
      }}
      onKeyDown={(e) => e.key === "Enter" && joinRoom()}
      />
      
      {state.connection.invalidRoom && 
      <p className="text-red-500">Invalid room</p>
      }
    </div>
    
  </div>)
}