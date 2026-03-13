export function matchReducer(state, action){
  switch(action.type){
    case "GAME_CREATED":
    case "SUCCESSFUL_CONNECTION":
    case "RECONNECT_SUCCESS":
      return{
        ...state,  
        playerSelection: action.payload.playerSelection,
        gameStatus: action.payload.gameStatus,
      }
    case "GAME_START":
      return {
        ...state, 
        gameStatus: "IN_PROGRESS"
      }
    default: 
      return state;
  }
}