import { applyNodeChanges } from '@xyflow/react';
import { SERVER_MSG } from '@/app/simulations/websocket-test/_lib/protocol';
export function gameStateReducer(state, action) {
  switch (action.type) {
    case SERVER_MSG.GAME_CREATED:
    case SERVER_MSG.SUCCESSFUL_CONNECTION:
    case SERVER_MSG.RECONNECT_SUCCESS:
      return {
        ...state, 
        nodes: action.payload.nodes, 
        edges: action.payload.edges, 
      
      };
    case SERVER_MSG.GAME_STATE_UPDATE:
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
    default:
      return state;
  }
}