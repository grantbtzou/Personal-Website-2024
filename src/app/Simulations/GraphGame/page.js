'use client'
import { useState, useCallback, createContext } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GameNode from '@/app/components/GraphGame/gameNode';
import BaseNode from '@/app/components/GraphGame/baseNode';
import { GameContext } from '@/app/components/GraphGame/gameContext';

const createNode = (id, type, position, player) => ({
  id: id, type: type, position: position,
  data: {
    owner: player,  
    interactions: {
      player1: { intent: null },  
      player2: { intent: null },
  },
  }
})

const initialNodes = [
  createNode('n1', 'baseNode', { x: -200, y: 0 }, 'player1'),
  createNode('n2', 'gameNode', { x: -200, y: 100 }, null),
  createNode('n3', 'gameNode', { x: -200, y: 200 }, null),
  createNode('n4', 'gameNode', { x: -200, y: 300 }, null),
  createNode('n5', 'baseNode', { x: -200, y: 400 }, 'player2'),
  createNode('n6', 'baseNode', { x: -0, y: 0 }, 'player1'),
  createNode('n7', 'gameNode', { x: -0, y: 100 }, null),
  createNode('n8', 'gameNode', { x: -0, y: 200 }, null),
  createNode('n9', 'gameNode', { x: -0, y: 300 }, null),
  createNode('n10', 'baseNode', { x: -0, y: 400 }, 'player2'),
  createNode('n11', 'baseNode', { x: 200, y: 0 }, 'player1'),
  createNode('n12', 'gameNode', { x: 200, y: 100 }, null),
  createNode('n13', 'gameNode', { x: 200, y: 200 }, null),
  createNode('n14', 'gameNode', { x: 200, y: 300 }, null),
  createNode('n15', 'baseNode', { x: 200, y: 400 }, 'player2'),
];
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
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [player1Attack, setplayer1Attack] = useState(null)
  const [player1Defend, setplayer1Defend] = useState(null) 
  const [playerSelection, setplayerSelection] = useState('attack')
  const [player2Attack, setplayer2Attack] = useState(null) 
  const [player2Defend, setplayer2Defend] = useState(null)
  const [activePlayer, setActivePlayer] = useState('player1')
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
    console.log(playerSelection)
    if(playerSelection === 'attack'){
      setAttack(clickedNode)
      for(const node of nodes){
      console.log(`${node.id}: ${node.data.interactions['player1'].intent}`)
    }
    }
    if(playerSelection === 'defend'){
      setDefend(clickedNode)
    }
  }, [nodes,playerSelection]);

  function setAttack(clickedNode){
    if((!hasConnectedNodeWith(clickedNode.id, nodes, edges, (n) => n.data?.owner === activePlayer)
      || clickedNode.data.owner !== null)){
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
    if(activePlayer === 'player1'){
      setActivePlayer('player2')
    } 
    if(activePlayer === 'player2'){
      resolve()
      setActivePlayer('player1')
    }
  }

  function resolve(){
    setNodes((nds) =>
      nds.map((node) => {
        const interactions = node.data.interactions ?? {} // Get the interactions
        const entries = Object.entries(interactions) // Extract into array 
        const intents = entries.map(([, v]) => v.intent); // Extract just intents
        // Nothing happens when both attack
        if(intents.length === 2 && intents.every(intent => intent === 'attack')){
          return{
            ...node,
             data: {
              ...node.data,
              interactions: {
                ...node.data.interactions,
                ['player1']: { intent: null },
                ['player2']: { intent: null },
              }
            },
          }
        // Need to handle reversal on defend
        } else if(intents.length === 2 && intents.includes('attack') && intents.includes('defend')){
          const attacker = entries.find(([, v]) => v.intent === 'attack')[0];
          const defender = entries.find(([, v]) => v.intent === 'defend')[0];
          return{
            ...node,
             data: {
              ...node.data,
              interactions: {
                ...node.data.interactions,
                ['player1']: { intent: null },
                ['player2']: { intent: null },
              }
            },
          }
        // If one attack, capture the node 
        } else if(intents.length === 2 && intents.includes('attack') && intents.includes(null)){
          const attacker = entries.find(([, v]) => v.intent === 'attack')[0];
          return{
            ...node,
            data: {
              ...node.data,
              owner: attacker,
              interactions: {
                ...node.data.interactions,
                ['player1']: { intent: null },
                ['player2']: { intent: null },
              }
            },
            
          }
        }
        // All other nodes get their intents deselected
        else{
          return {
            ...node,
             data: {
              ...node.data,
              interactions: {
                ...node.data.interactions,
                ['player1']: { intent: null },
                ['player2']: { intent: null },
              }
            },
          }
        }
      }))
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
                <button className={`border p-4 ${playerSelection === 'attack' ? 'bg-blue-600' : 'bg-white'}`} 
                onClick={() => {setplayerSelection("attack"); }}>
                  Attack
                </button>
                <button className={`border p-4 ${playerSelection === 'defend' ? 'bg-blue-600' : 'bg-white'}`}
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
                <button className={`border p-4  ${playerSelection === 'attack' ? 'bg-blue-600' : 'bg-white'}`}
                onClick={() => setplayerSelection("attack")}>Attack</button>
                <button className={`border p-4 ${playerSelection === 'defend' ? 'bg-blue-600' : 'bg-white'}`}
                onClick={() => setplayerSelection("defend")}>Defend</button>
              </div>
              <button className="border p-4"
              onClick={() => selectConfirm()}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
  </main>)
}