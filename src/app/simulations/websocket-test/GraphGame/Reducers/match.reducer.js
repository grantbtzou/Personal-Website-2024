import { SERVER_MSG, GAME_STATUS } from "@/app/simulations/websocket-test/protocol";
import { LOCAL_ACTION } from "@/app/simulations/websocket-test/GraphGame/constants";
export function matchReducer(state, action){
  switch(action.type){
    case SERVER_MSG.GAME_CREATED:
    case SERVER_MSG.SUCCESSFUL_CONNECTION:
    case SERVER_MSG.RECONNECT_SUCCESS:
      return{
        ...state,  
        playerSelection: action.payload.playerSelection,
        // Only RECONNECT_SUCCESS carries this; a new or joined player hasn't confirmed.
        moveConfirmed: action.payload.moveConfirmed ?? false,
        canUndo: action.payload.canUndo ?? false,
        gameStatus: action.payload.status,
        playerOrder: action.payload.playerOrder,
        log: action.payload.log,
        // The last log entry is the turn being played, so (re)joining always lands on it.
        viewingTurn: action.payload.log.length,
      };
    case SERVER_MSG.GAME_START:
      return {
        ...state, 
        gameStatus: GAME_STATUS.IN_PROGRESS
      };
    case SERVER_MSG.GAME_OVER:
      return { 
        ...state, 
        gameStatus: GAME_STATUS.COMPLETE,
        log: [...(state.log.slice(0,-1) ?? []), action.payload.log],
        winner: action.payload.winner,
      }
    case SERVER_MSG.GAME_STATE_UPDATE:
      return {
        ...state,
        log: [...(state.log.slice(0,-1) ?? []), action.payload.log, action.payload.nextTurn],
        viewingTurn: state.viewingTurn+1,
      };
    case LOCAL_ACTION.SET_VIEWING_TURN:
      return{
        ...state,
        viewingTurn: action.payload.viewingTurn,
      }
    // The current turn's log entry is the only record of your attack and defend.
    // The server sends its selections with the opponent's hidden until the turn resolves.
    case SERVER_MSG.ATTACK_CHANGE:
    case SERVER_MSG.DEFEND_CHANGE:
    case SERVER_MSG.SELECTION_UNDONE:
      return{
        ...state,
        canUndo: action.payload.canUndo,
        log: state.log.map((entry) =>
          entry.turnNumber === action.payload.turnNumber
            ? { ...entry, selections: action.payload.selections }
            : entry
        ),
      };
    case SERVER_MSG.SELECTION_SET:
      return{
        ...state, 
        playerSelection: action.payload.selection,
      };
    case SERVER_MSG.CONFIRMATION_SET:
      return{
        ...state,
        moveConfirmed: action.payload.confirmation,
      }
    case SERVER_MSG.BOTH_CONFIRMED:
      return{
        ...state,
        moveConfirmed: false,
        // The server clears the undo stack when the turn resolves.
        canUndo: false,
      }
    default: 
      return state;
  }
}