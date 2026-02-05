'use client'
import { useEffect, useRef, useState, } from "react";
import { useRouter } from "next/navigation";
import { WebSocketProvider } from "./components/websocketprovider";
import NewGame from "./components/newGame";

export default function Page(){
  const socketRef = useRef(null);
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [connectedRoom, setConnectedRoom] = useState(null);
  const [invalidRoom, setInvalidRoom] = useState(false);
  const [playerId, setPlayerId] = useState(null);
  const socket = useSocket();

  const sendMessage = () => {
    if (!input || !socketRef.current) return;

    socketRef.current.send(
      JSON.stringify({
        type: "CHAT",
        text: input, 
        roomId: connectedRoom
      })
    );

    setInput("");
  };

  const connect = (initialMessage) => {
    if (socketRef.current) return;

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      ws.send(JSON.stringify(initialMessage));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      switch (msg.type) {
        case "GAMECREATED":
          setInvalidRoom(false);
          setConnectedRoom(msg.roomId);
          setPlayerId(msg.playerId);
          break;

        case "SUCCESSFULCONNECTION":
          setInvalidRoom(false);
          setConnectedRoom(msg.roomId);
          setPlayerId(msg.playerId);
          break;

        case "INVALIDROOM":
          setInvalidRoom(true);
          ws.close();
          break;
        case "CHAT":
          setMessages(prev => [...prev, msg.message]);
        default:
          console.log("Message:", msg);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
      socketRef.current = null;
    };

    socketRef.current = ws;
  };

  const createGame = () => {
    connect({ type: "CREATEGAME" });
  };

  const joinRoom = () => {
    connect({
      type: "JOINGAME",
      roomId: inputCode
    });
  };

  return (
    <WebSocketProvider>
    <div className='mx-auto'>
      <NewGame/>
    </div>
    </WebSocketProvider>
  );
}