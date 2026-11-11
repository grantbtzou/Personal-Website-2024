import { SERVER_MSG } from "@/app/simulations/graph-game/_lib/protocol";

// What to tell the user for each connection.joinError value.
export const JOIN_ERROR_TEXT = Object.freeze({
  [SERVER_MSG.INVALID_ROOM]: "Room not found",
  [SERVER_MSG.ROOM_FULL]: "Room is full",
});
