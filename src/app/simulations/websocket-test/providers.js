"use client";

import { SocketProvider } from "./Socket/websocketprovider";
import { GameProvider } from "./GraphGame/gameProvider";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8080";

export default function Providers({ children }) {
  return(
  <SocketProvider url={WS_URL}>
    <GameProvider>
      {children}
    </GameProvider>
  </SocketProvider>);
}
