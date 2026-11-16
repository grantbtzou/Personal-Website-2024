import { useGameState } from "@/app/simulations/graph-game/_state/GameProvider";
import CopyButton from "./CopyButton";

// Room-wide info above the board: the room id to share with an opponent.
export default function RoomHeader() {
  const state = useGameState();
  const roomId = state.connection.connectedRoom;
  if (!roomId) return null;

  return (
    <div className="flex items-center gap-2">
      <span>Room</span>
      <span className="font-mono">{roomId}</span>
      <CopyButton text={roomId} />
    </div>
  );
}
