"use client";

import { SocketProvider } from "./socket/SocketProvider";
import { GameProvider } from "../_state/GameProvider";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8080";

export default function Providers({ children }) {
  return(
  <SocketProvider url={WS_URL}>
    <GameProvider>
      {children}
    </GameProvider>
  </SocketProvider>);
}
