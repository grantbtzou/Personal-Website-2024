export function chatReducer(state, action){
  switch(action.type){
    case "GAMECREATED":
    case "SUCCESSFULCONNECTION":
    case "RECONNECT_SUCCESS":
      return{
        ...state, 
        messages: action.payload.messages,
      }
    case "CHAT":
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
      };

    case "CHAT_INIT":
      return {
        ...state,
        messages: action.payload.messages,
      };

    default:
      return state;
  }
}