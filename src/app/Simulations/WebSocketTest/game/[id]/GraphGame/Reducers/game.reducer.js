import { applyNodeChanges } from '@xyflow/react';
export function gameStateReducer(state, action) {
  switch (action.type) {
    case "GAME_CREATED":
    case "SUCCESSFUL_CONNECTION":
    case "RECONNECT_SUCCESS":
      console.log("state.game:", state.game);
      return {
        ...state, 
        nodes: action.payload.nodes, 
        edges: action.payload.edges, 
      
      };
    case "GAME_STATE":
      return {
        ...state,
        nodes: action.payload.nodes,
        edges: action.payload.edges,
      };
    case "ATTACK_CHANGE":
      console.log("state.game:", state.game);
      return {
        ...state,
        game: {
          ...state.game,
          nodes: state.game.nodes.map((node) =>
            node.id === action.payload.differences.attack
              ? 
              { ...node, 
                interactions: 
                { ...node.interactions, 
                  [state.match.playerOrder]:
                   { ...node.interactions[state.match.playerOrder], intent: 'attack' } 
                } 
              }
              : node
          ),
        },
        differences: {
          ...differences,
          attack: action.payload.differences.attack,
        },
      }; 
    case "DEFEND_CHANGE":
      return {
        ...state,
        game: {
          ...state.game,
          nodes: state.game.nodes.map((node) =>
            node.id === action.payload.differences.defend
              ? 
              { ...node, 
                interactions: 
                { ...node.interactions, 
                  [state.match.playerOrder]:
                   { ...node.interactions[state.match.playerOrder], intent: 'defend' } 
                } 
              }
              : node
          ),
        },
        differences: {
          ...differences,
          defend: action.payload.differences.defend,
        },
      };
    default:
      return state;
  }
}