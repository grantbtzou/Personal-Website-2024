'use client'
import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GameNode from '@/app/components/GraphGame/gameNode';
import BaseNode from '@/app/components/GraphGame/baseNode';
import { GameContext } from '@/app/components/GraphGame/gameContext';

const createGameNode = (id, type, position) => ({
  id: id, type: type, position: position,
  data: {
    owner: null,  
    interactions: {
      player1: { intent: null },  
      player2: { intent: null },
  },
  }
})

const createBaseNode = (id, type, position, player) => ({
  id: id, type: type, position: position,
  data: {
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
    createBaseNode('n1', 'baseNode', { x: -200, y: 0 }, 'player1'),
    createGameNode('n2', 'gameNode', { x: -200, y: 100 }),
    createGameNode('n3', 'gameNode', { x: -200, y: 200 }),
    createGameNode('n4', 'gameNode', { x: -200, y: 300 }),
    createBaseNode('n5', 'baseNode', { x: -200, y: 400 }, 'player2'),

    createBaseNode('n6', 'baseNode', { x: 0, y: 0 }, 'player1'),
    createGameNode('n7', 'gameNode', { x: 0, y: 100 }),
    createGameNode('n8', 'gameNode', { x: 0, y: 200 }),
    createGameNode('n9', 'gameNode', { x: 0, y: 300 }),
    createBaseNode('n10', 'baseNode', { x: 0, y: 400 }, 'player2'),

    createBaseNode('n11', 'baseNode', { x: 200, y: 0 }, 'player1'),
    createGameNode('n12', 'gameNode', { x: 200, y: 100 }),
    createGameNode('n13', 'gameNode', { x: 200, y: 200 }),
    createGameNode('n14', 'gameNode', { x: 200, y: 300 }),
    createBaseNode('n15', 'baseNode', { x: 200, y: 400 }, 'player2'),
  ];
}
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2',}, 
                      { id: 'n2-n3', source: 'n2', target: 'n3'}, 
                      { id: 'n3-n4', source: 'n3', target: 'n4'}, 
                      { id: 'n4-n5', source: 'n4', target: 'n5'},
                      { id: 'n6-n7', source: 'n6', target: 'n7'},
                      { id: 'n7-n8', source: 'n7', target: 'n8'},
                      { id: 'n8-n9', source: 'n8', target: 'n9'},
                      { id: 'n9-n10', source: 'n9', target: 'n10'},
                      { id: 'n11-n12', source: 'n11', target: 'n12'},
                      { id: 'n12-n13', source: 'n12', target: 'n13'},
                      { id: 'n13-n14', source: 'n13', target: 'n14'},
                      { id: 'n14-n15', source: 'n14', target: 'n15'},
];

const nodeTypes = {
  gameNode: GameNode,
  baseNode: BaseNode
}

export default function Page(){
  const [nodes, setNodes] = useState(createInitialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [player1Attack, setplayer1Attack] = useState(null);
  const [player1Defend, setplayer1Defend] = useState(null);
  const [playerSelection, setplayerSelection] = useState('attack');
  const [player2Attack, setplayer2Attack] = useState(null);
  const [player2Defend, setplayer2Defend] = useState(null);
  const [activePlayer, setActivePlayer] = useState('player1');
  const [winner, setWinner] = useState(null);
  const [gameActive, setGameActive] = useState(true);
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
    if(activePlayer === 'player1'){
      setActivePlayer('player2')
    } 
    if(activePlayer === 'player2'){
      resolve()
      setActivePlayer('player1')
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
        console.log('outcome capture: ',outcome)
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
    updated = updated.map((node) => ({
    ...node,
    data: {
      ...node.data,
      interactions: clearIntents(node.data.interactions),
    },
    }));
    return updated;
    })
    
  };

  useEffect(() => {
  // Only check when the game is active
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
    console.log(`connected nodes: `, connectedNodes)
    return connectedNodes.filter(predicate);
  }

  function resetGame(){
    setNodes(createInitialNodes());
    setplayerSelection('attack');
    setActivePlayer('player1');
    setWinner(null);
    setGameActive(true);
  }

  return(<main>
      <div className="mx-8 md:mx-auto max-w-4xl text-xl">
         <h1 className="text-7xl text-center mt-20">Under Construction</h1>
        <div className="mx-auto flex gap-8">
          <div className="mx-auto h-[500px] border-2 flex-1" >
          <GameContext.Provider value={{ activePlayer }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodesDraggable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              zoomOnDoubleClick={false}
              fitView
            />
          </GameContext.Provider>
          </div>
          <div className="flex flex-col">
            <div className={`border p-4 ${activePlayer === 'player1' ? 'bg-orange-300' : 'bg-white'}`}>
              <div>Player 1</div> 
              <div className="border p-4">
                <button className={`border p-4 ${playerSelection === 'attack' ? 'bg-green-500' : 'bg-white'}`} 
                onClick={() => {setplayerSelection("attack"); }}>
                  Attack
                </button>
                <button className={`border p-4 ${playerSelection === 'defend' ? 'bg-yellow-500' : 'bg-white'}`}
                onClick={() => {setplayerSelection("defend"); }}>
                  Defend
                </button>
              </div>
              <button className="border p-4"
              onClick={() => selectConfirm()}>
                Confirm
              </button>
            </div>
            <div className={`border p-4 ${activePlayer === 'player2' ? 'bg-orange-300' : 'bg-white'}`}>
              <div>Player 2 </div>
              <div className="border p-4">
                <button className={`border p-4  ${playerSelection === 'attack' ? 'bg-green-500' : 'bg-white'}`}
                onClick={() => setplayerSelection("attack")}>Attack</button>
                <button className={`border p-4 ${playerSelection === 'defend' ? 'bg-yellow-500' : 'bg-white'}`}
                onClick={() => setplayerSelection("defend")}>Defend</button>
              </div>
              <button className="border p-4"
              onClick={() => selectConfirm()}>
                Confirm
              </button>
            </div>
            <div>
              {!gameActive && winner === 'draw' && <div>
              <p>Draw</p>
              <button onClick={() => resetGame()}>New game</button></div>}
              {!gameActive && winner !== 'draw' && <div>
              <p>{winner} wins</p>
              <button onClick={() => resetGame()}>New game</button></div>
              }
            </div>
          </div>
        </div>
      </div>
  </main>)
}