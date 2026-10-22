import { useGameActions, useGameState } from "@/app/simulations/websocket-test/GraphGame/gameProvider";
import { useState } from "react";
import CopyButton from "./CopyButton";
import { CLIENT_MSG, USER_TYPE } from "@/app/simulations/websocket-test/protocol";

export default function Chat(){
  const state = useGameState();
  const { send } = useGameActions();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    send({
        type: CLIENT_MSG.CHAT,
        text: message, 
        roomId: state.connection.connectedRoom
    })

    setMessage("");
  };
  return(<div>
    {state.connection.connectedRoom && <div className="w-96 mx-auto mb-24">
    <div className="flex gap-2">
      <h1>Connected room: {state.connection.connectedRoom}</h1> 
      <CopyButton text={state.connection.connectedRoom} />
    </div>
    

    <h1>Player id: {state.connection.playerId}</h1>
    <ul className="border-2 overflow-y-auto h-[250px]">
      <ul>
      {state.chat.messages.map((m, i) => {
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
    </ul>
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button onClick={sendMessage}>Send</button></div>}
  </div>)
}