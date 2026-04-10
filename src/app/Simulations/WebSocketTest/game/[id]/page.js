'use client'
import { useEffect } from "react";
import GraphGame from "./GraphGame/graphGame";
import { useSocket } from "../../Socket/websocketprovider"; 

export default function Page({ params }){
  const { id } = params;
  const { state, dispatch, connect, send} = useSocket();
  useEffect(() => { 
    const reconnectToken = sessionStorage.getItem("reconnectToken");
    if(reconnectToken){ 
      const ws = connect();
      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: "RECONNECT",
          reconnectToken: reconnectToken,
        }))
      }
    }
  })
  return(<div>
    <GraphGame roomId={id}/>
  </div>)
}