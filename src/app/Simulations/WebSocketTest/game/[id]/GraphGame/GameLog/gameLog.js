import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
function GameLog(){
  const { state, dispatch } = useSocket();

  const handleTurnClick = (index) => {
    dispatch({ type: 'SET_VIEWING_TURN', payload: { viewingTurn: index + 1 }});
  };

  return(
    <div className="border p-4 w-48 overflow-y-auto h-[500px]">
      <h2>Game Log</h2>
      {state.match.log.map((logEntry, index) => {
        const attacks = logEntry.resolution.attacks;
        const player1Attack = attacks.find(attack => attack.attacker === 'player1');
        const player2Attack = attacks.find(attack => attack.attacker === 'player2');
        const isViewing = state.match.viewingTurn === index + 1;
        return( 
          <button
            key={index}
            className={`border p-2 my-2 w-full text-left ${isViewing ? "bg-blue-100 border-blue-400" : ""}`}
            onClick={() => handleTurnClick(index)}
          >
          <p>Turn {logEntry.turnNumber}:</p>
          <p className="whitespace-nowrap">P1: {player1Attack?.targetId}</p>
          <p className="whitespace-nowrap">P2: {player2Attack?.targetId}</p>
          </button>)
      }
      )}
    </div>
  )}

export default GameLog;