import { applyNodeChanges } from '@xyflow/react';
export function gameStateReducer(state, action) {
  switch (action.type) {
    case "GAMECREATED":
    case "SUCCESSFULCONNECTION":
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
      console.log(action.payload.nodes);
      return{
        ...state, 
        nodes: action.payload.nodes, 
        edges: action.payload.edges,
      }     

    default:
      return state;
  }
}