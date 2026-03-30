import { useSocket } from "@/app/Simulations/websockettest/Socket/websocketprovider";
function GameLog(){
  const { state } = useSocket();
  return(
    <div className="border p-4">
      <h2>Game Log</h2>
    </div>
  )
}

export default GameLog;