export function connectionReducer(state, action) {
  switch (action.type) {
    case "GAMECREATED":
    case "SUCCESSFULCONNECTION":
      return {
        ...state,
        invalidRoom: false,
        connectedRoom: action.payload.roomId,
        playerId: action.payload.playerId,
        playerOrder: action.payload.playerOrder,
      };

    case "INVALIDROOM":
      return {
        ...state,
        invalidRoom: true,
      };

    default:
      return state;
  }
}