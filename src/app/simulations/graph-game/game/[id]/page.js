'use client'
import { useEffect } from "react";
import Link from "next/link";
import GraphGame from "@/app/simulations/graph-game/_components/GraphGame/GraphGame";
import { JOIN_ERROR_TEXT } from "@/app/simulations/graph-game/_components/joinErrors";
import { useGameActions, useGameState } from "@/app/simulations/graph-game/_state/GameProvider";
import { LOCAL_ACTION } from "@/app/simulations/graph-game/_components/GraphGame/constants";

const LOBBY_PATH = "/simulations/graph-game";

export default function Page({ params }){
  const { id } = params;
  const { joinRoom, dispatch } = useGameActions();
  const { connection } = useGameState();
  useEffect(() => {
    joinRoom(id);
    // Clear the target on leave, so a later reconnect doesn't rejoin this room,
    // and clear any join error so it doesn't follow the user back to the lobby.
    return () => {
      joinRoom(null);
      dispatch({ type: LOCAL_ACTION.CLEAR_JOIN_ERROR });
    };
  }, [id, joinRoom, dispatch]);

  // Only show the error while we're not in this room, so an old error can't hide a working game.
  if (connection.joinError && connection.connectedRoom !== id) {
    return (
      <div className="mx-auto w-96 my-24 flex flex-col gap-2">
        <p className="text-red-500">{JOIN_ERROR_TEXT[connection.joinError]}: {id}</p>
        <Link className="border-2 w-fit px-2" href={LOBBY_PATH}>Back to lobby</Link>
      </div>
    );
  }

  return(<div>
    <GraphGame roomId={id}/>
  </div>)
}
