import { useSocket } from "./Socket/websocketprovider";
import { useGameActions, useGameState } from "./GraphGame/gameProvider";
import { useState } from "react";
import { CLIENT_MSG } from "@/app/simulations/websocket-test/protocol";
import { SOCKET_STATUS } from "@/app/simulations/websocket-test/Socket/constants";

export default function NewGame(){
  const state = useGameState();
  const { send } = useGameActions();
  const { status } = useSocket();
  const disconnected = status !== SOCKET_STATUS.OPEN;
  const [inputCode, setInputCode] = useState('');
  
  const createGame = () => {
    send({ type: CLIENT_MSG.CREATE_GAME })
  };

  const joinRoom = () => {
    send({
      type: CLIENT_MSG.JOIN_GAME,
      roomId: inputCode,
    });
  };

  return(
  <div className="flex flex-col justify-start">
    <button className="border-2 w-24" onClick={createGame} disabled={disconnected}>Create Game</button>
    <div className="">
      <button className="border-2" onClick={joinRoom} disabled={disconnected}>Join Room</button>
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