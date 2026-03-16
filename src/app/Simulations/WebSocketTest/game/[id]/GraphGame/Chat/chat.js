import { useSocket } from "../../../../Socket/websocketprovider";
import { useState } from "react";

export default function Chat(){
  const { 
    connect, 
    state, 
    dispatch, 
    send, 
  } = useSocket();
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    const ws = connect();
    send({
        type: "CHAT",
        text: message, 
        roomId: state.connection.connectedRoom
    })

    setMessage("");
  };
  console.log("chat messages: ", state.chat.messages);
  return(<div>
    {state.connection.connectedRoom && <div className="w-96 mx-auto mb-24">
    <h1>Connected room: {state.connection.connectedRoom}</h1>
    <h1>Player id: {state.connection.playerId}</h1>
    <ul className="border-2">
      <ul>
      {state.chat.messages.map((m, i) => {
        let label = "";

        if (m.userType === "player") label = `Player ${m.user}: `;
        if (m.userType === "spectator") label = `Spectator ${m.user}: `;

        return (
          <li key={i} className={m.userType === "system" ? "system-message" : ""}>
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