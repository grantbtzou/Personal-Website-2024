import { ReactFlowProvider } from "@xyflow/react";
import GameController from "./gameController";
export default function GraphGame() {
  return (
    <ReactFlowProvider>
      <GameController />
    </ReactFlowProvider>
  );
}