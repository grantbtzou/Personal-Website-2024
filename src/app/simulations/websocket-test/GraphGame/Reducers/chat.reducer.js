import { SERVER_MSG } from "@/app/simulations/websocket-test/protocol";
export function chatReducer(state, action){
  switch(action.type){
    case SERVER_MSG.GAME_CREATED:
    case SERVER_MSG.SUCCESSFUL_CONNECTION:
    case SERVER_MSG.RECONNECT_SUCCESS:
      return{
        ...state, 
        messages: action.payload.messages,
      }
    case SERVER_MSG.CHAT:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };

    case SERVER_MSG.CHAT_INIT:
      return {
        ...state,
        messages: action.payload.messages,
      };

    default:
      return state;
  }
}