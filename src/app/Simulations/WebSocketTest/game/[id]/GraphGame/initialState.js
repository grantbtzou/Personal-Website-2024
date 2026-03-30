export const initialGameState = {
  connection: {
    connectedRoom: null,
    playerId: null,
    invalidRoom: false,
    reconnectToken: null,
    error: null,
  },
  match: {
    playerOrder: null,
    playerSelection: null,
    gameStatus: null,
    moveConfirmed: false,
    log: [],
  },
  chat: {
    messages: [],
  },
  game: {
    nodes: [],
    edges: [],
    differences: {
      attack: null,
      defend: null, 
      createEdge: null,
      deleteEdge: null,
    }
  },
};