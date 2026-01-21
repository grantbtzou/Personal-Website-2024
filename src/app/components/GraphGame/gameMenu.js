import { GameContext } from "./gameContext";
import { useContext } from "react";
function GameMenu(){
  const { 
    activePlayer,
    setAttack,
    setDefend,
    resolve,
    resetGame, 
    selectConfirm,
    playerSelection,
    setplayerSelection, 
    gameActive,
    winner } = useContext(GameContext)
  return(
  <div>
    <div className={`border p-4 ${activePlayer === 'player1' ? 'bg-orange-300' : 'bg-white'}`}>
      <div>Player 1</div> 
    <div className="border p-4">
      <button className={`border p-4 ${playerSelection === 'attack' ? 'bg-green-500' : 'bg-white'}`} 
      onClick={() => {setplayerSelection("attack"); }}>
        Attack
      </button>
      <button className={`border p-4 ${playerSelection === 'defend' ? 'bg-yellow-500' : 'bg-white'}`}
      onClick={() => {setplayerSelection("defend"); }}>
        Defend
      </button>
    </div>
    <button className="border p-4"
    onClick={() => selectConfirm()}>
      Confirm
    </button>
  </div>
  <div className={`border p-4 ${activePlayer === 'player2' ? 'bg-orange-300' : 'bg-white'}`}>
    <div>Player 2 </div>
    <div className="border p-4">
      <button className={`border p-4  ${playerSelection === 'attack' ? 'bg-green-500' : 'bg-white'}`}
      onClick={() => setplayerSelection("attack")}>Attack</button>
      <button className={`border p-4 ${playerSelection === 'defend' ? 'bg-yellow-500' : 'bg-white'}`}
      onClick={() => setplayerSelection("defend")}>Defend</button>
    </div>
    <button className="border p-4"
    onClick={() => selectConfirm()}>
      Confirm
    </button>
  </div>
  <div>
    {!gameActive && winner === 'draw' && <div>
    <p>Draw</p>
    <button onClick={() => resetGame()}>New game</button></div>}
    {!gameActive && winner !== 'draw' && <div>
    <p>{winner} wins</p>
    <button onClick={() => resetGame()}>New game</button></div>
    }
    </div>
  </div>)
}

export default GameMenu;