import { useGameActions, useGameState, useChatState } from "@/app/simulations/websocket-test/_components/GraphGame/gameProvider";
import { useEffect, useRef, useState } from "react";
import CopyButton from "./CopyButton";
import { CLIENT_MSG, USER_TYPE } from "@/app/simulations/websocket-test/_lib/protocol";

export default function Chat(){
  const state = useGameState();
  const chat = useChatState();
  const { send } = useGameActions();
  const [message, setMessage] = useState('');
  const messagesRef = useRef(null);

  // Keep the newest message in view as messages arrive.
  useEffect(() => {
    const list = messagesRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [chat.messages]);

  const sendMessage = () => {
    send({
        type: CLIENT_MSG.CHAT,
        text: message, 
        roomId: state.connection.connectedRoom
    })

    setMessage("");
  };
  return(<div className="flex flex-col flex-1 min-h-0">
    {state.connection.connectedRoom && <div className="w-96 mx-auto flex flex-col flex-1 min-h-0">
    <div className="flex gap-2">
      <h1>Connected room: {state.connection.connectedRoom}</h1> 
      <CopyButton text={state.connection.connectedRoom} />
    </div>
    

    <h1>Player id: {state.connection.playerId}</h1>
    <ul ref={messagesRef} className="border-2 overflow-y-auto flex-1 min-h-0 break-words">
      {chat.messages.map((m, i) => {
        let label = "";

        if (m.userType === USER_TYPE.PLAYER) label = `Player ${m.user}: `;
        if (m.userType === USER_TYPE.SPECTATOR) label = `Spectator ${m.user}: `;

        return (
          <li key={i} className={m.userType === USER_TYPE.SYSTEM ? "system-message" : ""}>
            {label && <strong>{label}</strong>}
            {m.text}{" "}
            {new Date(m.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </li>
        );
      })}
    </ul>
    <div className="flex">
      <input
        className="flex-1 min-w-0 border-2 px-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button className="border-2 border-l-0 px-4 py-2" onClick={sendMessage}>Send</button>
    </div></div>}
  </div>)
}