import { applyNodeChanges } from '@xyflow/react';
export function gameStateReducer(state, action) {
  switch (action.type) {
    case "GAME_CREATED":
    case "SUCCESSFUL_CONNECTION":
    case "RECONNECT_SUCCESS":
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
      return {
        ...state,
          nodes: state.nodes.map((node) =>
            node.id === action.payload.attackDifference
              ? 
              { ...node, 
              data:{ 
                ...node.data,
                interactions: 
                { ...node.data.interactions, 
                  [action.payload.playerOrder]:
                  { ...node.data.interactions[action.payload.playerOrder], intent: 'attack' } 
              } 
              },
            }
              : node
          ),
        differences: {
          ...state.differences,
          attack: action.payload.attackDifference,
        },
      }; 
    case "DEFEND_CHANGE":
      return {
        ...state,
        nodes: state.nodes.map((node) =>
          node.id === action.payload.defendDifference
            ? 
            { ...node, 
              data:{ 
                ...node.data,
                interactions: 
                { ...node.data.interactions, 
                  [action.payload.playerOrder]:
                  { ...node.data.interactions[action.payload.playerOrder], intent: 'defend' } 
              } 
              },
            }
            : node
        ),
        differences: {
          ...state.differences,
          defend: action.payload.defendDifference,
        },
      };
    default:
      return state;
  }
}