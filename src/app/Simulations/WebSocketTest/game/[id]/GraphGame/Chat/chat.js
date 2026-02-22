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

  return(<div>
    {state.connection.connectedRoom && <div className="w-96 mx-auto mb-24">
    <h1>Connected room: {state.connection.connectedRoom}</h1>
    <h1>Player id: {state.connection.playerId}</h1>
    <ul className="border-2">
      {state.chat.messages.map((m, i) => (
        <li key={i}>Player {m.user}: {m.text} {new Date(m.timestamp).toLocaleString()}</li>
      ))}
    </ul>
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button onClick={sendMessage}>Send</button></div>}
  </div>)
}