import { Handle, Position } from '@xyflow/react';
import { useGameState } from '@/app/simulations/websocket-test/GraphGame/gameProvider';
import { PLAYER_COLORS } from '@/app/simulations/websocket-test/GraphGame/constants';
import { PLAYER, SELECTION } from '@/app/simulations/websocket-test/protocol';

function LaneNode({ id, data = {} }) {
  const state = useGameState();

  const viewingTurn = state.match.viewingTurn-1;
  const p1Selection = state.match.log[viewingTurn].selections.player1.attack === id ? SELECTION.ATTACK
                    : state.match.log[viewingTurn].selections.player1.defend === id ? SELECTION.DEFEND
                    : null;
  const p2Selection = state.match.log[viewingTurn].selections.player2.attack === id ? SELECTION.ATTACK
                    : state.match.log[viewingTurn].selections.player2.defend === id ? SELECTION.DEFEND
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
      data.owner === PLAYER.ONE ? 'bg-red-500' :
      data.owner === PLAYER.TWO ? 'bg-blue-500' : 'bg-white'
    }`} />
  );

  if(state.game.differences.attack === id){
    var intent = SELECTION.ATTACK;
  } else if(state.game.differences.defend === id){
    var intent = SELECTION.DEFEND;
  }

  return (
    <div className={`h-16 w-16 rounded-full border-2 ${
        intent  
          ? PLAYER_COLORS[state.match.playerOrder][intent]
          : data.owner === PLAYER.ONE
          ? 'bg-red-500'
          : data.owner === PLAYER.TWO
          ? 'bg-blue-500'
          : 'bg-white'
      }`}
    >
       <Handle
        id = 'top'
        type="source"
        position={Position.Top}
      />
      {(viewingTurn !== state.match.log.length-1) && nodeContent}
      <div>{}</div>
      <Handle
        id = 'bot'
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
}

export default LaneNode;