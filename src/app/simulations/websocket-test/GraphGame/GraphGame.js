import Chat from "./Chat/Chat"
import { useCallback } from "react"
import { useGameActions, useGameState, useMatchState } from "./gameProvider";
import { ReactFlow } from "@xyflow/react";
import LaneNode from "./GameComponents/LaneNode";
import BaseNode from "./GameComponents/BaseNode";
import LabelNode from "./GameComponents/LabelNode";
import '@xyflow/react/dist/style.css';
import GameMenu from "./Menu/GameMenu";
import GameLog from "./GameLog/GameLog";
import { CLIENT_MSG, SELECTION } from "@/app/simulations/websocket-test/protocol";

const nodeTypes = {
  laneNode: LaneNode,
  baseNode: BaseNode,
  labelNode: LabelNode,
}

export default function GraphGame( { roomId }){
  const state = useGameState();
  const match = useMatchState();
  const { send } = useGameActions();

  const isReplaying = match.log.length > 0 && match.viewingTurn !== match.log.length;
  console.log("is replaying: ", isReplaying);
  console.log("rendering game with log length", match.log.length, "and viewing turn", match.viewingTurn)
  console.log("current log: ", match.log);
  const playerSelection = match.playerSelection;

  const onNodesChange = useCallback(
    // (changes) => {
    //   send({
    //     type: "NODE_CHANGE_REQUEST",
    //     roomId: roomId,
    //     changes: changes
    //   })

    // },
    // [roomId]
  );

  const onEdgesChange = useCallback(
    (changes) => {}
  )

  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const isValidConnection = useCallback((connection) => {})

  const onNodeClick = useCallback((_, clickedNode) => {
    // The server rejects selection changes after confirming, so don't send them.
    if(isReplaying || match.moveConfirmed){
      return;
    }
    if(playerSelection === SELECTION.ATTACK){
      send({  
        type: CLIENT_MSG.SET_ATTACK, 
        roomId: roomId,
        node: clickedNode,
      })
    }
    if(playerSelection === SELECTION.DEFEND){
      send({
        type: CLIENT_MSG.SET_DEFEND,
        roomId: roomId,
        node: clickedNode,
      })
    }
  }, [state.game.nodes, playerSelection, isReplaying, match.moveConfirmed, roomId, send]);
  
  return(
  <div>
    <div className="mx-auto mt-12 px-48 h-[500px] border-2 flex flex-1 flex-row" >
      <ReactFlow
        nodes={isReplaying ? match.log[match.viewingTurn-1].before.nodes : state.game.nodes}
        edges={isReplaying ? match.log[match.viewingTurn-1].before.edges : state.game.edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        isValidConnection={isValidConnection}
        connectionMode = 'Loose'
        nodesDraggable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        fitView
      />
      <div>
        <GameLog/>
      </div>
      <div className="flex-col">
        <GameMenu/>
        <Chat/>
      </div>
      {state.connection.error && (
        <p className="text-red-500">Error:{state.connection.error}</p>
      )}
    </div>
   
  </div>)
}