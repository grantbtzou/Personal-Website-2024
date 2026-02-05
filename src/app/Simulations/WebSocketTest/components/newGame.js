import { useSocket } from "./websocketprovider";

export default function NewGame(){
  const { socket, connect, inputCode, setInputCode, invalidRoom,} = useSocket();
  
  const createGame = () => {
    const ws = connect();
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "CREATEGAME" }));
    };
  };

  const joinRoom = () => {
    const ws = connect();
    ws.onopen = () => {
      console.log("JOIN SEND", inputCode, typeof inputCode);
      ws.send(JSON.stringify({
        type: "JOINGAME",
        roomId: inputCode,
      }));
    };
  };

  return(<div>
    <button onClick={createGame}>Create Game</button>
    <input 
    value={inputCode} 
    onChange={(e) => {
    const cleaned = e.target.value
    .toUpperCase()          
    .replace(/[^A-Z]/g, "") 
    .slice(0, 4);        
    setInputCode(cleaned);   
    }}
    onKeyDown={(e) => e.key === "Enter" && joinRoom()}
    />
    <button onClick={joinRoom}>Join Room</button>
    {invalidRoom && 
    <p className="text-red-500">Invalid room</p>
    }
  </div>)
}