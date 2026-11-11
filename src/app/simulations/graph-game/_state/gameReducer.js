import { connectionReducer } from "./reducers/connectionReducer";
import { chatReducer } from "./reducers/chatReducer";
import { gameStateReducer } from "./reducers/gameStateReducer";
import { matchReducer } from "./reducers/matchReducer";
import { initialGameState } from "./initialState";
import { SERVER_MSG } from "@/app/simulations/graph-game/_lib/protocol";

export function gameReducer(state, action) {
  // The room no longer exists, so nothing from it should carry over to the next game.
  if (action.type === SERVER_MSG.ROOM_CLOSED) {
    return initialGameState;
  }
  return {
    connection: connectionReducer(state.connection, action),
    chat: chatReducer(state.chat, action),
    game: gameStateReducer(state.game, action),
    match: matchReducer(state.match, action),
  };
}
