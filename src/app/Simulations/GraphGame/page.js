'use client'
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import GameNode from '@/app/components/GraphGame/gameNode';

const initialNodes = [
  { id: 'n1', type: 'gameNode', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', type: 'gameNode', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
  { id: 'n3', type: 'gameNode', position: { x: 0, y: 200 }, data: { label: 'Node 3' } },
  { id: 'n4', type: 'gameNode', position: { x: 0, y: 300 }, data: { label: 'Node 4' } },
  { id: 'n5', type: 'gameNode', position: { x: 0, y: 400 }, data: { label: 'Node 5' } },
  { id: 'n6', type: 'gameNode', position: { x: 100, y: 0 }, data: { label: 'Node 6' } },
  { id: 'n7', type: 'gameNode', position: { x: 100, y: 100 }, data: { label: 'Node 7' } },
  { id: 'n8', type: 'gameNode', position: { x: 100, y: 200 }, data: { label: 'Node 8' } },
  { id: 'n9', type: 'gameNode', position: { x: 100, y: 300 }, data: { label: 'Node 9' } },
  { id: 'n10', type: 'gameNode', position: { x: 100, y: 400 }, data: { label: 'Node 10' } },
  { id: 'n11', type: 'gameNode', position: { x: 200, y: 0 }, data: { label: 'Node 11' } },
  { id: 'n12', type: 'gameNode', position: { x: 200, y: 100 }, data: { label: 'Node 12' } },
  { id: 'n13', type: 'gameNode', position: { x: 200, y: 200 }, data: { label: 'Node 13' } },
  { id: 'n14', type: 'gameNode', position: { x: 200, y: 300 }, data: { label: 'Node 14' } },
  { id: 'n15', type: 'gameNode', position: { x: 200, y: 400 }, data: { label: 'Node 15' } },

];
const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];
const nodeTypes = {
  gameNode: GameNode
}
export default function Page(){
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  
  
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
  
  return(<main>
      <div className="mx-8 md:mx-auto max-w-4xl text-xl">
         <h1 className="text-7xl text-center mt-20">Under Construction</h1>
        <div className="mx-auto h-96 border-2 " >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
        </div>
      </div>
  </main>)
}