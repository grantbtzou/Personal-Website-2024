import { ReactFlowProvider } from "@xyflow/react";
import GameController from "./GameController";
export default function GraphGame() {
  return (
    <ReactFlowProvider>
      <GameController />
    </ReactFlowProvider>
  );
}