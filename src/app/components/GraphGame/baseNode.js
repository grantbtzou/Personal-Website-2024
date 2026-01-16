import { Handle, Position } from '@xyflow/react';
function BaseNode( { data = {} }) {
 
  return (
    <div className={`h-16 w-16 border-2 rounded-full ${data.player === 'player1' ? 'bg-red-500' : 'bg-blue-500'}`}>
       {data.player === 'player2' && (<Handle
        type="target"
        position={Position.Top}
      />)}
      
      <div>{}</div>
        {data.player === 'player1' && (<Handle
        type="source"
        position={Position.Bottom}
      />)}
      
    </div>
  );
}

export default BaseNode;