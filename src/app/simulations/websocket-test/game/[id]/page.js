'use client'
import { useEffect } from "react";
import GraphGame from "@/app/simulations/websocket-test/GraphGame/GraphGame";
import { useGameActions } from "@/app/simulations/websocket-test/GraphGame/gameProvider";

export default function Page({ params }){
  const { id } = params;
  const { joinRoom } = useGameActions();
  useEffect(() => {
    joinRoom(id);
  }, [id, joinRoom]);
  return(<div>
    <GraphGame roomId={id}/>
  </div>)
}
