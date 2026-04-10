import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
function GameLog(){
  const { state, dispatch } = useSocket();

  const handleTurnClick = (index) => {
    dispatch({ type: 'SET_VIEWING_TURN', payload: { viewingTurn: index + 1 }});
  };

  return (
  <div className="border w-48 overflow-y-auto h-[500px]">
    <h2>Game Log</h2>
    {/* Header row */}
    <div className="flex flex-row">
      <div className="w-6" /> {/* spacer for turn number */}
      <div className="flex flex-row flex-1">
        <p className="w-1/2 text-center">P1</p>
        <p className="w-1/2 text-center">P2</p>
      </div>
    </div>

    {state.match.log.map((logEntry, index) => {
      const player1Attack = logEntry.selections.player1.attack;
      const player2Attack = logEntry.selections.player2.attack;
      const player1Defend = logEntry.selections.player1.defend;
      const player2Defend = logEntry.selections.player2.defend;
      const isViewing = state.match.viewingTurn === index + 1;
      return (
        <button
          key={index}
          className={`border-y w-full text-left ${isViewing ? "bg-blue-100 border-blue-400" : ""}`}
          onClick={() => handleTurnClick(index)}
        >
          <div className="flex flex-row">
            <div className="w-6"><p>{logEntry.turnNumber}</p></div>
            <div className="flex-1">
              <div className="flex flex-row">
                <div><p>A</p></div>
                <p className="w-1/2 text-center">{player1Attack}</p>
                <p className="w-1/2 text-center">{player2Attack}</p>
              </div>
              <div className="flex flex-row">
                <div><p>D</p></div>
                <p className="w-1/2 text-center">{player1Defend}</p>
                <p className="w-1/2 text-center">{player2Defend}</p>
              </div>
            </div>
          </div>
        </button>
      );
    })}
  </div>
);}

export default GameLog;