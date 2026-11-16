import { Handle, Position } from '@xyflow/react';
import { PLAYER } from '@/app/simulations/graph-game/_lib/protocol';
import NodeFill from './NodeFill';
import SideHandles from './SideHandles';

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
       <SideHandles file={data.coords?.file} />
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
