import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
import { useEffect } from "react";
import { PLAYER_COLORS } from "../constants";

function GameMenu(){
  const { dispatch, state, connect } = useSocket();
  const ws = connect()
  const playerSelection = state.match.playerSelection;
  const gameStatus = state.match.gameStatus;
  const confirmation = state.match.moveConfirmed;
  const playerOrder = state.match.playerOrder;
  const winner = state.match.winner;
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();

        if (gameStatus !== 'IN_PROGRESS') return;

        const next = playerSelection === 'attack' ? 'defend' : 'attack';
        setPlayerSelection(next);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, playerSelection]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (gameStatus !== 'IN_PROGRESS') return;
        selectConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, confirmation]);

  return(
  <div>
    <div className={`border p-4 ${playerOrder === 'player1' ? 'bg-red-500' : 'bg-blue-500'}`}>
      <div className="text-white">{playerOrder}</div> 
      <div className="">
        <button className={`border p-4 w-24 ${ playerSelection === 'attack' && PLAYER_COLORS[playerOrder].attack || 'bg-white'}`} 
        onClick={() => {setPlayerSelection("attack"); }}>
          Attack
        </button>
        <button className={`border p-4 w-24 ${playerSelection === 'defend' && PLAYER_COLORS[playerOrder].defend || 'bg-white'}`}
        onClick={() => {setPlayerSelection("defend"); }}>
          Defend
        </button>
      </div>
      {confirmation ? 
       <button className={`border p-4 bg-green-300 w-24`}
          onClick={() => selectConfirm()}>
          Unconfirm
        </button> : 
        <button className={`border p-4 bg-white w-24`}
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