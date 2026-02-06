"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect
} from "react";
import { useRouter } from "next/navigation";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const router = useRouter();
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const [connectedRoom, setConnectedRoom] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [invalidRoom, setInvalidRoom] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [inputCode, setInputCode] = useState("");

  function connect(){
    if (socketRef.current) return socketRef.current;

    const ws = new WebSocket("ws://localhost:8080");
    socketRef.current = ws;
    setSocket(ws);
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "GAMECREATED":
        case "SUCCESSFULCONNECTION":
          setInvalidRoom(false);
          setConnectedRoom(msg.roomId);
          setPlayerId(msg.playerId);
          if (!window.location.pathname.includes(`/game/${msg.roomId}`)) {
            router.push(`WebSocketTest/game/${msg.roomId}`);
          }
          break;

        case "INVALIDROOM":
          setInvalidRoom(true);
          ws.close();
          break;

        case "CHAT":
          setMessages(prev => [...prev, msg.message]);
          break;

        default:
          console.log("Message:", msg);
      }
    };

    ws.onclose = () => {
      socketRef.current = null;
      setSocket(null);
    };
    
    return ws;
  }

  return (
    <WebSocketContext.Provider
      value={{
        socket: socket,
        connect,
        connectedRoom,
        playerId,
        invalidRoom,
        messages,
        message,
        setMessage,
        inputCode,
        setInputCode,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export const useSocket = () => useContext(WebSocketContext);
