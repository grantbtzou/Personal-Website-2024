"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/app/simulations/websocket-test/Socket/websocketprovider";
import { gameReducer } from "./gameReducer";
import { initialGameState } from "./initialState";
import { CLIENT_MSG, SERVER_MSG, JOINED_MSGS } from "@/app/simulations/websocket-test/protocol";
import { SOCKET_STATUS } from "@/app/simulations/websocket-test/Socket/constants";

const GameStateContext = createContext(null);
const GameActionsContext = createContext(null);

const GAME_PATH = "/simulations/websocket-test/game";
const RECONNECT_KEY = "reconnect";

// The server's reconnect token is tied to one room, so the room is stored next to it.
function loadReconnect() {
  try {
    return JSON.parse(sessionStorage.getItem(RECONNECT_KEY));
  } catch {
    return null;
  }
}

function saveReconnect(value) {
  try {
    if (value) sessionStorage.setItem(RECONNECT_KEY, JSON.stringify(value));
    else sessionStorage.removeItem(RECONNECT_KEY);
  } catch {}
}

// Owns game state and the session flow (join, reconnect, navigation).
// Talks to the server only through the socket's send/subscribe.
export function GameProvider({ children }) {
  const router = useRouter();
  const { status, connectionId, send, subscribe } = useSocket();
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  // The room the current page wants to be in; set by the game page via joinRoom.
  const [targetRoom, setTargetRoom] = useState(null);

  const connectionIdRef = useRef(connectionId);
  connectionIdRef.current = connectionId;
  const targetRoomRef = useRef(targetRoom);
  targetRoomRef.current = targetRoom;
  // The socket we joined on, and the handshake in flight, so each socket joins exactly once.
  const joinedOnRef = useRef(null);
  const handshakeRef = useRef(null);

  useEffect(() => subscribe((msg) => {
    if (JOINED_MSGS.includes(msg.type)) {
      joinedOnRef.current = connectionIdRef.current;
    }
    if (msg.reconnectToken) {
      saveReconnect({ token: msg.reconnectToken, roomId: msg.roomId });
    }
    if (msg.type === SERVER_MSG.RECONNECT_FAILED) {
      saveReconnect(null);
      if (targetRoomRef.current) {
        send({ type: CLIENT_MSG.JOIN_GAME, roomId: targetRoomRef.current });
      }
    }

    dispatch({ type: msg.type, payload: msg });

    if (
      (msg.type === SERVER_MSG.GAME_CREATED || msg.type === SERVER_MSG.SUCCESSFUL_CONNECTION) &&
      !window.location.pathname.includes(`/game/${msg.roomId}`)
    ) {
      router.push(`${GAME_PATH}/${msg.roomId}`);
    }
  }), [subscribe, send, router]);

  // Join (or rejoin) the target room whenever a new socket opens or the target changes.
  const connectedRoom = state.connection.connectedRoom;
  useEffect(() => {
    if (status !== SOCKET_STATUS.OPEN || !targetRoom) return;
    if (connectedRoom === targetRoom && joinedOnRef.current === connectionId) return;

    const key = `${connectionId}:${targetRoom}`;
    if (handshakeRef.current === key) return;
    handshakeRef.current = key;

    const saved = loadReconnect();
    send(saved?.roomId === targetRoom
      ? { type: CLIENT_MSG.RECONNECT, reconnectToken: saved.token }
      : { type: CLIENT_MSG.JOIN_GAME, roomId: targetRoom });
  }, [status, connectionId, targetRoom, connectedRoom, send]);

  const actions = useMemo(
    () => ({ dispatch, send, joinRoom: setTargetRoom }),
    [send]
  );

  return (
    <GameActionsContext.Provider value={actions}>
      <GameStateContext.Provider value={state}>
        {children}
      </GameStateContext.Provider>
    </GameActionsContext.Provider>
  );
}

export const useGameState = () => useContext(GameStateContext);
export const useGameActions = () => useContext(GameActionsContext);
