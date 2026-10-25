import { useGameActions, useGameState } from "@/app/simulations/websocket-test/GraphGame/gameProvider";
import { useEffect } from "react";
import { Sword, Shield } from "lucide-react";
import { PLAYER_COLORS } from "@/app/simulations/websocket-test/GraphGame/constants";
import { CLIENT_MSG, GAME_STATUS, PLAYER, SELECTION, DRAW } from "@/app/simulations/websocket-test/protocol";

function GameMenu(){
  const state = useGameState();
  const { send } = useGameActions();
  const playerSelection = state.match.playerSelection;
  const gameStatus = state.match.gameStatus;
  const confirmation = state.match.moveConfirmed;
  const playerOrder = state.match.playerOrder;
  const winner = state.match.winner;
  // Spectators have no player colours.
  const colors = PLAYER_COLORS[playerOrder];
  function setPlayerSelection(selection) {
    if(gameStatus !== GAME_STATUS.IN_PROGRESS){
      return;
    }
    send({
      type: CLIENT_MSG.SET_SELECTION,
      roomId: state.connection.connectedRoom,
      selection: selection,
    })
  }

  function selectConfirm(){
    send({
      type: CLIENT_MSG.CONFIRM_SELECTION,
      roomId: state.connection.connectedRoom,
    })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();

        if (gameStatus !== GAME_STATUS.IN_PROGRESS) return;

        const next = playerSelection === SELECTION.ATTACK ? SELECTION.DEFEND : SELECTION.ATTACK;
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
        if (gameStatus !== GAME_STATUS.IN_PROGRESS) return;
        selectConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStatus, confirmation]);

  return(
  <div>
    <div className={`border p-4 ${playerOrder === PLAYER.ONE ? 'bg-red-500' : 'bg-blue-500'}`}>
      <div className="text-white">{playerOrder}</div> 
      <div className="">
        <button className={`border p-4 w-24 flex items-center justify-center gap-1 ${ playerSelection === SELECTION.ATTACK && colors?.light || 'bg-white'}`}
        onClick={() => {setPlayerSelection(SELECTION.ATTACK); }}>
          <Sword size={16} className={colors?.icon} aria-hidden="true" />
          Attack
        </button>
        <button className={`border p-4 w-24 flex items-center justify-center gap-1 ${playerSelection === SELECTION.DEFEND && colors?.light || 'bg-white'}`}
        onClick={() => {setPlayerSelection(SELECTION.DEFEND); }}>
          <Shield size={16} className={colors?.icon} aria-hidden="true" />
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
      {gameStatus === GAME_STATUS.COMPLETE && winner === DRAW && <div>
      <p>Draw</p></div>}
      {gameStatus === GAME_STATUS.COMPLETE && winner !== DRAW && <div>
      <p>{winner} wins</p></div>}
    </div>
  </div>)
}

export default GameMenu;