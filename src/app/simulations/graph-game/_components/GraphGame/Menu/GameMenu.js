import { useGameActions, useGameState, useMatchState } from "@/app/simulations/graph-game/_state/GameProvider";
import { useEffect } from "react";
import { Sword, Shield, Undo2 } from "lucide-react";
import { PLAYER_COLORS } from "@/app/simulations/graph-game/_components/GraphGame/constants";
import { CLIENT_MSG, GAME_STATUS, PLAYER, SELECTION, DRAW } from "@/app/simulations/graph-game/_lib/protocol";

function GameMenu(){
  const state = useGameState();
  const match = useMatchState();
  const { send } = useGameActions();
  const playerSelection = match.playerSelection;
  const gameStatus = match.gameStatus;
  const confirmation = match.moveConfirmed;
  const playerOrder = match.playerOrder;
  const winner = match.winner;
  const undoEnabled = gameStatus === GAME_STATUS.IN_PROGRESS && match.canUndo && !confirmation;
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

  function selectUndo(){
    if(!undoEnabled){
      return;
    }
    send({
      type: CLIENT_MSG.UNDO,
      roomId: state.connection.connectedRoom,
    })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        // Leave Ctrl+Z alone while typing, e.g. in the chat box.
        if (e.target.closest('input, textarea, [contenteditable="true"]')) return;
        e.preventDefault();
        selectUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoEnabled]);

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
      {/* One highlight sits behind both buttons and slides between them, so switching between
          attack and defend moves the colour instead of swapping it. It covers the top half for
          attack and the bottom half for defend, using the same overshooting curve as the node fill. */}
      <div className="relative w-24 overflow-hidden bg-white">
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 top-0 h-1/2 ${colors?.light ?? ''} motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
            playerSelection === SELECTION.DEFEND ? 'translate-y-full' : 'translate-y-0'
          } ${colors && playerSelection ? '' : 'hidden'}`}
        />
        <button className="relative border p-4 w-24 flex items-center justify-center gap-1"
        aria-pressed={playerSelection === SELECTION.ATTACK}
        onClick={() => {setPlayerSelection(SELECTION.ATTACK); }}>
          <Sword size={16} className={colors?.icon} aria-hidden="true" />
          Attack
        </button>
        <button className="relative border p-4 w-24 flex items-center justify-center gap-1"
        aria-pressed={playerSelection === SELECTION.DEFEND}
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
      <button className={`border p-4 w-24 flex items-center justify-center gap-1 bg-white disabled:opacity-50`}
        disabled={!undoEnabled}
        onClick={() => selectUndo()}>
        <Undo2 size={16} aria-hidden="true" />
        Undo
      </button>

     
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