import { Handle, Position } from '@xyflow/react';
import { EDGE_HANDLE, MIDDLE_FILE } from '@/app/simulations/graph-game/_lib/edges';

// Handles for edges between lanes. New edges run from the left-hand node's right side to the
// right-hand node's left side, so outer lanes only need the side facing the middle lane.
function SideHandles({ file }) {
  return (
    <>
      {file >= MIDDLE_FILE && (
        <Handle id={EDGE_HANDLE.TARGET} type="source" position={Position.Left} />
      )}
      {file <= MIDDLE_FILE && (
        <Handle id={EDGE_HANDLE.SOURCE} type="source" position={Position.Right} />
      )}
    </>
  );
}

export default SideHandles;
