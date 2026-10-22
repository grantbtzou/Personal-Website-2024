import { applyNodeChanges } from '@xyflow/react';
import { SERVER_MSG, SELECTION } from '@/app/simulations/websocket-test/protocol';
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
    case SERVER_MSG.ATTACK_CHANGE:
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
                  { ...node.data.interactions[action.payload.playerOrder], intent: SELECTION.ATTACK } 
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
    case SERVER_MSG.DEFEND_CHANGE:
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
                  { ...node.data.interactions[action.payload.playerOrder], intent: SELECTION.DEFEND } 
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
    case SERVER_MSG.BOTH_CONFIRMED:
      return{
        ...state, 
        nodes: state.nodes.map((node) =>
          node.id === state.differences.attack || node.id === state.differences.defend
            ? 
            { ...node, 
              data:{ 
                ...node.data,
                interactions: 
                { ...node.data.interactions, 
                  player1:
                  { ...node.data.interactions.player1, intent: null },
                  player2: 
                  { ...node.data.interactions.player2, intent: null },
              } 
              },
            }
            : node
        ),
        differences: {
          ...state.differences,
          attack: null,
          defend: null,
        },
      }
    default:
      return state;
  }
}