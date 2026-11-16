import { Handle, Position } from '@xyflow/react';
import NodeFill from './NodeFill';
import SideHandles from './SideHandles';

function LaneNode({ id, data = {} }) {
  return (
    <div className="h-16 w-16 rounded-full border-2">
       <Handle
        id = 'top'
        type="source"
        position={Position.Top}
      />
      <NodeFill nodeId={id} owner={data.owner} />
      <SideHandles file={data.coords?.file} />
      <Handle
        id = 'bot'
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

export default LaneNode;
