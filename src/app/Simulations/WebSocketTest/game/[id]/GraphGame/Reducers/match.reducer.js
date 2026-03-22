export function matchReducer(state, action){
  switch(action.type){
    case "GAME_CREATED":
    case "SUCCESSFUL_CONNECTION":
    case "RECONNECT_SUCCESS":
      return{
        ...state,  
        playerSelection: action.payload.playerSelection,
        gameStatus: action.payload.status,
      };
    case "GAME_START":
      return {
        ...state, 
        gameStatus: "IN_PROGRESS"
      };
    case "SELECTION_SET":
      return{
        ...state, 
        playerSelection: action.payload.selection,
      };
    case "CONFIRMATION_SET":
      console.log("received confirmation: ", action.payload.confirmation);
      return{
        ...state,
        moveConfirmed: action.payload.confirmation,
      }
    case "BOTH_CONFIRMED":
      return{
        ...state, 
        confirmation: false,
      }
    default: 
      return state;
  }
}