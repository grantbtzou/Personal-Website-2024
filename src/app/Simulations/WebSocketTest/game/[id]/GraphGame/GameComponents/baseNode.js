import { Handle, Position } from '@xyflow/react';
import { useSocket } from '@/app/Simulations/websockettest/Socket/websocketprovider';
import { PLAYER_COLORS } from '../constants';

function BaseNode({ id, data = {} }) {
  const { state, dispatch, } = useSocket();
  const viewingTurn = state.match.viewingTurn-1;
  const p1Selection = state.match.log[viewingTurn].selections.player1.attack === id ? 'attack'
                    : state.match.log[viewingTurn].selections.player1.defend === id ? 'defend'
                    : null;
  const p2Selection = state.match.log[viewingTurn].selections.player2.attack === id ? 'attack'
                    : state.match.log[viewingTurn].selections.player2.defend === id ? 'defend'
                    : null;
  const bothSelected = p1Selection && p2Selection;

  const nodeContent = bothSelected ? (
    <div className="h-full w-full flex flex-col rounded-full overflow-hidden">
      <div className={`flex-1 ${PLAYER_COLORS.player1[p1Selection]}`} />
      <div className={`flex-1 ${PLAYER_COLORS.player2[p2Selection]}`} />
    </div>
  ) : p1Selection ? (
    <div className={`h-full w-full rounded-full ${PLAYER_COLORS.player1[p1Selection]}`} />
  ) : p2Selection ? (
    <div className={`h-full w-full rounded-full ${PLAYER_COLORS.player2[p2Selection]}`} />
  ) : (
    <div className={`h-full w-full rounded-full ${
      data.owner === 'player1' ? 'bg-red-500' :
      data.owner === 'player2' ? 'bg-blue-500' : 'bg-white'
    }`} />
  );
  if(state.game.differences.attack === id){
    var intent = 'attack';
  } else if(state.game.differences.defend === id){
    var intent = 'defend';
  }

  return (
    <div className={`h-16 w-16 border-2 rounded-full ${
        intent && data.owner 
          ? PLAYER_COLORS[data.owner][intent]
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
       {(viewingTurn !== state.match.log.length-1) && nodeContent}
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