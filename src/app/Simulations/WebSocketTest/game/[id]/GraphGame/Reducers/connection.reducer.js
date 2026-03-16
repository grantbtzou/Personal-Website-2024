export function connectionReducer(state, action) {
  switch (action.type) {
    case "GAME_CREATED":
    case "SUCCESSFUL_CONNECTION":
    case "RECONNECT_SUCCESS":
      console.log(action.payload.playerOrder)
      return {
        ...state,
        invalidRoom: false,
        connectedRoom: action.payload.roomId,
        playerId: action.payload.playerId,
        playerOrder: action.payload.playerOrder,
        reconnectToken: action.payload.reconnectToken,
      };
    
    case "INVALID_ROOM":
      return {
        ...state,
        invalidRoom: true,
      };
    case "ERROR": 
      return{
        ...state, 
        error: action.payload.message
      }
    default:
      return state;
  }
}