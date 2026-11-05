import { Handle, Position } from '@xyflow/react';
import NodeFill from './NodeFill';

function LaneNode({ id, data = {} }) {
  return (
    <div className="h-16 w-16 rounded-full border-2">
       <Handle
        id = 'top'
        type="source"
        position={Position.Top}
      />
      <NodeFill nodeId={id} owner={data.owner} />
      <Handle
        id = 'bot'
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

export default LaneNode;
