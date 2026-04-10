export function matchReducer(state, action){
  switch(action.type){
    case "GAME_CREATED":
    case "SUCCESSFUL_CONNECTION":
    case "RECONNECT_SUCCESS":
      return{
        ...state,  
        playerSelection: action.payload.playerSelection,
        gameStatus: action.payload.status,
        playerOrder: action.payload.playerOrder,
        log: action.payload.log,
      };
    case "GAME_START":
      return {
        ...state, 
        gameStatus: "IN_PROGRESS"
      };
    case "GAME_OVER":
      return { 
        ...state, 
        gameStatus: "COMPLETE",
        log: [...(state.log.slice(0,-1) ?? []), action.payload.log],
        winner: action.payload.winner,
      }
    case "GAME_STATE_UPDATE":
      return {
        ...state,
        log: [...(state.log.slice(0,-1) ?? []), action.payload.log, action.payload.nextTurn],
        viewingTurn: state.viewingTurn+1,
      };
    case "SET_VIEWING_TURN":
      return{
        ...state,
        viewingTurn: action.payload.viewingTurn,
      }
    case "SELECTION_SET":
      return{
        ...state, 
        playerSelection: action.payload.selection,
      };
    case "CONFIRMATION_SET":
      return{
        ...state,
        moveConfirmed: action.payload.confirmation,
      }
    case "BOTH_CONFIRMED":
      return{
        ...state, 
        moveConfirmed: false,
      }
    default: 
      return state;
  }
}