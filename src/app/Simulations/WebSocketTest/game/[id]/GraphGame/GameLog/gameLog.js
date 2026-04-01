import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
function GameLog(){
  const { state } = useSocket();
  return(
    <div className="border p-4">
      <h2>Game Log</h2>
      {console.log("game log: ", state.match.log)}
      {state.match.log.map((logEntry, index) => {
        const attacks = logEntry.resolution.attacks;
        const player1Attack = attacks.find(attack => attack.attacker === 'player1');
        const player2Attack = attacks.find(attack => attack.attacker === 'player2');
        return( <div key={index} className="border p-2 my-2">
          <p>Turn {logEntry.turnNumber}:</p>
          <p className="whitespace-nowrap">Player 1 Attack: {player1Attack.targetId}</p>
          <p className="whitespace-nowrap">Player 2 Attack: {player2Attack.targetId}</p>
        </div>)
       
      }
      )}
    </div>
  )}

export default GameLog;