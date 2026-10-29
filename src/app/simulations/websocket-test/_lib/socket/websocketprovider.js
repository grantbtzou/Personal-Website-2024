"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SOCKET_STATUS } from "./constants";

const SocketContext = createContext(null);

const MAX_RETRY_DELAY = 10000;

// Owns the WebSocket connection only. It knows nothing about the game:
// consumers send messages and subscribe to incoming ones.
export function SocketProvider({ url, children }) {
  const socketRef = useRef(null);
  const listenersRef = useRef(new Set());
  const [status, setStatus] = useState(SOCKET_STATUS.CONNECTING);
  // Increments on every successful open, so consumers can tell a new socket from the old one.
  const [connectionId, setConnectionId] = useState(0);

  useEffect(() => {
    let closedByUs = false;
    let retryTimer = null;
    let attempts = 0;

    function open() {
      const ws = new WebSocket(url);
      socketRef.current = ws;
      setStatus(SOCKET_STATUS.CONNECTING);

      ws.onopen = () => {
        attempts = 0;
        setStatus(SOCKET_STATUS.OPEN);
        setConnectionId((id) => id + 1);
      };

      ws.onmessage = (event) => {
        let msg;
        try {
          msg = JSON.parse(event.data);
        } catch {
          console.warn("Ignoring non-JSON message", event.data);
          return;
        }
        listenersRef.current.forEach((listener) => listener(msg));
      };

      ws.onclose = () => {
        if (closedByUs) return;
        socketRef.current = null;
        setStatus(SOCKET_STATUS.CLOSED);
        const delay = Math.min(1000 * 2 ** attempts, MAX_RETRY_DELAY);
        attempts++;
        retryTimer = setTimeout(open, delay);
      };
    }

    open();
    return () => {
      closedByUs = true;
      clearTimeout(retryTimer);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [url]);

  // Messages sent while the socket is down are dropped rather than queued, so a stale
  // move can't reach the server ahead of the RECONNECT handshake.
  const send = useCallback((message) => {
    const ws = socketRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("WebSocket not open, dropping message", message);
      return false;
    }
    ws.send(JSON.stringify(message));
    return true;
  }, []);

  const subscribe = useCallback((listener) => {
    listenersRef.current.add(listener);
    return () => listenersRef.current.delete(listener);
  }, []);

  const value = useMemo(
    () => ({ status, connectionId, send, subscribe }),
    [status, connectionId, send, subscribe]
  );

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
