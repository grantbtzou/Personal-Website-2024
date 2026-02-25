export const initialGameState = {
  connection: {
    connectedRoom: null,
    playerId: null,
    invalidRoom: false,
    playerOrder: null,
  },
  chat: {
    messages: [],
  },
  game: {
    nodes: [],
    edges: [],
  },
};