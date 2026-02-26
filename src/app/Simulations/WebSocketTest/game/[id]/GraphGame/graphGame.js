import Chat from "./Chat/chat"
import { useEffect, useState, useCallback } from "react"
import { useSocket } from "../../../Socket/websocketprovider";
import { ReactFlow } from "@xyflow/react";
import GameNode from "./GameComponents/gameNode";
import BaseNode from "./GameComponents/baseNode";
import { GameContext } from "./gameContext";
import '@xyflow/react/dist/style.css';
export default function GraphGame( { roomId }){
  const { connect,send, state } = useSocket();
  useEffect(() => {
      const ws = connect();
      ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "JOINGAME",
        roomId: roomId,
      }));
    };
  }, []);

  const [nodes, setNodes] = useState(state.game.nodes);
  const [edges, setEdges] = useState(state.game.edges);
  useEffect(() => {
    setNodes(state.game.nodes);
    console.log("nodes changed"); 
    console.log(JSON.stringify(nodes));
  }, [state.game.nodes]);

  useEffect(() => {
    setEdges(state.game.edges);
  }, [state.game.edges]);
  const [playerSelection, setplayerSelection] = useState(state.connection.playerSelection);
  const nodeTypes = {
    gameNode: GameNode,
    baseNode: BaseNode
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
    console.log(clickedNode);
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
  }, [nodes]);
  
  return(
  <div>

    <div className="mx-auto h-[500px] border-2 flex-1" >
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
    </div>
    <Chat/>
  </div>)
}