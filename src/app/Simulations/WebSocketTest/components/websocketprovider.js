"use client";

import { createContext, useContext, useRef } from "react";

const WSContext = createContext(null);

export function WebSocketProvider({ children }) {
  const socketRef = useRef<WebSocket | null>(null);

  if (!socketRef.current) {
    socketRef.current = new WebSocket("ws://localhost:8080");
  }

  return (
    <WSContext.Provider value={socketRef.current}>
      {children}
    </WSContext.Provider>
  );
}

export const useSocket = () => useContext(WSContext);
