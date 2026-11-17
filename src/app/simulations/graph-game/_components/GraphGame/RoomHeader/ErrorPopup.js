import { useEffect } from "react";
import { X } from "lucide-react";
import { useGameActions, useGameState } from "@/app/simulations/graph-game/_state/GameProvider";
import { LOCAL_ACTION } from "@/app/simulations/graph-game/_components/GraphGame/constants";

const SHOW_FOR_MS = 4000;

// The latest server error, shown beside the room id. It hides itself after a few seconds or when closed.
export default function ErrorPopup() {
  const { error, errorId } = useGameState().connection;
  const { dispatch } = useGameActions();

  // Restart the timer for each new error, even one with the same message.
  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => dispatch({ type: LOCAL_ACTION.CLEAR_ERROR }), SHOW_FOR_MS);
    return () => clearTimeout(timer);
  }, [errorId, error, dispatch]);

  if (!error) return null;

  return (
    <div role="alert" className="flex items-center gap-2 border border-red-300 bg-red-50 px-3 py-1 text-red-700 shadow-sm">
      <span>{error}</span>
      <button onClick={() => dispatch({ type: LOCAL_ACTION.CLEAR_ERROR })} aria-label="Dismiss error">
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
