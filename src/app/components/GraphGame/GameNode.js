import { useContext } from 'react';
import { Handle, Position } from '@xyflow/react';
import { GameContext } from './gameContext';

function GameNode({ id, data = {} }) {
const { activePlayer } = useContext(GameContext);
const intent = data.interactions?.[activePlayer]?.intent;
  return (
    <div className={`h-16 w-16 rounded-full border-2 ${
        intent === 'attack'
          ? 'bg-green-500 text-white'
          : intent === 'defend'
          ? 'bg-yellow-500 text-black'
          : data.owner === 'player1'
          ? 'bg-red-500'
          : data.owner === 'player2'
          ? 'bg-blue-500'
          : 'bg-white'
      }`}
    >
       <Handle
        id = 'top'
        type="source"
        position={Position.Top}
      />
      
      <div>{}</div>

      <Handle
        id = 'bot'
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

export default GameNode;