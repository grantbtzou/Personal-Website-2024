export const initialGameState = {
  connection: {
    connectedRoom: null,
    playerId: null,
    // Why the last join failed: SERVER_MSG.INVALID_ROOM, SERVER_MSG.ROOM_FULL or null.
    joinError: null,
    reconnectToken: null,
    error: null,
    // Counts errors received, so the popup reappears even when the same message repeats.
    errorId: 0,
  },
  match: {
    playerOrder: null,
    playerSelection: null,
    gameStatus: null,
    moveConfirmed: false,
    canUndo: false,
    log: [],
    winner: null,
    viewingTurn: 1,
  },
  chat: {
    messages: [],
  },
  game: {
    nodes: [],
    edges: [],
  },
};