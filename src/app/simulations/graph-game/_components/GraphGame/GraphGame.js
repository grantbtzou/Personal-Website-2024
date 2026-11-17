import Chat from "./Chat/Chat"
import { useCallback, useEffect, useMemo } from "react"
import { useGameActions, useGameState, useMatchState } from "@/app/simulations/graph-game/_state/GameProvider";
import { ReactFlow, useNodesInitialized, useReactFlow, useStore } from "@xyflow/react";
import LaneNode from "./GameComponents/LaneNode";
import BaseNode from "./GameComponents/BaseNode";
import LabelNode from "./GameComponents/LabelNode";
import '@xyflow/react/dist/style.css';
import GameMenu from "./Menu/GameMenu";
import GameLog from "./GameLog/GameLog";
import RoomHeader from "./RoomHeader/RoomHeader";
import ErrorPopup from "./RoomHeader/ErrorPopup";
import { CLIENT_MSG, EDGE_CHANGE, GAME_STATUS, SELECTION } from "@/app/simulations/graph-game/_lib/protocol";
import { EDGE_HANDLE, canCreateEdge, canDeleteEdge, edgeEnds } from "@/app/simulations/graph-game/_lib/edges";
import { isSpectatorOrder } from "./constants";

const nodeTypes = {
  laneNode: LaneNode,
  baseNode: BaseNode,
  labelNode: LabelNode,
}

const PENDING_CREATE_STYLE = { strokeDasharray: "6 4", strokeWidth: 2 };
const PENDING_DELETE_STYLE = { stroke: "#ef4444", strokeDasharray: "6 4", opacity: 0.6 };

/*
The board's edges with each player's chosen edge change marked: a created edge is added dashed,
and a deleted edge is drawn dashed red.
*/
function withEdgeChanges(edges, nodes, selections) {
  const changes = [selections?.player1?.edgeChange, selections?.player2?.edgeChange].filter(Boolean);
  if (changes.length === 0) return edges;

  const deleted = new Set(changes.filter((c) => c.type === EDGE_CHANGE.DELETE).map((c) => c.edgeId));
  const result = edges.map((edge) =>
    deleted.has(edge.id) ? { ...edge, style: PENDING_DELETE_STYLE, data: { ...edge.data, pending: true } } : edge
  );

  for (const change of changes) {
    if (change.type !== EDGE_CHANGE.CREATE || result.some((edge) => edge.id === change.edgeId)) continue;
    const [source, target] = edgeEnds(change.edgeId);
    if (!nodes.some((n) => n.id === source) || !nodes.some((n) => n.id === target)) continue;
    result.push({
      id: change.edgeId,
      source,
      target,
      sourceHandle: EDGE_HANDLE.SOURCE,
      targetHandle: EDGE_HANDLE.TARGET,
      animated: true,
      style: PENDING_CREATE_STYLE,
      data: { pending: true },
    });
  }
  return result;
}

/*
Refits the board whenever its nodes finish measuring, the number of nodes changes, or the board
is resized. ReactFlow's own fitView only runs once on mount, which on a reload happens before the
nodes arrive from the server and before the panels beside the board have settled their widths.
*/
function AutoFitView({ nodeCount }) {
  const { fitView } = useReactFlow();
  const nodesInitialized = useNodesInitialized();
  const width = useStore((s) => s.width);
  const height = useStore((s) => s.height);

  useEffect(() => {
    if (nodesInitialized && nodeCount > 0 && width > 0 && height > 0) {
      fitView();
    }
  }, [nodesInitialized, nodeCount, width, height, fitView]);

  return null;
}

export default function GraphGame( { roomId }){
  const state = useGameState();
  const match = useMatchState();
  const { send } = useGameActions();

  const isReplaying = match.log.length > 0 && match.viewingTurn !== match.log.length;
  const playerSelection = match.playerSelection;
  const nodes = isReplaying ? match.log[match.viewingTurn-1].before.nodes : state.game.nodes;
  const edges = isReplaying ? match.log[match.viewingTurn-1].before.edges : state.game.edges;
  // Edge changes follow the same limits as node clicks; the server enforces them too.
  const canChangeEdges = match.gameStatus === GAME_STATUS.IN_PROGRESS
    && !isReplaying && !match.moveConfirmed && !isSpectatorOrder(match.playerOrder);

  // The viewed turn's edge changes, drawn on top of the board. For the turn being played the server
  // only sends your own; for past turns it sends both.
  const viewedSelections = match.log[match.viewingTurn-1]?.selections;
  const displayEdges = useMemo(
    () => withEdgeChanges(edges, nodes, viewedSelections),
    [edges, nodes, viewedSelections]
  );

  const sendEdgeChange = useCallback((change, source, target) => {
    send({ type: CLIENT_MSG.SET_EDGE_CHANGE, change, source, target });
  }, [send]);

  // Dragging between two nodes' side handles creates an edge.
  const isValidConnection = useCallback((connection) => {
    const source = state.game.nodes.find((n) => n.id === connection.source);
    const target = state.game.nodes.find((n) => n.id === connection.target);
    return canCreateEdge(source, target, state.game.edges, match.playerOrder);
  }, [state.game.nodes, state.game.edges, match.playerOrder]);

  const onConnect = useCallback((connection) => {
    if(!canChangeEdges) return;
    sendEdgeChange(EDGE_CHANGE.CREATE, connection.source, connection.target);
  }, [canChangeEdges, sendEdgeChange]);

  // This turn's own edge change, if any.
  const ownEdgeChange = match.log[match.log.length - 1]?.selections?.[match.playerOrder]?.edgeChange;

  // Clicking an existing edge deletes it. Clicking the edge you're creating or deleting this turn takes that back.
  const onEdgeClick = useCallback((_, edge) => {
    if(!canChangeEdges) return;
    if(edge.data?.pending){
      if(ownEdgeChange?.edgeId === edge.id) send({ type: CLIENT_MSG.CLEAR_EDGE_CHANGE });
      return;
    }
    if(!canDeleteEdge(edge, state.game.nodes, match.playerOrder)) return;
    sendEdgeChange(EDGE_CHANGE.DELETE, edge.source, edge.target);
  }, [canChangeEdges, ownEdgeChange, state.game.nodes, match.playerOrder, send, sendEdgeChange]);

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
  }, [playerSelection, isReplaying, match.moveConfirmed, roomId, send]);
  
  return(
  <div>
    <div className="mt-12 px-48 flex items-center gap-4 min-h-8">
      <RoomHeader/>
      <ErrorPopup/>
    </div>
    <div className="mx-auto mt-2 px-48 h-[500px] border-2 flex flex-1 flex-row" >
      <div className="flex-1 min-w-0 h-full">
        <ReactFlow
          nodes={nodes}
          edges={displayEdges}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          isValidConnection={isValidConnection}
          nodesConnectable={canChangeEdges}
          // Edges only change through the server, never with the Delete key.
          deleteKeyCode={null}
          connectionMode = 'Loose'
          nodesDraggable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          fitView
        >
          <AutoFitView nodeCount={nodes.length} />
        </ReactFlow>
      </div>
      <div>
        <GameLog/>
      </div>
      <div className="flex flex-col min-h-0">
        <GameMenu/>
        <Chat/>
      </div>
    </div>
   
  </div>)
}