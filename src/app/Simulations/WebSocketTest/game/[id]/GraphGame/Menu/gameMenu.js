import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
import { useState } from "react";
function GameMenu(){
  const [confirmed, setConfirmed] = useState(false);
  const { dispatch, state, connect } = useSocket();
  const ws = connect()
  const playerSelection = state.match.playerSelection;
  const gameStatus = state.match.gameStatus;
  const confirmation = state.match.moveConfirmed;
  const playerOrder = state.match.playerOrder;
  function setPlayerSelection(selection) {
    if(gameStatus !== 'IN_PROGRESS'){
      return;
    }
    ws.send(JSON.stringify({
      type: "SET_SELECTION",
      roomId: state.connection.connectedRoom,
      selection: selection,
    }))
  }
  function selectConfirm(){
    ws.send(JSON.stringify({
      type: "CONFIRM_SELECTION",
      roomId: state.connection.connectedRoom, 
    }))
    
  }
  return(
  <div>
    <div className={`border p-4 ${playerOrder === 'player1' ? 'bg-red-500' : 'bg-blue-500'}`}>
      <div>{playerOrder}</div> 
      <div className="border p-4">
        <button className={`border p-4 ${playerSelection === 'attack' ? 'bg-green-500' : 'bg-white'}`} 
        onClick={() => {setPlayerSelection("attack"); }}>
          Attack
        </button>
        <button className={`border p-4 ${playerSelection === 'defend' ? 'bg-yellow-500' : 'bg-white'}`}
        onClick={() => {setPlayerSelection("defend"); }}>
          Defend
        </button>
      </div>
      {confirmation ? 
       <button className={`border p-4 bg-green-300`}
          onClick={() => selectConfirm()}>
          Unconfirm
        </button> : 
        <button className={`border p-4`}
          onClick={() => selectConfirm()}>
          Confirm
        </button> 
      }
     
    </div>

    <div>
      {gameStatus === 'COMPLETE' && winner === 'draw' && <div>
      <p>Draw</p></div>}
      {gameStatus === 'COMPLETE' && winner !== 'draw' && <div>
      <p>{winner} wins</p></div>}
    </div>
  </div>)
}

export default GameMenu;