import Chat from "./Chat/Chat"
import { useCallback } from "react"
import { useGameActions, useGameState } from "./gameProvider";
import { ReactFlow } from "@xyflow/react";
import LaneNode from "./GameComponents/LaneNode";
import BaseNode from "./GameComponents/BaseNode";
import LabelNode from "./GameComponents/LabelNode";
import '@xyflow/react/dist/style.css';
import GameMenu from "./Menu/GameMenu";
import GameLog from "./GameLog/GameLog";
export default function GraphGame( { roomId }){
  const state = useGameState();
  const { send } = useGameActions();

  const isReplaying = state.match.log.length > 0 && state.match.viewingTurn !== state.match.log.length;
  console.log("is replaying: ", isReplaying);
  console.log("rendering game with log length", state.match.log.length, "and viewing turn", state.match.viewingTurn)
  console.log("current log: ", state.match.log);
  const playerSelection = state.match.playerSelection;
  const nodeTypes = {
    laneNode: LaneNode,
    baseNode: BaseNode,
    labelNode: LabelNode,
  }

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
    if(isReplaying){
      return;
    }
    if(playerSelection === 'attack'){
      send({  
        type: "SET_ATTACK", 
        roomId: roomId,
        node: clickedNode,
      })
    }
    if(playerSelection === 'defend'){
      send({
        type: "SET_DEFEND",
        roomId: roomId,
        node: clickedNode,
      })
    }
  }, [state.game.nodes, playerSelection]);
  
  return(
  <div>
    <div className="mx-auto mt-12 px-48 h-[500px] border-2 flex flex-1 flex-row" >
      <ReactFlow
        nodes={isReplaying ? state.match.log[state.match.viewingTurn-1].before.nodes : state.game.nodes}
        edges={isReplaying ? state.match.log[state.match.viewingTurn-1].before.edges : state.game.edges}
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