// Wire protocol shared with the game server. Keep in sync with the server's copy.

// Messages the client sends.
export const CLIENT_MSG = Object.freeze({
  CREATE_GAME: "CREATE_GAME",
  JOIN_GAME: "JOIN_GAME",
  RECONNECT: "RECONNECT",
  CHAT: "CHAT",
  SET_SELECTION: "SET_SELECTION",
  CONFIRM_SELECTION: "CONFIRM_SELECTION",
  SET_ATTACK: "SET_ATTACK",
  SET_DEFEND: "SET_DEFEND",
});

// Messages the server sends. Each is dispatched to the reducers as-is.
export const SERVER_MSG = Object.freeze({
  GAME_CREATED: "GAME_CREATED",
  SUCCESSFUL_CONNECTION: "SUCCESSFUL_CONNECTION",
  RECONNECT_SUCCESS: "RECONNECT_SUCCESS",
  RECONNECT_FAILED: "RECONNECT_FAILED",
  INVALID_ROOM: "INVALID_ROOM",
  ERROR: "ERROR",
  CHAT: "CHAT",
  CHAT_INIT: "CHAT_INIT",
  GAME_START: "GAME_START",
  GAME_STATE_UPDATE: "GAME_STATE_UPDATE",
  GAME_OVER: "GAME_OVER",
  ATTACK_CHANGE: "ATTACK_CHANGE",
  DEFEND_CHANGE: "DEFEND_CHANGE",
  SELECTION_SET: "SELECTION_SET",
  CONFIRMATION_SET: "CONFIRMATION_SET",
  BOTH_CONFIRMED: "BOTH_CONFIRMED",
});

// Server messages that mean this client is now in a room.
export const JOINED_MSGS = Object.freeze([
  SERVER_MSG.GAME_CREATED,
  SERVER_MSG.SUCCESSFUL_CONNECTION,
  SERVER_MSG.RECONNECT_SUCCESS,
]);

export const GAME_STATUS = Object.freeze({
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETE: "COMPLETE",
});

export const PLAYER = Object.freeze({
  ONE: "player1",
  TWO: "player2",
});

export const SELECTION = Object.freeze({
  ATTACK: "attack",
  DEFEND: "defend",
});

// The `winner` value when a game ends with no winner.
export const DRAW = "draw";

export const USER_TYPE = Object.freeze({
  PLAYER: "player",
  SPECTATOR: "spectator",
  SYSTEM: "system",
});
