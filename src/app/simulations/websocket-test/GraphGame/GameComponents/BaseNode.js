import { Handle, Position } from '@xyflow/react';
import { PLAYER } from '@/app/simulations/websocket-test/protocol';
import NodeFill from './NodeFill';

function BaseNode({ id, data = {} }) {
  return (
    <div className="h-16 w-16 border-2 rounded-full">
       {data.baseOwner === PLAYER.TWO && (
        <Handle
        id = 'top'
        type="target"
        position={Position.Top}
      />)}
       <NodeFill nodeId={id} owner={data.owner} />
        {data.baseOwner === PLAYER.ONE && (
        <Handle
        id = 'bot'
        type="source"
        position={Position.Bottom}
      />)}

    </div>
  );
}

export default BaseNode;
