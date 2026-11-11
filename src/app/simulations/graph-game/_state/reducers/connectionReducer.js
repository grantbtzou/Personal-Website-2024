import { SERVER_MSG } from "@/app/simulations/graph-game/_lib/protocol";
import { LOCAL_ACTION } from "@/app/simulations/graph-game/_components/GraphGame/constants";

export function connectionReducer(state, action) {
  switch (action.type) {
    case SERVER_MSG.GAME_CREATED:
    case SERVER_MSG.SUCCESSFUL_CONNECTION:
    case SERVER_MSG.RECONNECT_SUCCESS:
      return {
        ...state,
        joinError: null,
        error: null,
        connectedRoom: action.payload.roomId,
        playerId: action.payload.playerId,
        reconnectToken: action.payload.reconnectToken,
      };

    case SERVER_MSG.INVALID_ROOM:
    case SERVER_MSG.ROOM_FULL:
      return {
        ...state,
        joinError: action.type,
      };
    case LOCAL_ACTION.CLEAR_JOIN_ERROR:
      return state.joinError === null ? state : { ...state, joinError: null };
    case SERVER_MSG.ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
}
