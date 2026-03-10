export function connectionReducer(state, action) {
  switch (action.type) {
    case "GAMECREATED":
    case "SUCCESSFULCONNECTION":
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
    
    case "INVALIDROOM":
      return {
        ...state,
        invalidRoom: true,
      };
  
    default:
      return state;
  }
}