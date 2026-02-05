import Chat from "./chat"
import { useEffect } from "react"
import { useSocket } from "./websocketprovider";
export default function GraphGame(){
  const { connect, socket, connectedRoom} = useSocket();
  useEffect(() => {
 
}, [connectedRoom]);
  return(<div>
    
    <Chat/>
  </div>)
}