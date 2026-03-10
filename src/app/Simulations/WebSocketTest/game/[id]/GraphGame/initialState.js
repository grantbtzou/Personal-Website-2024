export const initialGameState = {
  connection: {
    connectedRoom: null,
    playerId: null,
    invalidRoom: false,
    reconnectToken: null,
  },
  match: {
    playerOrder: null,
    playerSelection: null,
    gameStatus: null,
  },
  chat: {
    messages: [],
  },
  game: {
    nodes: [],
    edges: [],
  },
};