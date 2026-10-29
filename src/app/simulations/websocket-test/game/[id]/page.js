'use client'
import { useEffect } from "react";
import GraphGame from "@/app/simulations/websocket-test/_components/GraphGame/GraphGame";
import { useGameActions } from "@/app/simulations/websocket-test/_components/GraphGame/gameProvider";

export default function Page({ params }){
  const { id } = params;
  const { joinRoom } = useGameActions();
  useEffect(() => {
    joinRoom(id);
    // Clear the target on leave, so a later reconnect doesn't rejoin this room.
    return () => joinRoom(null);
  }, [id, joinRoom]);
  return(<div>
    <GraphGame roomId={id}/>
  </div>)
}
