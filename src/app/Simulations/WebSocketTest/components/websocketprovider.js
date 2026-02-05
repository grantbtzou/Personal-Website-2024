"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect
} from "react";

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const [connectedRoom, setConnectedRoom] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [invalidRoom, setInvalidRoom] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [inputCode, setInputCode] = useState("");

  useEffect(() => {
    if (socketRef.current) return;

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
          break;

        case "INVALIDROOM":
          setInvalidRoom(true);
          socket.close();
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
    };

    return () => ws.close();
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        socket: socket,
        connectedRoom,
        playerId,
        invalidRoom,
        messages,
        message,
        setMessage,
        setInputCode
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export const useSocket = () => useContext(WebSocketContext);
