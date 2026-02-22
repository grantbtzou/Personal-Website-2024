export const initialGameState = {
  connection: {
    connectedRoom: null,
    playerId: null,
    invalidRoom: false,
  },
  chat: {
    messages: [],
  },
  game: {
    nodes: [],
    edges: [],
  },
};