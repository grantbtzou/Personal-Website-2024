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
        gameStatus: action.payload.status,
        playerOrder: action.payload.playerOrder,
        log: action.payload.log,
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
      }
    default: 
      return state;
  }
}