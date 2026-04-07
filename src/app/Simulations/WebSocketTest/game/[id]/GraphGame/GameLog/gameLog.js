import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
function GameLog(){
  const { state } = useSocket();
  return(
    <div className="border p-4 w-48 overflow-y-auto h-[500px]">
      <h2>Game Log</h2>
      {state.match.log.map((logEntry, index) => {
        const attacks = logEntry.resolution.attacks;
        const player1Attack = attacks.find(attack => attack.attacker === 'player1');
        const player2Attack = attacks.find(attack => attack.attacker === 'player2');
        return( 
        <button key={index} className="border p-2 my-2" onClick={()=>{
          state.game.nodes = [...logEntry.before.nodes]
          state.game.edges = [...logEntry.before.edges]}}>
          <p>Turn {logEntry.turnNumber}:</p>
          <p className="whitespace-nowrap">Player 1 Attack: {player1Attack?.targetId}</p>
          <p className="whitespace-nowrap">Player 2 Attack: {player2Attack?.targetId}</p>
        </button>)
      }
      )}
    </div>
  )}

export default GameLog;