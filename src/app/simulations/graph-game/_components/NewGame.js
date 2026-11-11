import { useSocket } from "../_lib/socket/SocketProvider";
import { useGameActions, useGameState } from "../_state/GameProvider";
import { useState } from "react";
import { CLIENT_MSG } from "@/app/simulations/graph-game/_lib/protocol";
import { SOCKET_STATUS } from "@/app/simulations/graph-game/_lib/socket/constants";
import { LOCAL_ACTION } from "@/app/simulations/graph-game/_components/GraphGame/constants";
import { JOIN_ERROR_TEXT } from "./joinErrors";

export default function NewGame(){
  const state = useGameState();
  const { send, dispatch } = useGameActions();
  const { status } = useSocket();
  const disconnected = status !== SOCKET_STATUS.OPEN;
  const [inputCode, setInputCode] = useState('');
  
  const createGame = () => {
    send({ type: CLIENT_MSG.CREATE_GAME })
  };

  const joinRoom = () => {
    // Drop the previous attempt's error so a stale message doesn't show while this one is pending.
    dispatch({ type: LOCAL_ACTION.CLEAR_JOIN_ERROR });
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
      
      {state.connection.joinError &&
      <p className="text-red-500">{JOIN_ERROR_TEXT[state.connection.joinError]}</p>
      }
    </div>
    
  </div>)
}