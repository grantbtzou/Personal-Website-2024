"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect, 
  useReducer, 
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { initialGameState } from "../game/[id]/GraphGame/initialState";
import { gameReducer } from "../game/[id]/GraphGame/gameReducer";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const router = useRouter();
  const socketRef = useRef(null);

  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  function connect() {
    if (socketRef.current) return socketRef.current;

    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      dispatch({
        type: msg.type,
        payload: msg,
      });

      if (
        (msg.type === "GAMECREATED" || msg.type === "SUCCESSFULCONNECTION") &&
        !window.location.pathname.includes(`/game/${msg.roomId}`)
      ) {
        router.push(`websockettest/game/${msg.roomId}`);
      }

      if (msg.type === "INVALIDROOM") {
        ws.close();
      }
    };

    ws.onclose = () => {
      socketRef.current = null;
    };

    return ws;
  }

  const send = useCallback((message) => {
    const ws = socketRef.current;

    if (ws.readyState !== WebSocket.OPEN){
      console.warn("Websocket not open");
    };

    ws.send(JSON.stringify(message));
  }, []);
  useEffect(()=>{
    connect();
  })
  return (
    <WebSocketContext.Provider value={{ state, dispatch, connect, send }}>
      {children}
    </WebSocketContext.Provider>
  );
}
export const useSocket = () => useContext(WebSocketContext);
