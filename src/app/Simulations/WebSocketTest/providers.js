"use client";

import { WebSocketProvider } from "./Socket/websocketprovider";

export default function Providers({ children }) {
  return(
  <WebSocketProvider>
    {children}
  </WebSocketProvider>);
}
