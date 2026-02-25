import { useContext } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useSocket } from '@/app/Simulations/websockettest/Socket/websocketprovider';

function BaseNode({ id, data = {} }) {
const { state, dispatch, } = useSocket();
const intent = data.interactions?.[state.connection.playerOrder]?.intent;
  return (
    <div className={`h-16 w-16 border-2 rounded-full ${
        intent === 'attack'
          ? 'bg-green-500 text-white'
          : intent === 'defend'
          ? 'bg-yellow-500 text-black'
          : data.owner === 'player1'
          ? 'bg-red-500'
          : data.owner === 'player2'
          ? 'bg-blue-500'
          : 'bg-white'
      }`}>
       {data.baseOwner === 'player2' && (
        <Handle
        id = 'top'
        type="target"
        position={Position.Top}
      />)}
      
      <div>{}</div>
        {data.baseOwner === 'player1' && (
        <Handle
        id = 'bot'
        type="source"
        position={Position.Bottom}
      />)}
      
    </div>
  );
}

export default BaseNode;