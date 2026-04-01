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
    case "GAME_STATE_UPDATE":
      return {
        ...state,
        log: [...(state.log ?? []), action.payload.turnLog],
      };
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