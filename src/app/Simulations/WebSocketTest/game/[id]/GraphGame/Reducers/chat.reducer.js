export function chatReducer(state, action){
  switch(action.type){
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