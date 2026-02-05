"use client";

import { WebSocketProvider } from "./websocketprovider";

export default function Providers({ children }) {
  return(
  <WebSocketProvider>
    {children}
  </WebSocketProvider>);
}
