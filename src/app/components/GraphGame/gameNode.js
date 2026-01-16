import { Handle, Position } from '@xyflow/react';
function GameNode({ data = {} }) {
 
  return (
    <div className={`h-16 w-16 border-2 rounded-full 
       ${data.attackSelection ? 'bg-green-500 text-white' : 'bg-white text-black', data.defendSelection ? 'bg-yellow-500' : 'bg-white' }
      `}>
       <Handle
        type="target"
        position={Position.Top}
      />
      
      <div>{}</div>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

export default GameNode;