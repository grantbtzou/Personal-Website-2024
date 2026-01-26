import GameMenu from "./gameMenu";
import { GameContext } from './gameContext';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useReactFlow } from '@xyflow/react';
import GameNode from '@/app/components/GraphGame/gameNode';
import BaseNode from '@/app/components/GraphGame/baseNode';

const createGameNode = (position, file, rank) => ({
  id: `n${file}.${rank}`, 
  type: 'gameNode', 
  position: position,
  data: {
    coords: {
      file: file,
      rank: rank,
    },
    owner: null,  
    interactions: {
      player1: { intent: null },  
      player2: { intent: null },
  },
  }
})

const createBaseNode = (position, file, rank, player) => ({
  id: `n${file}.${rank}`, 
  type: 'baseNode', 
  position: position,
  data: {
    coords:{ 
      file: file, 
      rank: rank,
    },
    owner: player, 
    baseOwner: player, 
    interactions: {
      player1: { intent: null },  
      player2: { intent: null },
  },
  }
})

function createInitialNodes() {
  return [
    createBaseNode({ x: -200, y: 0 }, 1, 1,  'player1'),
    createGameNode({ x: -200, y: 100 }, 1, 2),
    createGameNode({ x: -200, y: 200 }, 1, 3),
    createGameNode({ x: -200, y: 300 }, 1, 4),
    createBaseNode({ x: -200, y: 400 }, 1, 5, 'player2'),

    createBaseNode({ x: 0, y: -50 }, 2, 1, 'player1'),
    createGameNode({ x: 0, y: 50 }, 2, 2),
    createGameNode({ x: 0, y: 150 }, 2, 3),
    createGameNode({ x: 0, y: 250 }, 2, 4),
    createGameNode({ x: 0, y: 350 }, 2, 5),
    createBaseNode({ x: 0, y: 450 }, 2, 6, 'player2'),

    createBaseNode({ x: 200, y: 0 }, 3, 1, 'player1'),
    createGameNode({ x: 200, y: 100 }, 3, 2),
    createGameNode({ x: 200, y: 200 }, 3, 3),
    createGameNode({ x: 200, y: 300 }, 3, 4),
    createBaseNode({ x: 200, y: 400 }, 3, 5, 'player2'),
  ];
}

const createEdge = (source, target) => (
  {  
    id: `${source}-${target}`,
    source: source,
    target: target,
    sourceHandle: 'bot',
    targetHandle: 'top'
  })

function createInitialEdges() {
  return [
    createEdge('n1.1', 'n1.2'),
    createEdge('n1.2', 'n1.3'),
    createEdge('n1.3', 'n1.4'),
    createEdge('n1.4', 'n1.5'),

    createEdge('n2.1', 'n2.2'),
    createEdge('n2.2', 'n2.3'),
    createEdge('n2.3', 'n2.4'),
    createEdge('n2.4', 'n2.5'),
    createEdge('n2.5', 'n2.6'),

    createEdge('n3.1', 'n3.2'),
    createEdge('n3.2', 'n3.3'),
    createEdge('n3.3', 'n3.4'),
    createEdge('n3.4', 'n3.5'),
  ];
}

const nodeTypes = {
  gameNode: GameNode,
  baseNode: BaseNode
}

function GameController(){
  const [nodes, setNodes] = useState(createInitialNodes);
  const [edges, setEdges] = useState(createInitialEdges);
  const [player1Attack, setplayer1Attack] = useState(null);
  const [player1Defend, setplayer1Defend] = useState(null);
  const [playerSelection, setplayerSelection] = useState('attack');
  const [player2Attack, setplayer2Attack] = useState(null);
  const [player2Defend, setplayer2Defend] = useState(null);
  const [activePlayer, setActivePlayer] = useState('player1');
  const [edgeSet, setEdgeSet] = useState(false);
  const [winner, setWinner] = useState(null);
  const [gameActive, setGameActive] = useState(true);
  const { getNode } = useReactFlow();
  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  
  const onNodeClick = useCallback((_, clickedNode) => {
    if(!gameActive){
      return;
    }
    if(playerSelection === 'attack'){
      setAttack(clickedNode)
    }
    if(playerSelection === 'defend'){
      setDefend(clickedNode)
    }
  }, [nodes,playerSelection]);

  function setAttack(clickedNode){
    if((!hasConnectedNodeWith(clickedNode.id, nodes, edges, (n) => n.data?.owner === activePlayer)
      || clickedNode.data.owner === activePlayer)){
      return
    }
    if(activePlayer === 'player1'){
      setplayer1Attack(true);
    } 
    else if(activePlayer === 'player2'){
      setplayer2Attack(true);
    }
    setNodes((nds) => {
    // PASS 1 — clear previous selection
    const cleared = nds.map((node) => {
      const intent = node.data.interactions?.[activePlayer]?.intent;

      if (intent === 'attack') {
        return {
          ...node,
          data: {
            ...node.data,
            interactions: {
              ...node.data.interactions,
              [activePlayer]: { intent: null },
            },
          },
        };
      }

      return node;
    });

    // PASS 2 — apply new selection
    const updated = cleared.map((node) =>
      node.id === clickedNode.id
        ? {
            ...node,
            data: {
              ...node.data,
              interactions: {
                ...node.data.interactions,
                [activePlayer]: { intent: 'attack' },
              },
            },
          }
        : node
    );

    return updated;
    });
  }

  function setDefend(clickedNode){
    if(!(hasConnectedNodeWith(clickedNode.id, nodes, edges, (n) => n.data?.owner !== activePlayer) 
        && clickedNode.data.owner === activePlayer)){
          return 
        }
    if(activePlayer === 'player1'){
      setplayer1Defend(true);
    } 
    else if(activePlayer === 'player2'){
      setplayer2Defend(true);
    }
    setNodes((nds) => {
      // PASS 1 — clear previous selection
      const cleared = nds.map((node) => {
      const intent = node.data.interactions?.[activePlayer]?.intent;

      if (intent === 'defend') {
        return {
          ...node,
          data: {
            ...node.data,
            interactions: {
              ...node.data.interactions,
              [activePlayer]: { intent: null },
            },
          },
        };
      }
      return node;
      });
      const updated = cleared.map((node) =>
        node.id === clickedNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                interactions: {
                  ...node.data.interactions,
                  [activePlayer]: { intent: 'defend' },
                },
              },
            }
          : node
      );
      return updated;
    })
  }

  function selectConfirm(){
    if(!gameActive){
      return;
    }
    if(activePlayer === 'player1' && player1Attack && player1Defend){
      setActivePlayer('player2')
      setEdgeSet(false);
    } 
    if(activePlayer === 'player2' && player2Attack && player2Defend){
      resolve()
      setActivePlayer('player1')
      setEdgeSet(false);
    }
  }

  function resolve(){
    setNodes((nds) => {
      const outcomes = new Map();
      // Determine intents for every node, determine what state is occuring
      for (const node of nds) {
        const interactions = node.data.interactions ?? {};
        const entries = Object.entries(interactions);
        const intents = entries.map(([, v]) => v.intent);

        if (intents.length !== 2) continue;

        // Case 1: both attack → nothing happens
        if (intents.every(i => i === 'attack')) {
          outcomes.set(node.id,{ sourceNodeId: node.id, targetNodeId: node.id, type: 'none' });
        }
        // Case 2: Reversal 
        else if (intents.includes('attack') && intents.includes('defend')) {
          const attacker = entries.find(([, v]) => v.intent === 'attack')[0];
          const defender = entries.find(([, v]) => v.intent === 'defend')[0];
          const connected = getConnectedNodesWith(
            node.id, nodes, edges, (node) =>  node.data.owner !== defender )[0]
          outcomes.set(connected.id,{
            type: 'flip',
            sourceNodeId: node.id,
            targetNodeId: connected,
            newOwner: defender
          });
        }
        // Case 3: single attack (capture)
        else if (intents.includes('attack') && intents.includes(null)) {
          const attacker = entries.find(([, v]) => v.intent === 'attack')[0];

          outcomes.set(node.id,{
            sourceNodeId: node.id,
            targetNodeId: node.id,
            type: 'capture',
            newOwner: attacker
          });
        }
      }
      // Resolve each state
      let updated = nds.map((node) => {
        const outcome = outcomes.get(node.id);

        if (!outcome) return node;

        // Capture
        if (outcome.type === 'capture') {
          return {
            ...node,
            data: {
              ...node.data,
              owner: outcome.newOwner,
            },
          };
        }

        // Attack + Defend
        if (outcome.type === 'flip') {
          console.log('outcome flip: ',outcome)
          return {
            ...node, 
            data: {
              ...node.data, 
              owner: outcome.newOwner
            }
          }
            
        }
        // Both attack → no change
        return node;
      });
      // Clear intents, enforce final rule that nodes must be connected to owned node 
      updated = updated.map((node) => {
        if(hasConnectedNodeWith(node.id, updated, edges, (n) => n.data.owner === node.data.owner) || node.type === 'baseNode'){
          return{
            ...node,
            data: {
              ...node.data,
              interactions: clearIntents(node.data.interactions),
            },
          }
        } else{
          return{
            ...node, 
            data: {
              ...node.data, 
              owner: null,
              interactions: clearIntents(node.data.interactions),
            }
          }
        }  
      });
      return updated;
    })
    setplayer1Attack(null);
    setplayer2Attack(null);
    setplayer1Defend(null);
    setplayer2Defend(null);
  };

  // Check if the game is over
  useEffect(() => {
  if (!gameActive) return;

  const baseNodes = nodes.filter(
    (node) => node.type === 'baseNode'
  );

  const contestedBases = baseNodes.filter(
    (node) => node.data.owner !== node.data.baseOwner
  );

  if (contestedBases.length === 0) return;

  if (contestedBases.length === 1) {
    setWinner(contestedBases[0].data.owner);
    setGameActive(false);
  } else if (contestedBases.length === 2) {
    setWinner('draw');
    setGameActive(false);
  }
}, [nodes, gameActive]);

  function clearIntents(interactions) {
    return {
      ...interactions,
      player1: { intent: null },
      player2: { intent: null },
    };
  }

  function getConnectedNodes(nodeId, nodes, edges) {
    const connectedIds = edges.flatMap((edge) => {
      if (edge.source === nodeId) return [edge.target];
      if (edge.target === nodeId) return [edge.source];
      return [];
    });
    return nodes.filter((node) => connectedIds.includes(node.id));
  }

  function hasConnectedNodeWith(nodeId, nodes, edges, predicate) {
    const connectedNodes = getConnectedNodes(nodeId, nodes, edges);
    return connectedNodes.some(predicate);
  }

  function getConnectedNodesWith(nodeId, nodes, edges, predicate) {
    const connectedNodes = getConnectedNodes(nodeId, nodes, edges);
    return connectedNodes.filter(predicate);
  }

  function resetGame(){
    setNodes(createInitialNodes());
    setEdges(createInitialEdges())
    setplayerSelection('attack');
    setActivePlayer('player1');
    setWinner(null);
    setGameActive(true);
  }

  const isValidConnection = useCallback((connection) => {
    if(edgeSet){
      return false;
    }
    const { source, target, sourceHandle, targetHandle } = connection;
    if (!sourceHandle || !targetHandle) return false;
    const sourceNode = getNode(source);
    const targetNode = getNode(target);
    if (!sourceNode || !targetNode) return false;
    if(sourceNode.data.coords.file === targetNode.data.coords.file && sourceNode.data.coords.file - targetNode.data.coords.file !== 1){
      return false; 
    } 
    if(Math.abs(sourceNode.data.coords.file - targetNode.data.coords.file) !== 1){
      return false; 
    }
    const middleNode = [sourceNode, targetNode].find(n => n.data.coords.file === 2);
    const otherNode = [sourceNode, targetNode].find(n => n.data.coords.file !== 2);
    const rankDifference = middleNode.data.coords.rank - otherNode.data.coords.rank;
    if(rankDifference < 0 || rankDifference > 1){
      return false; 
    }
    if(edges.some(
      (edge) =>
        (edge.source === source &&
        edge.target === target) || 
        (edge.source === target && 
        edge.target === source)
    )){ return false }
    setEdgeSet(true);
    return true;
  }, [edges, edgeSet])
  const contextValue = useMemo(() => ({
    activePlayer,
    setAttack,
    setDefend,
    resolve,
    resetGame, 
    selectConfirm,
    playerSelection,
    setplayerSelection, 
    gameActive,
    winner
  }), [activePlayer, setAttack, setDefend, resolve, resetGame, selectConfirm, playerSelection, setplayerSelection, gameActive, winner]);
  return(
      <GameContext.Provider value={contextValue}>
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
      <div className="flex flex-col">
        <GameMenu />
      </div>
    </GameContext.Provider>
  )
}

export default GameController;