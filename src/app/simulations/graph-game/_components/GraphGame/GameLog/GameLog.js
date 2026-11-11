import { useGameActions, useMatchState } from "@/app/simulations/graph-game/_state/GameProvider";
import { LOCAL_ACTION } from "@/app/simulations/graph-game/_components/GraphGame/constants";
import { Sword, Shield } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";

function GameLog(){
  const match = useMatchState();
  const { dispatch } = useGameActions();
  const rowRefs = useRef([]);
  // Where the viewed turn's row sits, so one highlight can slide between rows instead of each row
  // colouring itself. It only animates once it has been placed, so it doesn't slide in from the top.
  const [highlight, setHighlight] = useState(null);

  useLayoutEffect(() => {
    const row = rowRefs.current[match.viewingTurn - 1];
    if (!row) return;
    setHighlight((prev) => ({
      top: row.offsetTop,
      height: row.offsetHeight,
      animate: prev !== null,
    }));
  }, [match.viewingTurn, match.log.length]);

  const handleTurnClick = (index) => {
    dispatch({ type: LOCAL_ACTION.SET_VIEWING_TURN, payload: { viewingTurn: index + 1 }});
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

    <div className="relative">
    {/* Drawn over the rows (multiplied, so the text shows through) so its blue border sits on top
        of the rows' own borders. Same overshooting curve as the attack/defend highlight. */}
    {highlight && (
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 z-10 border-y border-blue-400 bg-blue-100 mix-blend-multiply ${
          highlight.animate
            ? "motion-safe:transition-[transform,height] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            : ""
        }`}
        style={{ transform: `translateY(${highlight.top}px)`, height: highlight.height }}
      />
    )}
    {match.log.map((logEntry, index) => {
      const player1Attack = logEntry.selections.player1.attack;
      const player2Attack = logEntry.selections.player2.attack;
      const player1Defend = logEntry.selections.player1.defend;
      const player2Defend = logEntry.selections.player2.defend;
      const isViewing = match.viewingTurn === index + 1;
      return (
        <button
          key={index}
          ref={(el) => { rowRefs.current[index] = el; }}
          aria-current={isViewing ? "step" : undefined}
          className="border-y w-full text-left"
          onClick={() => handleTurnClick(index)}
        >
          <div className="flex flex-row">
            <div className="w-6"><p>{logEntry.turnNumber}</p></div>
            <div className="flex-1">
              <div className="flex flex-row">
                <div><Sword size={16} aria-label="Attack" /></div>
                <p className="w-1/2 text-center">{player1Attack}</p>
                <p className="w-1/2 text-center">{player2Attack}</p>
              </div>
              <div className="flex flex-row">
                <div><Shield size={16} aria-label="Defend" /></div>
                <p className="w-1/2 text-center">{player1Defend}</p>
                <p className="w-1/2 text-center">{player2Defend}</p>
              </div>
            </div>
          </div>
        </button>
      );
    })}
    </div>
  </div>
);}

export default GameLog;