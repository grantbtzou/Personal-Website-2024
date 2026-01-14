'use client'
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GameNode from '@/app/components/GraphGame/gameNode';

const initialNodes = [
  { id: 'n1', type: 'gameNode', position: { x: -200, y: 0 } },
  { id: 'n2', type: 'gameNode', position: { x: -200, y: 100 }},
  { id: 'n3', type: 'gameNode', position: { x: -200, y: 200 }},
  { id: 'n4', type: 'gameNode', position: { x: -200, y: 300 }},
  { id: 'n5', type: 'gameNode', position: { x: -200, y: 400 }},
  { id: 'n6', type: 'gameNode', position: { x: 0, y: 0 }},
  { id: 'n7', type: 'gameNode', position: { x: 0, y: 100 }},
  { id: 'n8', type: 'gameNode', position: { x: 0, y: 200 }},
  { id: 'n9', type: 'gameNode', position: { x: 0, y: 300 }},
  { id: 'n10', type: 'gameNode', position: { x: 0, y: 400 }},
  { id: 'n11', type: 'gameNode', position: { x: 200, y: 0 }},
  { id: 'n12', type: 'gameNode', position: { x: 200, y: 100 }},
  { id: 'n13', type: 'gameNode', position: { x: 200, y: 200 }},
  { id: 'n14', type: 'gameNode', position: { x: 200, y: 300 }},
  { id: 'n15', type: 'gameNode', position: { x: 200, y: 400 }},

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
  gameNode: GameNode
}
export default function Page(){
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [player1Attack, setplayer1Attack] = useState(null)
  const [player1Defend, setplayer1Defend] = useState(null) 
  const [player1Selection, setplayer1Selection] = useState(true)
  const [player2Attack, setplayer2Attack] = useState(null) 
  const [player2Defend, setplayer2Defend] = useState(null)
  const [player2Selection, setplayer2Selection] = useState(false)
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
    setNodes((nds) =>
      nds.map((node) =>
        node.id === clickedNode.id
          ? {
              ...node,
              data: {
                ...node.data,
                selected: !node.data?.selected,
              },
            }
          : node
      )
    );
  }, []);




  return(<main>
      <div className="mx-8 md:mx-auto max-w-4xl text-xl">
         <h1 className="text-7xl text-center mt-20">Under Construction</h1>
        <div className="mx-auto flex gap-8">
          <div className="mx-auto h-[500px] border-2 flex-1" >
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
          </div>
          <div className="flex flex-col">
            <div className="border p-4">
              <div>Player 1</div> 
              <div className="flex">
                <button className="border p-4"
                onClick={() => setplayer1Selection("attack")}>
                  Attack
                </button>
                <button className="border p-4"
                onClick={() => setplayer1Selection("defend")}>
                  Defend
                </button>
              </div>
              <button className="border p-4"
              onClick={() => selectConfirm()}>
                Confirm
              </button>
            </div>
            <div className="border p-4">
              <div>Player 2 </div>
              <div className="flex">
                <button className="border p-4"
                onClick={() => setplayer2Selection("attack")}>Attack</button>
                <button className="border p-4"
                onClick={() => setplayer2Selection("defend")}>Defend</button>
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