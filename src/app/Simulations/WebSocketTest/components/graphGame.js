import Chat from "./chat"
import { useEffect } from "react"
import { useSocket } from "./websocketprovider";
export default function GraphGame( { roomId }){
  const { connect, socket,} = useSocket();
  useEffect(() => {
    if(!socket){
      const ws = connect();
      ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "JOINGAME",
        roomId: roomId,
      }));
    };
    }
}, []);
  return(<div>
    
    <Chat/>
  </div>)
}