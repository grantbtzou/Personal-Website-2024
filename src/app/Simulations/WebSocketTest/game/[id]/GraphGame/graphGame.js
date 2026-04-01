import Chat from "./Chat/chat"
import { useEffect, useState, useCallback } from "react"
import { useSocket } from "../../../Socket/websocketprovider";
import { ReactFlow } from "@xyflow/react";
import LaneNode from "./GameComponents/laneNode";
import BaseNode from "./GameComponents/baseNode";
import LabelNode from "./GameComponents/labelNode";
import { GameContext } from "./gameContext";
import '@xyflow/react/dist/style.css';
import GameMenu from "./Menu/gameMenu";
import GameLog from "./GameLog/gameLog";
export default function GraphGame( { roomId }){
  const { connect,send, state } = useSocket();
  useEffect(() => {
      const ws = connect();
      ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "JOIN_GAME",
        roomId: roomId,
      }));
    };
  }, []);

  const [nodes, setNodes] = useState(state.game.nodes);
  const [edges, setEdges] = useState(state.game.edges);
  useEffect(() => {
    setNodes(state.game.nodes);
  }, [state.game.nodes]);

  useEffect(() => {
    setEdges(state.game.edges);
  }, [state.game.edges]);
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
  }, [nodes, playerSelection]);
  
  return(
  <div>

    <div className="mx-auto h-[500px] border-2 flex flex-1 flex-row" >
      <ReactFlow
        nodes={nodes}
        edges={edges}
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