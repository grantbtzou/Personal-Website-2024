'use client'
import NewGame from "./components/newGame";
import { WebSocketProvider } from "./components/websocketprovider";

export default function Page(){
  return (
    <WebSocketProvider>
    <div className='mx-auto'>
      <NewGame/>
    </div>
    </WebSocketProvider>
  );
}