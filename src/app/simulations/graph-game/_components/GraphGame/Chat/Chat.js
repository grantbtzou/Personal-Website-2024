import { useGameActions, useGameState, useChatState } from "@/app/simulations/graph-game/_state/GameProvider";
import { useEffect, useRef, useState } from "react";
import { formatPlayerOrder } from "@/app/simulations/graph-game/_components/GraphGame/constants";
import { CLIENT_MSG, USER_TYPE } from "@/app/simulations/graph-game/_lib/protocol";

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
    <ul ref={messagesRef} className="border-2 overflow-y-auto flex-1 min-h-0 break-words">
      {chat.messages.map((m, i) => {
        let label = "";

        if (m.userType !== USER_TYPE.SYSTEM) {
          const name = formatPlayerOrder(m.playerOrder) || m.user;
          const you = m.user === state.connection.playerId ? " (you)" : "";
          label = `${name}${you}: `;
        }

        return (
          <li key={i} className={`flex items-baseline gap-2 px-2 ${m.userType === USER_TYPE.SYSTEM ? "system-message" : ""}`}>
            {/* min-w-0 lets long text wrap instead of pushing the timestamp out of the box. */}
            <span className="flex-1 min-w-0">
              {label && <strong>{label}</strong>}
              {m.text}
            </span>
            <span className="shrink-0 whitespace-nowrap">
              {new Date(m.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
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