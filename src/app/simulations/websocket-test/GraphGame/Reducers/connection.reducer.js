import { SERVER_MSG } from "@/app/simulations/websocket-test/protocol";
export function connectionReducer(state, action) {
  switch (action.type) {
    case SERVER_MSG.GAME_CREATED:
    case SERVER_MSG.SUCCESSFUL_CONNECTION:
    case SERVER_MSG.RECONNECT_SUCCESS:
      return {
        ...state,
        invalidRoom: false,
        connectedRoom: action.payload.roomId,
        playerId: action.payload.playerId,
        playerOrder: action.payload.playerOrder,
        reconnectToken: action.payload.reconnectToken,
      };
    
    case SERVER_MSG.INVALID_ROOM:
      return {
        ...state,
        invalidRoom: true,
      };
    case SERVER_MSG.ERROR: 
      return{
        ...state, 
        error: action.payload.message
      }
    default:
      return state;
  }
}