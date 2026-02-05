import { useSocket } from "./websocketprovider";


export default function Chat(){
  const { 
    socket,
    message,
    setMessage, 
    messages,
    connectedRoom,
    playerId,

  } = useSocket();

  const sendMessage = () => {

    socket.send(
      JSON.stringify({
        type: "CHAT",
        text: message, 
        roomId: connectedRoom
      })
    );

    setMessage("");
  };

  return(<div>
    {connectedRoom && <div>
    <h1>Connected room: {connectedRoom}</h1>
    <h1>Player id: {playerId}</h1>
    <ul>
      {messages.map((m, i) => (
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