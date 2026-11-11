import { connectionReducer } from "./reducers/connectionReducer";
import { chatReducer } from "./reducers/chatReducer";
import { gameStateReducer } from "./reducers/gameStateReducer";
import { matchReducer } from "./reducers/matchReducer";

export function gameReducer(state, action) {
  return {
    connection: connectionReducer(state.connection, action),
    chat: chatReducer(state.chat, action),
    game: gameStateReducer(state.game, action),
    match: matchReducer(state.match, action),
  };
}