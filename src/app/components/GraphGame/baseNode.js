import { Handle, Position } from '@xyflow/react';
function BaseNode( { data = {} }) {
 
  return (
    <div className="h-16 w-16 border-2 rounded-full">
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

export default BaseNode;