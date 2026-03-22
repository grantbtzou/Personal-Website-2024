import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
import { useState } from "react";
function GameMenu(){
  const [confirmed, setConfirmed] = useState(false);
  const { dispatch, state, connect } = useSocket();
  const ws = connect()
  const playerSelection = state.match.playerSelection;
  console.log("playerSelection: " + playerSelection);
  const gameStatus = state.match.gameStatus;
  function setPlayerSelection(selection) {
    console.log("Attempting to set player selection to: ", selection);
    console.log("Current game status: ", gameStatus);
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
    setConfirmed(!confirmed);
    ws.send(JSON.stringify({
      type: "CONFIRM_SELECTION",
      roomId: state.connection.connectedRoom, 
    
    }))
    
  }
  return(
  <div>
    <div className={`border p-4`}>
      <div>Player 1</div> 
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
      <button className="border p-4"
      onClick={() => selectConfirm()}>
        Confirm
      </button>
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