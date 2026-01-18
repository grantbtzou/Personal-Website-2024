import { useContext } from 'react';
import { Handle, Position } from '@xyflow/react';
import { GameContext } from './gameContext';

function BaseNode( { data = {} }) {
const { activePlayer } = useContext(GameContext);
  return (
    <div className={`h-16 w-16 border-2 rounded-full ${data.owner === 'player1' ? 'bg-red-500' : 'bg-blue-500'}`}>
       {data.owner === 'player2' && (<Handle
        type="target"
        position={Position.Top}
      />)}
      
      <div>{}</div>
        {data.owner === 'player1' && (<Handle
        type="source"
        position={Position.Bottom}
      />)}
      
    </div>
  );
}

export default BaseNode;