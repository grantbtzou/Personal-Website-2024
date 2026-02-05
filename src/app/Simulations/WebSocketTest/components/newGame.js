export default function NewGame(){
  return(<div>
 {!connectedRoom && <div>
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
      </div>}
  </div>)
}