import { applyNodeChanges } from '@xyflow/react';
export function gameStateReducer(state, action) {
  switch (action.type) {
    case "GAME_CREATED":
    case "SUCCESSFUL_CONNECTION":
    case "RECONNECT_SUCCESS":
      return {
        ...state, 
        nodes: action.payload.nodes, 
        edges: action.payload.edges
      };
    case "GAME_STATE":
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
    case "SELECTION_CHANGE":
      return{
        ...state, 
        nodes: action.payload.nodes, 
        edges: action.payload.edges,
      }     

    default:
      return state;
  }
}