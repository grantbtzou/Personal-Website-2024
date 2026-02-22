export function gameStateReducer(state, action) {
  switch (action.type) {
    case "GAME_STATE":
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };

    default:
      return state;
  }
}