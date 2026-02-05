export default function Chat(){
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
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    />
    <button onClick={sendMessage}>Send</button></div>}
  </div>)
}