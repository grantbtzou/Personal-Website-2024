import { connectionReducer } from "./Reducers/connection.reducer";
import { chatReducer } from "./Reducers/chat.reducer";
import { gameStateReducer } from "./Reducers/game.reducer";
import { matchReducer } from "./Reducers/match.reducer";

export function gameReducer(state, action) {
  console.log("Reducer received action:", action);
  return {
    connection: connectionReducer(state.connection, action),
    chat: chatReducer(state.chat, action),
    game: gameStateReducer(state.game, action),
    match: matchReducer(state.match, action),
  };
}