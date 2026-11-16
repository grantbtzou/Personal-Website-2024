import { useGameActions, useMatchState } from "@/app/simulations/graph-game/_state/GameProvider";
import { LOCAL_ACTION } from "@/app/simulations/graph-game/_components/GraphGame/constants";
import { Sword, Shield, Spline } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { EDGE_CHANGE } from "@/app/simulations/graph-game/_lib/protocol";

// "+n1.1-n2.1" for a created edge, "−n1.1-n1.2" for a deleted one.
function formatEdgeChange(change) {
  if (!change) return null;
  return `${change.type === EDGE_CHANGE.CREATE ? "+" : "−"}${change.edgeId}`;
}

// Every line and column has a fixed size, so a turn's row is the same size whether its selections are
// empty or filled in. Otherwise choosing a selection would resize the row and leave the highlight behind.
const LINE_HEIGHT = "h-6 leading-6";
const ICON_COLUMN = "w-4 shrink-0";
// basis-0 splits the space evenly, whatever the text; long text is clipped rather than wrapped.
const PLAYER_COLUMN = "flex-1 basis-0 min-w-0 text-center whitespace-nowrap overflow-hidden text-ellipsis";

function LogLine({ icon, p1, p2, className = "" }) {
  return (
    <div className={`flex flex-row items-center ${LINE_HEIGHT}`}>
      <div className={ICON_COLUMN}>{icon}</div>
      <p className={`${PLAYER_COLUMN} ${className}`}>{p1}</p>
      <p className={`${PLAYER_COLUMN} ${className}`}>{p2}</p>
    </div>
  );
}

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
  <div className="border w-48 shrink-0 overflow-y-auto h-[500px]">
    <h2>Game Log</h2>
    {/* Header row */}
    <div className="flex flex-row">
      <div className="w-6 shrink-0" /> {/* spacer for turn number */}
      <div className={ICON_COLUMN} /> {/* spacer for the row icons */}
      <p className={PLAYER_COLUMN}>P1</p>
      <p className={PLAYER_COLUMN}>P2</p>
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
      const { player1, player2 } = logEntry.selections;
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
            <div className="w-6 shrink-0"><p className={LINE_HEIGHT}>{logEntry.turnNumber}</p></div>
            <div className="flex-1 min-w-0">
              <LogLine icon={<Sword size={16} aria-label="Attack" />} p1={player1.attack} p2={player2.attack} />
              <LogLine icon={<Shield size={16} aria-label="Defend" />} p1={player1.defend} p2={player2.defend} />
              <LogLine
                icon={<Spline size={16} aria-label="Edge change" />}
                p1={formatEdgeChange(player1.edgeChange)}
                p2={formatEdgeChange(player2.edgeChange)}
                className="text-xs"
              />
            </div>
          </div>
        </button>
      );
    })}
    </div>
  </div>
);}

export default GameLog;